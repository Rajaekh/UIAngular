import { Injectable } from '@angular/core';
//import { WindowService } from './window.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
@Injectable({
  providedIn: 'root',
})
export class AuthService {

  public confirmationResult !: any
  constructor(private afAuth: AngularFireAuth) {}
  sendOTP(phoneNumber: string): Promise<any> {

    const appVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
    console.log(appVerifier);
    return this.afAuth
      .signInWithPhoneNumber(phoneNumber, appVerifier)
      .then((confirmationResult) => {
        this.confirmationResult = confirmationResult;
        return confirmationResult;
      }).catch(e => console.log(19,e));
  }
  verifyOtp(otp: string): Promise<firebase.auth.UserCredential> {
    if (!this.confirmationResult) {
        return Promise.reject('No confirmation result available.');
    }
        return this.confirmationResult.confirm(otp);
  }
}
