import { Injectable } from '@angular/core';
import {Login} from "../../model/login";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class BeneficiaireService {

    login:Login = new Login()

    constructor(private httpClient: HttpClient) {}

    baseUrl = environment.urlApi;
    urlNotreBackEnd = environment.urlNotreBackEnd
    headers:HttpHeaders
    params: HttpParams

    authentification(){
        return this.httpClient.post(this.baseUrl+"login",this.login)
    }

    saveBeneficiaire(beneficiaire):any{
        return this.httpClient.post(this.urlNotreBackEnd+"/beneficiaire",beneficiaire)
    }

    // Relevé ou vérifiier si le bénéficaire a une bourse à payer
    getAllBeneficiaires(){
        return this.httpClient.get(this.urlNotreBackEnd+"/beneficiaires")
    }
}
