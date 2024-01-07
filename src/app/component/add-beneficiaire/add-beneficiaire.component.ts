import { Component } from '@angular/core';
import { TransfertService } from '../../services/transfert.service';
import { Form, NgForm } from '@angular/forms';
import { Beneficiaire } from 'src/app/models/beneficiaire.model';
import { ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-add-beneficiaire',
  templateUrl: './add-beneficiaire.component.html',
  styleUrls: ['./add-beneficiaire.component.css']
})
export class AddBeneficiaireComponent {
  constructor(public service: TransfertService, private cdr: ChangeDetectorRef, public router: Router, private toastr: ToastrService) { }
  updateUser() {

    this.service.EditUser(this.service.user.id, this.service.user).subscribe({
      next: res => {
        console.log(res);

      },
      error: (err) => {
        console.log(err);
      }
    }

    );
  }
  ReInitialiseListBeneficiaire(): void {

  }

  onSubmitBeneficiary(form: NgForm) {
    delete this.service.beneficiary.id;
    this.service.ajouterBeneficaire(this.service.beneficiary, this.service.user.email).subscribe({
      next: (res) => {
        console.log("Mlle. RAJAE");
        console.log("***********************************");
        console.log(res as Beneficiaire, this.service.user.beneficiaires);
        console.log("***********************************");
        this.service.beneficiary = res as Beneficiaire;

        if (this.service.user.beneficiaires) {
          this.service.user.beneficiaires.push(res.id);
        } else {
          this.service.user.beneficiaires = [res.id]
        }
        // this.updateUser();

        // Ajoutez l'appel à la fonction pour mettre à jour la liste des bénéficiaires
        this.service.getBeneficiaire(this.service.user.email).subscribe({
          next: res => {

            this.service.listBeneficiaire = res as Beneficiaire[];
            console.log('Liste des bénéficiaires mise à jour :', this.service.listBeneficiaire);
            // Manually trigger change detection
            this.cdr.detectChanges();
            this.toastr.success('Success', 'Beneficiary successfully added', {
              timeOut: 1500
            });
          },
          error: err => {
            console.log(err);
            this.toastr.error('Error', 'Beneficiary with these coordinates already exists', {
              timeOut: 1500
            });

          }
        });

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
