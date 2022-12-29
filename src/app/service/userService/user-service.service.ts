import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

    //baseUrl = environment.urlApi;
    baseUrl = environment.urlNotreBackEnd;
    constructor(private httpClient: HttpClient) { }

    getUserByUsername(email):Observable<any> {
        return this.httpClient.get(this.baseUrl + '/user/email/' + email);
    }

    getUserById(id:number):Observable<any> {
        return this.httpClient.get(this.baseUrl + '/user/' + id);
    }

}
