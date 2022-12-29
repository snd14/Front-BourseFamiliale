import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { Drp } from 'src/app/model/Drp';
import { Paiement } from 'src/app/model/paiement';
import { Structures } from 'src/app/model/Structures';
import { RapportPaiementService } from 'src/app/service/rapportPaiementService/rapport-paiement.service';
import { UserServiceService } from 'src/app/service/userService/user-service.service';
import * as FileSaver from 'file-saver';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-rapport-drp',
  templateUrl: './rapport-drp.component.html',
  styleUrls: ['./rapport-drp.component.scss']
})
export class RapportDrpComponent implements OnInit {

  drp:Drp;
    users:any;
    username:any;
    user:any;
    bureaus:any;
    bureau:Structures;
    drps: Drp[];
    paiements: Paiement[];
    date2: string;
    date1: string;
    disabled:boolean=true;
    disabled1:boolean=true;
    disabled2:boolean=true;
    loading = [false, false, false, false]
  montantTotal: string;

    constructor(private rapportPaiementService: RapportPaiementService,
      private userService: UserServiceService,
      public keycloak: KeycloakService) {

this.keycloak.loadUserProfile().then( res =>
{
  console.log(res);
  this.users = res;
  this.username= res.username;
  console.log(res.username);
  this.getUser(res.username);
});
}

ngOnInit(): void {
  this.getListDrp();
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

public getUser(username){
console.log(username);
return this.userService.getUserByUsername(username).subscribe(data =>
{
    console.log(data);
    this.user = data;
    console.log(this.user);
    //debugger
    //this.getStructureByDrp(this.user.dg_structure.dg_drp.id);
   // this.getStructureByDrp(this.user.dg_structure.dg_drp.id);
})
}

getListDrp(){
  this.rapportPaiementService.getDRP().subscribe(data=>{
    this.drps=data;
    console.log(this.drps)
  })
}

getListPaiement(){
  this.rapportPaiementService.getListPaiementDrp(this.drp.id,this.date1,this.date2).subscribe(data=>{
    this.paiements=data;
    console.log(this.paiements)
  })

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
