import { Component } from '@angular/core';
import { TransfertService } from '../../services/transfert.service';
import { Form, NgForm } from '@angular/forms';
import { Beneficiaire } from 'src/app/models/beneficiaire.model';
import { ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-add-beneficiaire',
  templateUrl: './add-beneficiaire.component.html',
  styleUrls: ['./add-beneficiaire.component.css']
})
export class AddBeneficiaireComponent {
  constructor(public service: TransfertService,private cdr: ChangeDetectorRef) { }
  updateUser() {

    this.service.EditUser(this.service.user.id,this.service.user).subscribe({
      next:res=>{
        console.log(res);

      },
      error: (err) => {
        console.log(err);
      }
    }

    );
  }
  ReInitialiseListBeneficaire():void{
    this.service.getBeneficiaire(this.service.user.id).subscribe({
      next:res=>{
            this.service.listBeneficiaire= res as Beneficiaire[];
            // Manually trigger change detection
        this.cdr.detectChanges();
      },
      error:err=>{
            console.log(err);
      }
    })
  }
  onSubmitBeneficiary(form: NgForm) {
    this.service.ajouterBeneficaire(this.service.beneficiary).subscribe({
      next: (res) => {
        console.log("Mlle. RAJAE");
        this.service.beneficiary = res as Beneficiaire;
        // Ensure that this.service.user.beneficiaires is initialized as an array
        this.service.user.beneficiaires = this.service.user.beneficiaires || [];
        // Assuming this.service.user.beneficiaires is an array of string (IDs)
        this.service.user.beneficiaires.push(this.service.beneficiary.id);
            this.updateUser();
            console.log("Beneficiaire ID: " + this.service.beneficiary.id);
            this.ReInitialiseListBeneficaire();
            // Manually trigger change detection
              this.cdr.detectChanges();

            this.service.addBeneficiaireVisible = false;
            this.service.resetBeneficaireForm();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
// si agent  clic sur le button annuler lors de l ajout d un beneficaire:
beneficiaryFormreset() {
  this.service.resetBeneficaireForm();
  this.service.addBeneficiaireVisible = false;
}
}
