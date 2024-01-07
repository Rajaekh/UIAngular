// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransfertComponent } from '../app/component/transfert/transfert.component';
import { TestComponent } from './test/test.component';
import { AdduserComponent } from './component/adduser/adduser.component';
import { AddBeneficiaireComponent } from './component/add-beneficiaire/add-beneficiaire.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './component/home/home.component';
import { ListTransfertComponent } from './component/list-transfert/list-transfert.component';
import { EditTransfertComponent } from './component/edit-transfert/edit-transfert.component';
import { ListUserComponent } from './component/list-user/list-user.component';
import { EditUserComponent } from './component/edit-user/edit-user.component';
const routes: Routes = [
  { path: '', component:HomeComponent},
  { path: 'editT/:id', component: EditTransfertComponent },
  { path: 'edituser/:id', component:EditUserComponent},
  { path: 'list/transfer', component:ListTransfertComponent},
  { path: 'transfert', component: TransfertComponent },
  { path: 'test', component:TestComponent},
  { path: 'adduser', component:AdduserComponent },
  { path: 'addbeneficaire', component:AddBeneficiaireComponent },
  { path: 'users', component:ListUserComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
