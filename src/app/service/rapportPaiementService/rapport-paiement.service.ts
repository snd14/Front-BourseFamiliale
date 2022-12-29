import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import { Observable } from 'rxjs';
import { Structures } from 'src/app/model/Structures';
import { Paiement } from 'src/app/model/paiement';
import { Drp } from 'src/app/model/Drp';

@Injectable({
  providedIn: 'root'
})
export class RapportPaiementService {

    baseUrl = environment.urlApi;
    urlNotreBackEnd = environment.urlNotreBackEnd

  constructor(private httpClient: HttpClient) { }

    getStructureByDrp(drpId: number) {
        return this.httpClient.get(environment.urlNotreBackEnd + '/structure/'+drpId)
    }
    getListPaiementCaisse(date1,date2,idCaisse): Observable<Paiement[]>{
      return this.httpClient.get<Paiement[]>(environment.urlNotreBackEnd+"/paiement/paiementcaisse/"+date1+"/"+date2+"/"+idCaisse)
    }

    getStructure(): Observable<Structures[]>{
      return this.httpClient.get<Structures[]>(environment.urlModulePrincipale+'dg_Structure')
    }

    getDRP(): Observable<Drp[]>{
      return this.httpClient.get<Drp[]>(environment.urlModulePrincipale+'dg_Drp')
    }

  getListPaiement(codeBureau, date1,date2): Observable<Paiement[]>{
      return this.httpClient.get<Paiement[]>(environment.urlNotreBackEnd+"/paiement/"+codeBureau+"/"+date1+"/"+date2)
    }

    getListPaiementDrp(idDrp, date1,date2): Observable<Paiement[]>{
      return this.httpClient.get<Paiement[]>(environment.urlNotreBackEnd+"/paiement/Paiement/"+date1+"/"+date2+"/"+idDrp)
    }
}
