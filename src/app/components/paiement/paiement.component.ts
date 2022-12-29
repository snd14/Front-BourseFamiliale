import { Component, OnInit } from '@angular/core';
import { Paiement } from 'src/app/model/paiement';
import { PaiementService } from 'src/app/service/paiement.service';
import {error} from "protractor";
import { BeneficiaireService } from 'src/app/service/beneficiaire.service';
import { DatePipe } from '@angular/common';
import { KeycloakService } from 'keycloak-angular';
import { UserServiceService } from 'src/app/service/userService/user-service.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import jsPDF from "jspdf";
import html2canvas from 'html2canvas';


@Component({
  selector: 'app-paiement',
  templateUrl: './paiement.component.html',
  styleUrls: ['./paiement.component.scss'],
  providers: [DatePipe,MessageService]
})
export class PaiementComponent implements OnInit {
    messageErreur:string
    messageErreur2:string
  tokenGenere

  //verifierExistencePaiement
  periode_id
  reference// = "SN-14320105-99" // a enlever

  // validerUnPaiement
  cin
  reference_virement
  nom_caissier
  code_caissier
  idPaiementValide
  // signerUnPaiementEffectue
  reference_pay
  signature_caisse
  signature_beneficiaire

  listeDesPeriodes
  paiementTrouve : Paiement = new Paiement()
  activeIndex1 = 0
  displayResults:boolean = false

  //api local
  paiementAsauvegarger:Paiement = new Paiement()

  valeurActiveIndex=1
  disabled:boolean=true;
  disabled1:boolean=true;

  //recuperer l'utilisateur
  user

  //confirmation du paiement
  displayVerificationDialog:boolean


  constructor(private paiementService:PaiementService,private beneficiaireService:BeneficiaireService,
    private datepipe: DatePipe,private userService: UserServiceService,
    public keycloak: KeycloakService,private messageService: MessageService,private router:Router) {
      this.keycloak.loadUserProfile().then( res => {
        console.log(res);
        this.user = res;
        this.getUserByUsername(res.username);
    })
     }

  ngOnInit(): void {
    this.generateToken()

  }

    getChange()
    {
        this.disabled=false;
    }
    getChange1()
    {
        console.log(this.reference)
        if (this.reference=='') {
            this.disabled1=true;
        }
        else if(this.reference!='') {
            this.disabled1=false;
        }
    }

  generateToken(){
    this.paiementService.authentification().subscribe(res=>{
      this.tokenGenere = res
      console.log(this.tokenGenere)
      this.testToken()
      // this.verifierExistencePaiement()
      // this.validerUnPaiement()
      // this.signerUnPaiementEffectue()
      this.listDesPeriodes()
      // this.savePaiementLocal()

    }
    )
}

testToken(){
  this.paiementService.testToken(this.tokenGenere.token).subscribe(res=>{
    console.log(res);

  })
}

verifierExistencePaiement(){
    // this.valeurActiveIndex=0;
  this.displayResults=false;
  let body = JSON.stringify({"periode_id":this.periode_id.id,"reference":this.reference})
  this.paiementService.verifierExistencePaiement(this.tokenGenere.token,body).subscribe(res=>{
      this.messageErreur=null;
    this.messageErreur2=null
    this.paiementTrouve = res
    this.displayResults = true

    // this.savePaiementLocal()//a mettre dans validerPaiement

    console.log(res);
  }, error => {
      this.valeurActiveIndex=0;
      this.messageErreur = error.error.message;
      console.log(error.error)
  })
}

validerUnPaiement(){
  console.log(this.tokenGenere);

  //this.cin = this.paiementTrouve.beneficiaire.cin
  this.reference_virement = this.paiementTrouve.virementId
  

  this.nom_caissier = this.user.prenom+""+this.user.nom//"John Doe" //A recuperer
  this.code_caissier = this.user.id//"CP12348" //A recuperer
  //A recuperer bureau idBureau idDrp idCaisse
  //A recuperer drp

  let body = JSON.stringify({"cin":this.cin,"reference_virement":this.reference_virement,
  "nom_caissier":this.nom_caissier,
  "code_caissier":this.code_caissier})
  this.paiementService.validerUnPaiement(this.tokenGenere.token,body).subscribe(res=>{

    this.idPaiementValide = res.id
    this.savePaiementLocal()
    console.log(res);
    this.valeurActiveIndex=2;
    this.showSuccess()
    this.router.navigate(['/'])
  }, err=>{
      this.messageErreur2 = err.error.message;
      console.log(err )

  } )
}

signerUnPaiementEffectue(){
  let body = JSON.stringify({  "reference_pay": this.reference_pay,
  "signature_caisse": "https://cloud-bgdigital-s3.s3-us-east-2.amazonaws.com/auth-services/jpeg/1660736628686-tmp1660736628681.jpeg",
  "signature_beneficiaire": "https://cloud-bgdigital-s3.s3-us-east-2.amazonaws.com/auth-services/jpeg/1660736628686-tmp1660736628681.jpeg"})
  this.paiementService.signerUnPaiementEffectue(this.tokenGenere.token,body).subscribe(res=>{
    this.savePaiementLocal()
    console.log(res);
  })
}

