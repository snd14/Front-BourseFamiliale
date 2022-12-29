import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OperateurService {

  constructor(private httpClient: HttpClient) { }
  urlNotreBackEnd = environment.urlNotreBackEnd


  saveOperateur(operateur):any{
    return this.httpClient.post(this.urlNotreBackEnd+"beneficiaire",operateur)
  }}
