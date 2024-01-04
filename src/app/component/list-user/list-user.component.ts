import { Component ,OnInit,ElementRef,ViewChild} from '@angular/core';
import { TransfertService } from '../../services/transfert.service';
import { transferModel } from 'src/app/models/transferModel.model';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {
  user:User;
  constructor(public service: TransfertService,private toastr: ToastrService,private router: Router,

    private modalservice: NgbModal )  { }

    ngOnInit(): void {
          this.getUsers();
          this.service.gsm="";
    }
    getUsers(){
      this.service.ListUser().subscribe({
        next:res=>{
          this.service.users=res as User[];
        },
        error:err=>{
          console.log(err);
        }
      })
    }

    searchUser(){
      this.service.searchUser(this.service.gsm).subscribe({
        next:res=>{
        this.user=res as User;
          console.log(this.user);
          this.service.users.splice(0, this.service.users.length);
          this.service.users.push(this.user);

        },
        error:err=>{
          console.log(err);
          this.toastr.info('No Cleint found', 'Not Found', {
            timeOut: 3000
          });

        }
      })
    }

}
