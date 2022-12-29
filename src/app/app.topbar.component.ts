import { Component, OnDestroy } from '@angular/core';
import { AppMainComponent } from './app.main.component';
import { Subscription } from 'rxjs';
import { MenuItem } from 'primeng/api';
import {UserServiceService} from "./service/userService/user-service.service";
import {KeycloakService} from "keycloak-angular";
import {Router} from "@angular/router";

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent {

    user : any;
    users:any;
    username:any;
    items: MenuItem[];

    constructor(public appMain: AppMainComponent,   protected readonly router: Router,
    private userService: UserServiceService,
                public keycloak: KeycloakService) {
        this.keycloak.loadUserProfile().then( res => {
            console.log(res);
            this.users = res;
            this.username= res.username;
            console.log(res.username);
            this.getStructure(res.username);
        });
    }

    public getStructure(username){
        console.log(username);
        return this.userService.getUserByUsername(username).subscribe(data => {
            console.log(data);
            this.user = data;
        })
    }

    public deconnexion() {
        return this.keycloak.logout();
       // this.router.navigate(['/']);

    }

}
