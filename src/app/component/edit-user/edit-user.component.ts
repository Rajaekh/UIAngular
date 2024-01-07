import { Component,OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TransfertService } from '../../services/transfert.service';
import { transferModel } from 'src/app/models/transferModel.model';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  UserId: string;

  constructor(private route: ActivatedRoute,private router: Router,public service: TransfertService,private toastr: ToastrService){}

  ngOnInit(): void {
    // pour recuperer id a partire de url
    this.route.params.subscribe(params => {
      this. UserId = params['id'];});
      console.log(this.UserId);
      this.getUser();
      this.service.getCountries().subscribe((data) => {
        this.service.countries = data.data;
      });
}
// on appel la methode qui nous permet de recuperer un userBy id
getUser():void{
  this.service.getUserById(this.UserId).subscribe({
    next:res=>{
      this.service.user= res as User;
    },
    error:err=>{
      this.toastr.error('Error', 'user does not exist', {
        timeOut: 3000
      });

    }
  })
}
onSubmit(userForm:NgForm):void{
  if(userForm.valid){
    this.service.EditUser(this.UserId,this.service.user).subscribe({
      next:res=>{
        this.router.navigate(['/users']);
      }
    })
  }

}
CancelEditUser(userForm:NgForm){
  userForm.reset();
  this.router.navigate(['/users']);
}
}
