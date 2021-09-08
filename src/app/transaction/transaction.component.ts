import { Component, OnInit, ViewChild } from '@angular/core';
import { IgxGridComponent } from 'igniteui-angular';
import { AppTransaction } from './transaction.interface';
import { AppTransactionService } from './transaction.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit {

  transactions:AppTransaction[] = []

  constructor(private appTransactionService:AppTransactionService) { }

@ViewChild('transactionsGrid', { read: IgxGridComponent }) public grid: IgxGridComponent;


  ngOnInit(): void {
    this.appTransactionService.getAllTransaction()
    .subscribe((res:any)=>
    {
      this.transactions =res.data.document
    })


  }

}
