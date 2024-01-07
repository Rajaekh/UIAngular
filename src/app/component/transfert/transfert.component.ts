import { Component, OnInit ,ElementRef,ViewChild} from '@angular/core';
import { TransfertService } from '../../services/transfert.service';
import { User } from '../../models/user.model';
import { Transfert, Motif } from 'src/app/models/transfert';
import { Form, NgForm } from '@angular/forms';
import { Beneficiaire } from 'src/app/models/beneficiaire.model';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-transfert',
  templateUrl: './transfert.component.html',
  styleUrls: ['./transfert.component.css']
})
export class TransfertComponent implements OnInit {
  constructor(public service: TransfertService,private toastr: ToastrService,public authService: AuthService,private router: Router,

    private modalservice: NgbModal )  { }

//je peut l utiliser pour stocker temporairement les donnes de transfert :
  temporaryTransfertData: any;
  motifTransfert: Motif;
  otp:string;
  pdfurl: string = "";
  @ViewChild('content') popupview !: ElementRef;
  errorMessage:string;
  selectedBeneficiaire: string = "";
  countriesAndCities: any[] = [];
  montantSaisi: number;
  validationMessage: string;
  countries: any[] = [];
  transfertId: any;
  ngOnInit(): void {
    this.service.getCountries().subscribe((data) => {
      this.countries = data.data;
    });
    this.service.ReInitialiseListBeneficiaire();
  }


getUserByIdentity():void{
  // faire l initialisation de l 'utilisateur a nouveau s' il exsiste:
  this.service.transfert.idagent=this.service.idagent;
  this.service.resetUser();
  // Appelez la méthode de recherche du service en passant la valeur actuelle du téléphone
  this.service.getUserByIdentity(this.service.numPiece)
    .subscribe({
      next: (res) => {
        this.service.user = res as User;
        this.service.UserNotexiste = false;
        console.log(this.service.user);

        if (this.service.user) {
          this.service.getBeneficiaire(this.service.user.id)
            .subscribe({
              next: (resBeneficiaire) => {
                this.service.listBeneficiaire = resBeneficiaire as Beneficiaire[];
                this.service.transfert.typeTransfert = this.service.selectedTrnasfertType;
                this.service.transfert.idClient = this.service.user.id;
                console.log(this.service.listBeneficiaire);
              },
              error: (errBeneficiaire) => {
                console.log(errBeneficiaire);
                console.log(this.service.UserNotexiste);
              }
            });
            this.service.transfert.plafondmaximal=80000;
        }

      },
      error: (err) => {
        console.log(err);
        // ici la mal9inach usilisateur jarbhta fi ga3 lblayc hna li khdmt
        if (this.service.user.id.length===0){
          this.service.UserNotexiste = true;
          console.log(this.service.UserNotexiste);
           // Affichez le toast d'information sur l'utilisateur inexistant
          this.toastr.info('Le client avec ce numéro n\'existe pas. Vous pouvez l\'ajouter.', 'Information', {
            timeOut: 5000,});
        }

      }
    });
}
  search(): void {
    // faire l initialisation de l 'utilisateur a nouveau s' il exsiste:
    this.service.resetUser();
    // Appelez la méthode de recherche du service en passant la valeur actuelle du téléphone
    this.service.searchUser(this.service.searchPhone)
      .subscribe({
        next: (res) => {
          this.service.user = res as User;
          this.service.UserNotexiste = false;
          console.log(this.service.user);
          this.service.transfert.plafondmaximal=2000;
          if (this.service.user) {
            this.service.getBeneficiaire(this.service.user.id)
              .subscribe({
                next: (resBeneficiaire) => {
                  this.service.listBeneficiaire = resBeneficiaire as Beneficiaire[];
                  this.service.transfert.typeTransfert = this.service.selectedTrnasfertType;
                  this.service.transfert.idClient = this.service.user.id;
                  console.log(this.service.listBeneficiaire);
                },
                error: (errBeneficiaire) => {
                  console.log(errBeneficiaire);
                  console.log(this.service.UserNotexiste);
                }
              });
          }

        },
        error: (err) => {
          console.log(err);
          // ici la mal9inach usilisateur jarbhta fi ga3 lblayc hna li khdmt
          if (this.service.user.id.length===0){
            this.service.UserNotexiste = true;
            console.log(this.service.UserNotexiste);
             // Affichez le toast d'information sur l'utilisateur inexistant

            this.toastr.info('Le client avec ce numéro n\'existe pas. Vous pouvez l\'ajouter.', 'Information', {
              timeOut: 5000,});
          }

        }
      });
  }

