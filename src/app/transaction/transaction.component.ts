import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IgxGridComponent } from 'igniteui-angular';
import { DialogMessageComponent } from '../dialog-message/dialog-message.component';
import { AppTransaction } from './transaction.interface';
import { AppTransactionService } from './transaction.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit {

  transactions: AppTransaction[] = []

  constructor(private appTransactionService: AppTransactionService, private _dialog: MatDialog) { }

  @ViewChild('transactionsGrid', { read: IgxGridComponent }) public grid: IgxGridComponent;

  public idxColumnData: any[] = [
    { dataType: "string", width: '20%', hasSummary: false, field: "customerName", sortable: false, header: "Customer Name ", filterable: false },



    { dataType: "date", width: '15%', hasSummary: false, field: "transactionDate", sortable: true, header: "Date ", filterable: true },



    { dataType: "string", width: '15%', hasSummary: false, field: "creator.name", sortable: false, header: "Creator ", filterable: true },



    { dataType: "string", width: '15%', hasSummary: false, field: "approver.name", sortable: false, header: "Approver ", filterable: true },



    { dataType: "number", width: '15%', hasSummary: true, field: "totalprice", sortable: false, header: "Total ", filterable: false },



    { dataType: "boolean", width: '10%', hasSummary: false, field: "approved", sortable: true, header: "Approved ", filterable: false },




  ]



  ngOnInit(): void {
    this.appTransactionService.getAllTransaction()
      .subscribe((res: any) => {
        this.transactions = res.data.document
      })


  }

  approveTrans(transId: String) {

    this.appTransactionService.approveTrans(transId)
      .subscribe(() => {
        this._dialog.open(DialogMessageComponent, {
          data: { message: "Transaction Approved " }
        })
      })
  }
}
