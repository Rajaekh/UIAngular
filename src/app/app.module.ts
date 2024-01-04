// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';  // Assurez-vous que AppRoutingModule est importé après les autres modules
import { AppComponent } from './app.component';
import { TransfertComponent } from './component/transfert/transfert.component';
import { TestComponent } from './test/test.component';
import { HttpClientModule } from '@angular/common/http';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AdduserComponent } from './component/adduser/adduser.component';
import { AddBeneficiaireComponent } from './component/add-beneficiaire/add-beneficiaire.component';
import { SidbarComponent } from './component/sidbar/sidbar.component';
import { ListTransfertComponent } from './component/list-transfert/list-transfert.component';
import { HomeComponent } from './component/home/home.component';
import { EditTransfertStatusComponent } from './component/edit-transfert-status/edit-transfert-status.component';
import { EditTransfertComponent } from './component/edit-transfert/edit-transfert.component'
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment.development';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ListUserComponent } from './component/list-user/list-user.component';
@NgModule({
  declarations: [
    AppComponent,
    TransfertComponent,
    TestComponent,
    AdduserComponent,
    AddBeneficiaireComponent,
    SidbarComponent,
    ListTransfertComponent,
     HomeComponent,
     EditTransfertStatusComponent,
     EditTransfertComponent,
     ListUserComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule, // Ajoutez HttpClientModule ici
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    MatSelectModule,
    MatSlideToggleModule,
    BrowserAnimationsModule,
    NgxExtendedPdfViewerModule, // Ajoutez cette ligne
    AngularFireModule.initializeApp(environment.firebaseConfig),
    ToastrModule.forRoot(),
    NgbModule // ToastrModule added here


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
