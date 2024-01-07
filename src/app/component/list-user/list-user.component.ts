import { Component ,OnInit,ElementRef,ViewChild} from '@angular/core';
import { TransfertService } from '../../services/transfert.service';
import { transferModel } from 'src/app/models/transferModel.model';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/models/user.model';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../component/confirmation-dialog/confirmation-dialog.component';
@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {
  user:User;
  page:number=1;
  totalLenght:any;
  constructor(public service: TransfertService,private toastr: ToastrService,private router: Router,

    private modalservice: NgbModal ,private dialog: MatDialog)  { }

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
    deleteUser(iduser: string): void {
      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        data: { title: 'Confirmation', message: 'Are you sure you want to delete this user?' },
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          // User confirmed deletion
          this.service.deleteUser(iduser).subscribe({
            next: (res) => {
              this.toastr.info('Success', 'The client has been deleted', { timeOut: 3000 });
              this.getUsers();
            },
            error: (err) => {
              this.toastr.error('Error', 'The deletion operation has failed', { timeOut: 3000 });
              console.log(err);
            },
          });
        }
        // If result is false, the user canceled the deletion
      });
    }
}