  validateMontant(): string {
    // il ya la validation Backend

    return  this.validationMessage=this.service.validateMontant(this.service.transfert.montant);
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      if(this.service.numPiece){
        this.getUserByIdentity();
        this.service.transfert.plafondmaximal=8000;
        this.service.transfert.idagent=this.service.idagent;
      }
      else if (this.service.searchPhone) {
        this.search();
        this.service.transfert.plafondmaximal=2000;
        this.service.transfert.idagent=this.service.idagent;
      } else {

      }

    }
  }
  // pour faire la soumission de la formulaire du transfert:submitTransfertForm(form)
  submitTransfertForm(form:NgForm) {
    if(this.validationMessage){
      this.toastr.error('Error', this.validationMessage, {
        timeOut: 3000
      });
    }

      this.service.ajouterTransfert(this.service.transfert).subscribe({
        next: (res) => {
           // Accédez à l'identifiant dans l'objet de réponse
          const nouvelIdentifiant = res.id;
          console.log('le transfert est bien passé');
          this.PrintInvoice(nouvelIdentifiant);

          //fait reset pour user et aussi pour transfert
          this.service.resetUser();
          this.service.resartsearchForm()
        },
        error: (err) => {
          console.error(err);
          // Traitez les erreurs ici
          if (err.status === 400) {
            console.log("error");
            console.log(this.service.transfert);
          } else {
            console.log("error");
            console.log(this.service.transfert);
          }
        },
      });
  }
  //afficher le composant pour ajouter un beneficaire si le button est clicker
  afficherAddBeneficiaire() {
    this.service.addBeneficiaireVisible = true;
  }
  resetFormloschangetype():void{
    this.service.resetUser();
    this.router.navigate(['/transfert']);
  }
  TransfertAnnuler():void{
    this.service.resetUser();
    this.service.resartsearchForm();
    this.router.navigate(['/transfert']);
  }
  // Methode pour la verification de l otp:


  verifyOtp() {
    this.otp= this.service.transfert.otp;
    console.log(this.service.transfert);
    this.authService.verifyOtp(this.otp)
      .then(() => {
        this.toastr.success('OTP verified successfully' ,'Succès', {
          timeOut: 1500
        });
        this.service.ajouterTransfert(this.temporaryTransfertData).subscribe({
          next: (res) => {
             // Accédez à l'identifiant dans l'objet de réponse
              const nouvelIdentifiant = res.id;
              this.toastr.success('le transfert est bien passé' ,'Succès', {
                timeOut: 1500
              });
              this.PrintInvoice(nouvelIdentifiant);
            console.log("le transfert est bien passé");
            //fait reset pour user et aussi pour transfert
            this.service.resetUser();
            this.service.resartsearchForm()
          this.service.transfertSubmitted=false;
          },
          error: (err) => {
            console.error(err);
            // Traitez les erreurs ici
            if (err.status === 400) {
              console.log("error");
              console.log(this.service.transfert);
            } else {
              console.log("error");
              console.log(this.service.transfert);
            }
          },
        });
      })
      .catch((error) => {
        console.error(error);
        this.errorMessage = "OTP not verified";
      });
  }
  async sendOtp(form:NgForm) {
    if(form.valid){
      this.service.searchPhone=this.service.user.gsm;
    try {
      console.log(this.service.searchPhone);

      const x = await this.authService.sendOTP(this.service.searchPhone);

      this.temporaryTransfertData = { ...this.service.transfert };
      this.service.transfertSubmitted=true;
    } catch (error) {
      console.log(error);

    }}
  }

  AfficheFormOtp(form:NgForm){
    if(form.valid){
      this.temporaryTransfertData = { ...this.service.transfert };
      this.service.transfertSubmitted=true;
    }
  }

  PrintInvoice(transfertId: string) {
    this.service.GenerateInvoicePDF(transfertId).subscribe(res => {
      let blob: Blob = res.body as Blob;
      let url = window.URL.createObjectURL(blob);
      window.open(url);
    });

}

PreviewInvoice(transfertId: any) {
  this.transfertId = transfertId;
  this.service.GenerateInvoicePDF(transfertId).subscribe(res => {
    let blob: Blob = res.body as Blob;
    let url = window.URL.createObjectURL(blob);
    this.pdfurl = url;
    this.modalservice.open(this.popupview, { size: 'lg' });
    window.open(url);
  });
}

}
