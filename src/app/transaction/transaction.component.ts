import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { IgxGridComponent } from 'igniteui-angular';
import { DialogMessageComponent } from '../dialog-message/dialog-message.component';
import { AppTransaction } from './transaction.interface';
import { AppTransactionService } from './transaction.service';
import * as fromApp from '../store/app.reducer'
import * as TransactionActions from "./store/transaction.actions"

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit {

  public transactions: AppTransaction[] = []

  constructor(private appTransactionService: AppTransactionService, private _dialog: MatDialog,
    private store: Store<fromApp.AppState>
  ) { }

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

    this.store.select('TransactionState').subscribe(
      (response: any) => {
        console.log(response.transactions?.data.document)
        this.transactions = response.transactions?.data.document
      }
    )

    if (!this.transactions) {
      this.store.dispatch(new TransactionActions.TryGetTransactions)

    }
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
