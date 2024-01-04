import { Component,OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TransfertService } from '../../services/transfert.service';
import { transferModel } from 'src/app/models/transferModel.model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-edit-transfert',
  templateUrl: './edit-transfert.component.html',
  styleUrls: ['./edit-transfert.component.css']
})
export class EditTransfertComponent implements OnInit{
  transferId: string;
  autreMotifRestitution: string = '';
  trasferttrouve:transferModel;
constructor(private route: ActivatedRoute,private router: Router,public service: TransfertService,private toastr: ToastrService){}
ngOnInit(): void {
  this.route.params.subscribe(params => {
    this.transferId = params['id'];

  });
  this.getTransferts();
}
submitTransfertForm(form: NgForm) {
  console.log(this. trasferttrouve);
  this.service.EditTransfert(this.trasferttrouve.id,this.trasferttrouve).subscribe({
    next: res => {
      this.trasferttrouve = res as transferModel;
      // this.transferId="";
      this.router.navigate(['/list/transfer']);
    },
    error: err => {
      console.log(err);
    }
  });
}



  getTransferts(){
    this.service. getTransfert(this.transferId).subscribe({
      next:res=>{
      this.trasferttrouve = res as transferModel;
        console.log(this.trasferttrouve);
        this.service.transfers.splice(0, this.service.transfers.length);
        this.service.transfers.push(this.trasferttrouve);
      },
      error:err=>{
        console.log(err);
        this.toastr.info('No transfers found', 'Not Found', {
          timeOut: 3000
        });
      }
    })
  }
  TransfertAnnuler(form:NgForm){
      form.reset();
     this.service.TransferReference="";
      this.router.navigate(['/list/transfer']);
  }
}
