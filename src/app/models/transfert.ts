export class Transfert {

  id: string = '';
  idagent:string='';
  notified: boolean = false;
  typeTransfert: string = '';
  frais: string = '';
  otp: string = '';
  dateTransfert: Date = new Date();
  montant: number = 0;
  idBeneficiaire: string = '';
  idClient: string = '';
  motifstransfert:string='';
  plafondmaximal:number=2000;
  plafondAnnuel:number=20000;
  valfrais:number=0;
  status:string="";
  motifRestitution:string="";
  motifBlicage:string="";
  autreMotif:string="";
  dataeExpiration: Date = new Date();
  reference:string="";

}
// categories.enum.ts

export enum Motif{
  SoutienFamilial = 'Soutien familial',
  EpargneInvestissement = 'Epargne/investissement',
  Cadeau = 'Cadeau',
  PaiementBiensServices = 'Paiement de biens et de services',
  FraisDepassement = 'Frais de dépassement',
  FraisEducation = 'Frais d’éducation',
  LocationHypothèque = 'Location/Hypothèque',
  AideSecoursMédicale = 'Aide de secours/Médicale',
  RevenuSiteInternet = 'Revenu d’un site internet',
  DepensesSalariales = 'Dépenses salariales',
  FraisLoterieTaxes = 'Frais de loterie ou récompense/taxes',
  Pret = 'Prêt',
  CommerceInternet = 'Commerce sur internet',
  Donation = 'Donation',
  Autres = 'Autres (à préciser)'
}
export enum MotifRestitution {
  ErreurSaisieBeneficiaire = "Erreur de saisie du bénéficiaire",
  BeneficiaireIntrouvable = "Bénéficiaire introuvable",
  RefusBeneficiaire = "Refus du bénéficiaire",
  MontantIncorrect = "Montant incorrect",

}
