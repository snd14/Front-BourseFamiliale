import { Component, OnInit } from '@angular/core';
import { PaiementService } from 'src/app/service/paiement.service';

@Component({
  selector: 'app-historique',
  templateUrl: './historique.component.html',
  styleUrls: ['./historique.component.scss']
})
export class HistoriqueComponent implements OnInit {
  tokenGenere
  listeDesPaiementsAafficher
  texteAafficher
  displayDetailsDialog:boolean
  paiementChoisi
  //si on choisit les historiques pour le jour
  choixJour:boolean = false
  choixTousPaiements:boolean = false
  //si on choisit les historiques pour des anuulations
  choixAnnulation:boolean = false




  constructor(private paiementService:PaiementService) { }

  ngOnInit(): void {
    this.generateToken()

  }

  generateToken(){
    this.paiementService.authentification().subscribe(res=>{
      this.tokenGenere = res
      console.log(this.tokenGenere)
      // this.listerPaiementsDuJour()
      // this.historiquePaiementsEffectue()

    }
    )
}


// afficher la liste des paiements du jour
listerPaiementsDuJour(){
  this.paiementService.listerPaiementsDuJour(this.tokenGenere.token).subscribe(
      res=>{
        this.choixJour = true
        this.choixAnnulation = false
        this.choixTousPaiements = false

        this.texteAafficher = "du jour"
        this.listeDesPaiementsAafficher = res['hydra:member']
        console.log(this.listeDesPaiementsAafficher);
      }
    )
}

// afficher la liste de tous les paiements
// Historique des Paiements (effectué au moins à jour J-1).
historiquePaiementsEffectue(){
  this.paiementService.historiquePaiementsEffectue(this.tokenGenere.token).subscribe(res=>{
    this.choixTousPaiements = true
    this.choixAnnulation = false
    this.choixJour = false

    this.texteAafficher = "(effectué au moins à jour J-1)"
    this.listeDesPaiementsAafficher = res['hydra:member']
    console.log(res);
    console.log(this.listeDesPaiementsAafficher);
  })
}
//historique des paiements annulés
listerAnnulations(){
  this.paiementService.listerAnnulations(this.tokenGenere.token).subscribe(res=>{
    this.texteAafficher = "annulés"
    this.choixAnnulation = true
    this.choixJour = false
    this.choixTousPaiements = false


    this.listeDesPaiementsAafficher = res['hydra:member']
    console.log(this.choixAnnulation)

    console.log(res);
    console.log(this.listeDesPaiementsAafficher);
  })
}

// Details d'un paiement effectué antérieurement (au moins Jour J-1)
detailsPaiementEffectue(id){
  this.paiementService.detailsPaiementEffectue(this.tokenGenere.token,id).subscribe(
    res=>{
      console.log(res);
      this.displayDetailsDialog = true
      this.paiementChoisi = res
      console.log(this.paiementChoisi);

    })
}

// Détails d'un Paiement du Jour.
detailsPourUnPaiementDuJour(id):any{
  // console.log("jour");
  this.paiementService.detailsPourUnPaiementDuJour(this.tokenGenere.token,id).subscribe(
    res=>{
      this.paiementChoisi = res
      this.displayDetailsDialog = true
      console.log(this.paiementChoisi);
    })
}

// Détails d'une annulation
detailsAnnulation(id):any{
  this.paiementService.detailsAnnulation(this.tokenGenere.token,id).subscribe(
    res=>{
      console.log(res);
      this.paiementChoisi = res
      this.displayDetailsDialog = true

    }
  )

}
}
