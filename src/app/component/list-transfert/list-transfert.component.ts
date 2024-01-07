import { Component ,OnInit,ElementRef,ViewChild} from '@angular/core';
import { TransfertService } from '../../services/transfert.service';
import { transferModel } from 'src/app/models/transferModel.model';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-list-transfert',
  templateUrl: './list-transfert.component.html',
  styleUrls: ['./list-transfert.component.css']
})
export class ListTransfertComponent implements OnInit {
  trasferttrouve:transferModel;
  pdfurl: string = "";
  transfertId: any;
  page:number=1;
  totalLenght:any;



  @ViewChild('content') popupview !: ElementRef;
  constructor(public service: TransfertService,private toastr: ToastrService,private router: Router,

    private modalservice: NgbModal )  { }

  ngOnInit(): void {
    this.getTransfers();
  }
  getTransfers(): void {
    this.service.ListTransfert().subscribe((transfers) => {
      this.service.transfers = transfers;
    });
  }
  searchTransferts(){
    this.service.getTransfert(this.service.TransferReference).subscribe({
      next:res=>{
      this.trasferttrouve=res as transferModel;
        console.log(this.trasferttrouve);
        this.service.transfers.splice(0, this.service.transfers.length);
        this.service.transfers.push(this.trasferttrouve);
        this.router.navigate(['/editT', this.trasferttrouve.reference]);
      },
      error:err=>{
        console.log(err);
        this.toastr.info('No transfers found', 'Not Found', {
          timeOut: 3000
        });

      }
    })
  }
  PrintInvoice(transfertId: string) {
    this.service.GenerateInvoicePDF(transfertId).subscribe(res => {
      let blob: Blob = res.body as Blob;
      let url = window.URL.createObjectURL(blob);
      window.open(url);
    });

}

PreviewInvoice(transfertId: any) {
  this.transfertId = transfertId;
  this.service.GenerateInvoicePDF(transfertId).subscribe(res => {
    let blob: Blob = res.body as Blob;
    let url = window.URL.createObjectURL(blob);
    this.pdfurl = url;
    this.modalservice.open(this.popupview, { size: 'lg' });
    window.open(url);
  });
}

}
