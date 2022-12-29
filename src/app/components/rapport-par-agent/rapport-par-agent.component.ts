import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { Drp } from 'src/app/model/Drp';
import { Paiement } from 'src/app/model/paiement';
import { Structures } from 'src/app/model/Structures';
import { RapportPaiementService } from 'src/app/service/rapportPaiementService/rapport-paiement.service';
import { UserServiceService } from 'src/app/service/userService/user-service.service';
import autoTable from "jspdf-autotable";
import { Beneficiaire } from '../../model/beneficiaire';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-rapport-par-agent',
  templateUrl: './rapport-par-agent.component.html',
  styleUrls: ['./rapport-par-agent.component.scss']
})
export class RapportParAgentComponent implements OnInit {

  drp:Drp;
    users:any;
    username:any;
    user:any;
    bureaus:any;
    bureau:Structures;
    bureaux: Structures[];
    paiements: Paiement[];
    date2: string;
    date1: string;
    disabled:boolean=true;
    disabled1:boolean=true;
    disabled2:boolean=true;
    loading = [false, false, false, false]
  structure: any;
  montantTotal: string;

  constructor(private rapportPaiementService: RapportPaiementService,
              private userService: UserServiceService,
              public keycloak: KeycloakService) {
                
               }

  ngOnInit(): void {
    this.keycloak.loadUserProfile().then( res =>
      {
          console.log(res);
          this.users = res;
          this.username= res.username;
          console.log(res.username);
          this.getStructure(this.username);
         // this.getUser(res.username);
      });
  }
  change(){
    this.disabled=false;
}
change1(){
    this.disabled1=false;
}
change2(){
    this.disabled2=false;
}
load(index) {
    this.loading[index] = true;
    setTimeout(() => this.loading[index] = false, 1000);
}



  getListPaiement(){
    console.log(this.users);
    this.rapportPaiementService.getListPaiementCaisse(this.date1,this.date2,this.user.dg_caisse.id).subscribe(data=>{
      this.paiements=data;
      console.log(this.paiements)
      
      this.structure=this.user.dg_structure.libelle
      for(let op of this.paiements){
      this.montantTotal = this.paiements.reduce((sum, current) => sum + current.montant, 0);
    }

  })
  }
  public getStructure(username){
    console.log(username);
    return this.userService.getUserByUsername(username).subscribe(data => {
        console.log(data);
        this.user = data;
    })
}
showSuccess(){
  //this.messageService.add({key: 'tc', severity:'success', summary: 'PAIEMENT EFFECTUÉ AVEC SUCCÈS', detail: 'Génération du recu en cours'});
}

exportPdf() {
 import("jspdf").then(jsPDF => {
      import("jspdf-autotable").then(x => {
          // @ts-ignore
          const doc  = new jsPDF.default(0);
          let col=[['Numero Reçu','Date Paiement','Beneficiaire','payeur','Evenement','Montant']]
          let rows=[]
          doc.text('Rapport paiement du : '+this.date1 +' au ' +this.date2,30,30)


          doc.rect(30, 38, 150, 15)
          doc.text('Nombre Bénéficiaire: '+this.paiements.length+'  |  Montant Total: '+this.montantTotal +' FCFA',35,47)


          for(let op of this.paiements)
          {
          
              let temp= [op.id,op.datePaiement,op.beneficiaire.nom,op.caissier,op.periode.libelle,op.montant]
              rows.push(temp)
          }
          autoTable(
              doc,{
                  startY:60,
                  head:col,
                  body:rows,
                  didDrawPage: function (data) {
                  const date = new Date()
                  doc.setFontSize(12)
                  doc.text(" le : "+date.toLocaleDateString("fr-FR"), 175, 15)}
              }
          )
          doc.save('resultat.pdf');
      })
  })
  //this.showSuccess()
}
exportExcel() {
  console.log(this.paiements);
  // @ts-ignore
  import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.paiements);
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "resultat");
  });
}
saveAsExcelFile(buffer: any, fileName: string): void {
  let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  let EXCEL_EXTENSION = '.xlsx';
  const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
  });
  FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
}


}
