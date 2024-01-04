import { Component,OnInit } from '@angular/core';
import { TransfertService } from '../../services/transfert.service';
import { Form, NgForm } from '@angular/forms';
import { User } from 'src/app/models/user.model';
@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent {
  constructor(public service: TransfertService) { }
  countries: any[] = [];

  ngOnInit(): void {
    this.service.getCountries().subscribe((data) => {
      this.countries = data.data;
    });
  }
  onSubmit(form: NgForm) {
  console.log(this.service.user);

  if (form.valid) {
    this.service.AddUser(this.service.user).subscribe({
      next: (res: User) => {
        // Check if the response is valid
        if (res) {
          this.service.user = res as User;
          console.log("l'ajout est réussi ");
          console.log(this.service.user);
          // on fait RESTART ou formulaire d ajout :
          this.service.UserNotexiste=false;
          this.service.user.id=this.service.user.id;
          this.service.searchPhone=this.service.user.gsm;
          this.service.pieceType=this.service.user.typePieceIdentity;
          this.service.numPiece=this.service.user.n_identity;
        } else {
          console.log('Invalid response:', res);
          // Handle the invalid response as needed
        }
      },
      error: err => {
        console.log("Il y a un problème ");
        console.log(err);
      }
    });
  }
}

CancelAdd():void{
  this.service.resetUser();
  this.service.UserNotexiste=false;
  this.service.resartsearchForm();
}



}
