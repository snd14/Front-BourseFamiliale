import { Beneficiaire } from "./beneficiaire"
import { Periode } from "./periode"

export class Paiement {
    id
    beneficiaire:any//Beneficiaire = new Beneficiaire()
    operateur
    datePaiement;
    cinTrouve
    periode:Periode = new Periode()
    montant
    soldeAvant;
    soldeApres;
    codeBureau;
     bureau;
     codeCaisse;
     auteur;
     caissier;
     signatureBeneficiaire;
     signatureCaisse;
     cinIsOk;
     status;
     dateCreation;
     dateModification;
     dateDebut;
     netapayer
     virementId
     codeOperation
     message
     numeroRecu
     date
     idBureau
     idDrp
     idCaisse
     
}
