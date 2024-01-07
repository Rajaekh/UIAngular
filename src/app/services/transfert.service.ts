import { Injectable } from '@angular/core';
import { Beneficiaire } from '../models/beneficiaire.model';
import { Transfert,Motif ,MotifRestitution} from '../models/transfert';
import { User ,Role,TypeIdentite,Profession} from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { transferModel ,Status,BlocageMotif} from '../models/transferModel.model';
import { HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class TransfertService {
  constructor(private http: HttpClient, private toastr: ToastrService) { }
// champs pour otp de type string:
  transfertOTP:string="";
  transfers: transferModel[] = [];
  users: User[] = [];
  TransferReference:string="";
  gsm:string ="";

   // Ajoutez la variable transfertOTPVerified
  transfertOTPVerified: boolean = false;
  searchPhone: string = "";
  UserNotexiste: boolean =false;
  numPiece:string="";
  pieceType: string="";
  typePieceId:string="";
  idagent:string="";
  selectedTrnasfertType:string = "";
  typesTransfert: string[] = ['Par débit de compte', 'En espèce'];
  user: User = {
    id: "",
    name: "",
    lastname: "",
    email: "",
    password: "",
    role:Role.CLIENT,
    titre: "",
    typePieceIdentity:"",
    nIdentity: "",
    gsm: "",
    paysEmission: "",
    numeroPieceIdentite: "",
    dateExpirationPiece: new Date(),
    validitePieceIdentite: new Date(),
    dateNaissance: new Date(),
    datePremierTransfert:  new Date(),
    profession: "",
    paysNationalite: "",
    paysAdresse: "",
    adresseLegale: "",
    ville: "",
    estSupprimer: false,
    surListeNoire: false,
    montant: 0,
    beneficiaires: [],
    montantTransfertAnnuel:0
  };
  transfert: Transfert = {
    id: '',
    idagent:  '',
    notified: false,
    typeTransfert: '',
    frais: '',
    otp:'',
    dateTransfert: new Date(),
    dataeExpiration: new Date(),
    montant: 100,
    idBeneficiaire: '',
    idClient: '',
    motifstransfert:'',
    plafondmaximal:0,
    motifRestitution:"",
    plafondAnnuel:20000,
    status:"à servir",
    valfrais:0,
    autreMotif:"",
    motifBlicage:"",
    reference:"",
  };
  beneficiary:Beneficiaire={
      id: '',
      nom: '',
      prenom: '',
      numeroGsm: '',
      pieceIdentity: '',
  }
  typePieceIdentite:TypeIdentite[] = Object.values(TypeIdentite);
  professions:Profession[] = Object.values(Profession);
  motifRestitutions:MotifRestitution[] = Object.values(MotifRestitution);
  //BlocageMotif
  BlocageMotifs:BlocageMotif[] = Object.values(BlocageMotif);
  //Status
  Status:Status[] = Object.values(Status);
  //Motif
  motifstransferts:Motif[] = Object.values(Motif);
  // Déclaration et initialisation de la liste de bénéficiaires
  listBeneficiaire: Beneficiaire[] = [];
  addBeneficiaireVisible = false;
  transfertSubmitted: boolean =false;
  url: string = environment.apiBaseUrl;
  countries: any[] = [];
  private apiUrl = 'https://countriesnow.space/api/v0.1/countries';
  getCountries(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
  getCountriesAndCities(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  searchUser(gsm: string): Observable<User> {
    return this.http.get<User>(this.url + 'User/'+gsm);
  }
  getUserById(userId: string): Observable<User> {
    return this.http.get<User>(this.url+'User/UserById/'+userId);
  }
  getBeneficiaire(IdUser: string): Observable<Beneficiaire[]> {
    return this.http.get<Beneficiaire[]>(this.url + 'User/beneficiaire/' +IdUser);
  }

  validateMontant(montant: number): string {
    if (montant > this.transfert.plafondmaximal && montant > this.user.montant) {
      return 'Montant supérieur au plafond maximal du transfert et au solde du compte de paiement';
    } else if (montant > this.transfert.plafondmaximal) {
      return 'Montant supérieur au plafond maximal du transfert';
    } else if (montant > this.user.montant) {
      return 'Montant supérieur au solde du compte de paiement';
    } else {
      return null; // Aucun message d'erreur
    }
  }

  ajouterTransfert(transfert:any): Observable<any> {
    return this.http.post<any>(this.url + 'Transfert', transfert);
  }
  EditTransfert(id: string, trasferttrouve:transferModel): Observable<transferModel> {
    return this.http.put<transferModel>(`${this.url}Transfert/${id}`,trasferttrouve);
  }
  //pour faire restart user:
  // Dans votre service
resetUser(): void {
  this.user = {
    id: "",
    name: "",
    lastname: "",
    email: "",
    password: "dfghj",
    role: Role.CLIENT,
    titre: "",
    typePieceIdentity: "",
    nIdentity: "",
    gsm: "",
    paysEmission: "",
    numeroPieceIdentite: "",
    dateExpirationPiece: new Date(),
    validitePieceIdentite: new Date(),
    dateNaissance: new Date(),
    profession: "",
    paysNationalite: "",
    paysAdresse: "",
    adresseLegale: "",
    ville: "",
    estSupprimer: false,
    surListeNoire: false,
    montant: 0,
    datePremierTransfert:  new Date(),
    beneficiaires: [],
    montantTransfertAnnuel:0

  };
  this.transfert= {
    id: '',
    notified: false,
    typeTransfert: '',
    frais: '',
    otp: '1111',
    dateTransfert: new Date(),
    montant: 100,
    idBeneficiaire: '',
    idClient: '',
    motifstransfert:'',
    plafondmaximal:0,
    plafondAnnuel:20000,
    idagent:  '',
    status:"à servir",
    motifRestitution:"null",
    motifBlicage:"",
    dataeExpiration: new Date(),
    autreMotif:"null",
    valfrais:0,
    reference:"",
  };

}
ajouterBeneficaire(beneficaire:Beneficiaire): Observable<Beneficiaire> {
  return this.http.post<Beneficiaire>(this.url + 'Beneficaires', beneficaire);
}
// pour Modifier un user
EditUser(id:string, user: User): Observable<User> {
  return this.http.put<User>(this.url+"User/"+id, user);
}
resetBeneficaireForm(){
  this.beneficiary={
    id: '',
      nom: '',
      prenom: '',
      numeroGsm: '',
      pieceIdentity: '',
  }
}

//Methode pour faire la recherche par  identity :
getUserByIdentity(gsm: string): Observable<User> {
  return this.http.get<User>(this.url + 'User/UserByIdentity/'+gsm);
}
// pour ajouter un utilisateur :
AddUser(user:User):Observable<User> {
return this.http.post<User>(this.url+'User',user);
}
 // fonction pour faire restart ou champs des recherche
  resartsearchForm():void{
  this.numPiece='';
  this.pieceType='';
  this.searchPhone='';
  this.selectedTrnasfertType="";
  this.idagent='';}
  ListTransfert(): Observable<transferModel[]> {
    return this.http.get<transferModel[]>(this.url + 'Transfert');
  }
  // recuperer un transfert par son ID:
  getTransfert(transfertId:string):Observable<transferModel>{
    return this.http.get<transferModel>(this.url+'Transfert/'+transfertId)
  }
  GenerateInvoicePDF(transfertId: string) {
    return this.http.get(`${this.url}Transfert/generatepdf?transfertId=${transfertId}`, { observe: 'response', responseType: 'blob' });
  }
  ListUser():Observable<User[]> {
    return this.http.get<User[]>(this.url+'User');
  }
  ReInitialiseListBeneficiaire(): void {
    this.getBeneficiaire(this.user.id).subscribe({
      next: res => {
        this.listBeneficiaire = res as Beneficiaire[];
        console.log('Liste des bénéficiaires mise à jour :', this.listBeneficiaire);
        // Manually trigger change detection

      },
      error: err => {
        console.log(err);
      }
    });
  }


  deleteUser(id: string): Observable<any> {
    return this.http.delete<any>(`${this.url}User/${id}`);
  }
}


