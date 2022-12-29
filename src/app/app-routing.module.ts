import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DocumentationComponent } from './components/documentation/documentation.component';
import { AppMainComponent } from './app.main.component';
import { BlocksComponent } from './components/blocks/blocks.component';
import { InvalidStateComponent } from './components/invalidstate/invalidstate.component';
import { ErrorComponent } from './components/error/error.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { AccessComponent } from './components/access/access.component';
import { PaiementComponent } from './components/paiement/paiement.component';
import { HistoriqueComponent } from './components/historique/historique.component';
import { DetailsPaiementComponent } from './components/details-paiement/details-paiement.component';
import { AuthGuard } from './components/keycloak/auth.guard';
import {Beneficiaire} from "./model/beneficiaire";
import {BeneficiaireComponent} from "./components/beneficiaire/beneficiaire.component";
import {RapportBureauComponent} from "./components/rapport-bureau/rapport-bureau.component";
import { RapportDrpComponent } from './components/rapport-drp/rapport-drp.component';
import { RapportParBureauComponent } from './components/rapport-par-bureau/rapport-par-bureau.component';
import { RapportParAgentComponent } from './components/rapport-par-agent/rapport-par-agent.component';
@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', component: AppMainComponent, canActivate:[AuthGuard],
                children: [
                    {path: '',canActivate:[AuthGuard], component: DashboardComponent},
                    {path: 'uikit/invalidstate', component: InvalidStateComponent},
                    {path: 'uikit/menu', loadChildren: () => import('./components/menus/menus.module').then(m => m.MenusModule)},
                    {path: 'blocks', component: BlocksComponent},
                    {path: 'documentation', component: DocumentationComponent},
                    {path: 'payer', component: PaiementComponent},
                    {path: 'historique', component: HistoriqueComponent},
                    {path: 'details-paiement', component: DetailsPaiementComponent},
                    {path: 'beneficiaires', component: BeneficiaireComponent},
                    {path: 'rapportBureau', component: RapportBureauComponent},
                    {path: 'rapportDrp', component: RapportDrpComponent},
                    {path: 'rapportParBureau', component: RapportParBureauComponent},
                    {path: 'rapportParAgent', component: RapportParAgentComponent},


                ],
            },
            {path:'pages/error', component: ErrorComponent},
            {path:'pages/notfound', component: NotfoundComponent},
            {path:'pages/access', component: AccessComponent},
            {path: '**', redirectTo: 'pages/notfound'},
        ], {scrollPositionRestoration: 'enabled', anchorScrolling:'enabled'})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
