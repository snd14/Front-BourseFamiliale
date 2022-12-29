import { Component, OnInit } from '@angular/core';
import { PaiementService } from 'src/app/service/paiement.service';

@Component({
  selector: 'app-details-paiement',
  templateUrl: './details-paiement.component.html',
  styleUrls: ['./details-paiement.component.scss']
})
export class DetailsPaiementComponent implements OnInit {

  tokenGenere 

  constructor(private paiementService:PaiementService) { }

  ngOnInit(): void {
    this.generateToken()

  }

  generateToken(){
    this.paiementService.authentification().subscribe(res=>{
      this.tokenGenere = res
      console.log(this.tokenGenere)
      // this.listerPaiementsDuJour()
      // this.historiquePaiementsEffectue()

    }
    )
}

// Details d'un paiement effectué antérieurement (au moins Jour J-1)
detailsPaiementEffectue(token,id){
  this.paiementService.detailsPaiementEffectue(this.tokenGenere.token,2).subscribe(
    res=>{
      console.log(res);
      
    })
}

}
