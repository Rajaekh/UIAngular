export class Client {
  idClient: string = "";
  firstName: string = "";
  lastName: string = "";
  phone: string = "";
  email: string = "";
  gender: string = "";
  pays: string = "";
  ville: string = "";
  isInBlackList: boolean = false; // Correction ici
  montant: number = 0;
  beneficiaires: string[] = []; // Liste d'identifiants de bénéficiaires associés au client
}
