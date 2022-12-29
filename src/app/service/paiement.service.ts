import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Login } from '../model/login';

@Injectable({
  providedIn: 'root'
})
export class PaiementService {

  login:Login = new Login()

  constructor(private httpClient: HttpClient, ) {

   }

  baseUrl = environment.urlApi;
  urlNotreBackEnd = environment.urlNotreBackEnd
  headers:HttpHeaders
  params: HttpParams

  authentification(){
    return this.httpClient.post(environment.urlApi+"login",this.login)
  }

  testToken(token){
    return this.httpClient.get(environment.urlApi+"paiements",
    {headers: new HttpHeaders({"X-AUTH-TOKEN":token })})

}

// Relevé ou vérifiier si le bénéficaire a une bourse à payer
verifierExistencePaiement(token,body):any{
  return this.httpClient.post(environment.urlApi+"paiement_jours",body,
    {headers: new HttpHeaders({"X-AUTH-TOKEN":token })})

  }

  // Valider un Paiement
  validerUnPaiement(token,body):any{
    return this.httpClient.post(environment.urlApi+"paiement_jours/confirmer",body,
    {headers: new HttpHeaders({"X-AUTH-TOKEN":token })})
  }

  // Signer un paiement effectué.
  signerUnPaiementEffectue(token,body):any{
    return this.httpClient.post(environment.urlApi+"paiement_jours/sign",body,
    {headers: new HttpHeaders({"X-AUTH-TOKEN":token })})
  }

  //Liste des Periodes ou campagnes de paiement
    listPeriodes(token){
    return this.httpClient.get(this.baseUrl+"periodes",
{headers: new HttpHeaders({"X-AUTH-TOKEN":token })})
}

/* Annulation paiement*/
// Détails d'une annulation
detailsAnnulation(token,id):any{
  return this.httpClient.get(this.baseUrl+"paiements/"+id,
  {headers: new HttpHeaders({"X-AUTH-TOKEN":token })})
}

// Annuler un paiement
annulerUnPaiement(token,id):any{
  return this.httpClient.get(this.baseUrl+"paiements/annuler/"+id,
  {headers: new HttpHeaders({"X-AUTH-TOKEN":token })})
}





/* partie paiement paiement du jour*/

// Détails d'un Paiement du Jour.
detailsPourUnPaiementDuJour(token,id):any{
  return this.httpClient.get(this.baseUrl+"paiement_jours/"+id,
  {headers: new HttpHeaders({"X-AUTH-TOKEN":token })})

}

// Liste des Paiements du jour
listerPaiementsDuJour(token):any{
  return this.httpClient.get(this.baseUrl+"paiement_jours",
  {headers: new HttpHeaders({"X-AUTH-TOKEN":token })})

}
/*fin partie paiement paiement du jour*/

/* partie historique des paiements */

// Historique des Paiements (effectué au moins à jour J-1).
historiquePaiementsEffectue(token):any{
  return this.httpClient.get(this.baseUrl+"paiements",
  {headers: new HttpHeaders({"X-AUTH-TOKEN":token })})
  
}

// Liste des annulations
listerAnnulations(token):any{
  return this.httpClient.get(this.baseUrl+"paiements/annulations",
  {headers: new HttpHeaders({"X-AUTH-TOKEN":token })})
  
}

// Details d'un paiement effectué antérieurement (au moins Jour J-1)
detailsPaiementEffectue(token,id):any{
  return this.httpClient.get(this.baseUrl+"paiements/"+id,
  {headers: new HttpHeaders({"X-AUTH-TOKEN":token })})
}

/*fin partie historique des paiements */







//apiLocal
savePaiementLocal(paiement):any{
  return this.httpClient.post(this.urlNotreBackEnd+"/paiement/paiement",paiement)
}








}