    listDesPeriodes(){
      let test
        this.paiementService.listPeriodes(this.tokenGenere.token).subscribe(res=>{
          this.listeDesPeriodes = res['hydra:member']
            console.log(res);
            console.log(res['hydra:member']);


            // console.log(this.listeDesPeriodes.data['hydra:member']);

        })
    }


    savePaiementLocal(){

      // this.idPaiementValide pour l'id //9
      // detailsPourUnPaiementDuJour() pour la fonction
      this.paiementService.detailsPourUnPaiementDuJour(this.tokenGenere.token,this.idPaiementValide).subscribe(
        res=>{
          console.log(res);
          
          this.paiementAsauvegarger = res
          console.log(this.paiementAsauvegarger);

          this.paiementAsauvegarger.idBureau = this.user.dg_structure?.id
          this.paiementAsauvegarger.idDrp = this.user.dg_structure?.dg_drp?.id
          this.paiementAsauvegarger.idCaisse = 1 //this.user.dg_caisse A remplacer
          

          //on gere les dates plus tard
          this.paiementAsauvegarger.beneficiaire.dateDelivrance = null
           this.paiementAsauvegarger.beneficiaire.dateExpiration = null
          this.paiementAsauvegarger.beneficiaire.dateCreation = null
          this.paiementAsauvegarger.beneficiaire.dateModification = null

          this.paiementAsauvegarger.dateCreation = null
          this.paiementAsauvegarger.dateModification = null
          this.paiementAsauvegarger.periode.dateCreation = null
          this.paiementAsauvegarger.periode.dateModification = null

          console.log(this.paiementAsauvegarger);

                      // on sauvergade le paiement
                      this.paiementService.savePaiementLocal(this.paiementAsauvegarger).subscribe(
                        res => {
                          console.log(res);
                        },
                        error=>{
                          console.log(error);

                        }
                      )


      })

    }

    public getUserByUsername(username){
      console.log(username);
      return this.userService.getUserByUsername(username).subscribe(data => {
          console.log(data);
          this.user = data;
          console.log(this.user.prenom);
          console.log(this.user.nom);


      })
  }

  confirmerLePaiement(){
    this.displayVerificationDialog = true
    console.log(this.cin);
    
  }

  showSuccess() {
    this.messageService.add({severity:'success', summary: 'Success', detail: 'Payé avec succès'});
}

exportPdf() {

  var data = document.getElementById('impression');
  html2canvas(data).then(canvas => {
      const imgData = canvas.toDataURL('image/jpeg')

      const pdf = new jsPDF({
          orientation:"portrait"
      })
      const imageProps = pdf.getImageProperties(imgData)

      const pdfw = pdf.internal.pageSize.getWidth()

      const pdfh = (imageProps.height * pdfw) / imageProps.width

      pdf.addImage(imgData, 'PNG', 0, 0, pdfw, pdfh)

      // pdf.save('MYPdf.pdf')

      pdf.output('dataurlnewwindow');
  })

  this.showSuccess()
}

}
