import { Component, OnInit } from '@angular/core';
import {PaiementService} from "../../service/paiement.service";
import {BeneficiaireService} from "../../service/beneficiaireServices/beneficiaire.service";
import {HttpClient} from "@angular/common/http";
import {Beneficiaire} from "../../model/beneficiaire";

@Component({
  selector: 'app-beneficiaire',
  templateUrl: './beneficiaire.component.html',
  styleUrls: ['./beneficiaire.component.scss']
})
export class BeneficiaireComponent implements OnInit {

    beneficiaires
    detailDialog: boolean;
    beneficiaire: Beneficiaire=new Beneficiaire();

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

    constructor(private beneficiaireService:BeneficiaireService) { }

    ngOnInit(): void {
        //this.generateToken()
        this.getAllBeneficiaires()
    }

    // generateToken(){
    //     this.beneficiaireService.authentification().subscribe(res=>{
    //             this.tokenGenere = res
    //             console.log("testt");
    //             console.log(this.tokenGenere)
    //         }
    //     )
    // }

    // afficher la liste des beneficiaires
    getAllBeneficiaires(){
        console.log("testt");
        this.beneficiaireService.getAllBeneficiaires().subscribe( res=>{
                this.beneficiaires = res;
                console.log(this.beneficiaires);
            }
        )
    }

    getDetailBeneficiaire(beneficiaire: Beneficiaire) {
        this.beneficiaire = {...beneficiaire};
        this.detailDialog = true;
        //this.getAllBeneficiaire();
    }

}
