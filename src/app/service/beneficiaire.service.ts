import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BeneficiaireService {

  constructor(private httpClient: HttpClient) { }
  urlNotreBackEnd = environment.urlNotreBackEnd


  saveBeneficiaire(beneficiaire):any{
    return this.httpClient.post(this.urlNotreBackEnd+"beneficiaire",beneficiaire)
  }

}
