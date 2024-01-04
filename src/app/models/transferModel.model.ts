export class transferModel {
notified: boolean;
id:string;
typeTransfert: string;
frais: string;
motifsTransfert: string;
dataeTransfert: Date;
montant: number;
nomBeneficiaire: string;
nomClient: string;
status:string;
idagent:string;
idBeneficiaire:string
idClient:string;
motifRestitution:string;
motifBlicage:string;
autreMotif:string;
valfrais:number=0;
otp:string;
reference:string;
}
export enum Status {
  Bloque ='Bloqué',
  Paye ='Payé',
  aservir='à servir',
  DeBloqeaServir ='débloqué à servir',
  Extourne='Extourné'
}
export enum BlocageMotif {
  ApresExpirationDelai = 'Bloqué après expiration du délai',
  ClientDonneurOrdreSoupcons = 'Bloqué client donneur d’ordre soupçons',
  ClientBeneficiaireSoupcons = 'Bloqué client bénéficiaire soupçons',
}
