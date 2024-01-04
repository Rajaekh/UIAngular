export class User {
  id: string = '';
  name: string = '';
  lastname: string = '';
  email: string = '';
  password: string = '';
  role: Role = Role.CLIENT;
  titre: string = '';
  typePieceIdentity: string = '';
  nIdentity: string = '';
  gsm: string = '';
  numeroPieceIdentite: string = '';
  dateExpirationPiece: Date = new Date();
  paysEmission: string = '';
  validitePieceIdentite: Date = new Date();
  dateNaissance: Date = new Date();
  profession: string = '';
  paysNationalite: string = '';
  paysAdresse: string = '';
  adresseLegale: string = '';
  ville: string = '';
  estSupprimer: boolean = false;
  surListeNoire: boolean = false;
  montant: number = 0;
  beneficiaires: string[] = [];
  datePremierTransfert: Date = new Date();
  montantTransfertAnnuel:number=0;
}

export enum Role {
  CLIENT = 'CLIENT',
  ADMIN = 'ADMIN',
  AGENT = 'AGENT'
}

// Dans votre fichier TypeScript
export enum TypeIdentite {
  CarteIdentiteNationale = "Carte d'identité nationale",
  Passeport = "Passeport",
  PermisConduire = "Permis de conduire",
  CarteResident = "Carte de résident",
  CarteElecteur = "Carte d'électeur",
  CarteSecuriteSociale = "Carte de sécurité sociale",
  CarteEtudiant = "Carte d'étudiant",
  CarteTravail = "Carte de travail",
  CarteMembre = "Carte de membre",
  Autre = "Autre (à préciser)"
}
export enum Profession {
  Etudiant = 'Étudiant',
  Employe = 'Employé',
  TravailleurIndependant = 'Travailleur indépendant',
  Autre = 'Autre',
  Enseignant = 'Enseignant',
  Artiste = 'Artiste',
  Medecin = 'Médecin',
  Ingenieur = 'Ingénieur'
}
