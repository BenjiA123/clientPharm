import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { IgxGridComponent } from 'igniteui-angular';
import { Subscription } from 'rxjs';
import { DialogMessageComponent } from '../dialog-message/dialog-message.component';
import { SearchService } from '../search/search.service';
import { AppTransactionService } from '../transaction/transaction.service';
import { Drug } from './drugs.interface';
import { DrugsService } from './drugs.service';
import * as fromApp from '../store/app.reducer'
import { Store } from '@ngrx/store';
import { environment } from "../../environments/environment"
import * as DrugActions from './store/drug.actions'



import { io } from "socket.io-client";

const socket = io(environment.baseUrl);
@Component({
  selector: 'app-drugs',
  templateUrl: './drugs.component.html',
  styleUrls: ['./drugs.component.scss'],
})
export class DrugsComponent implements OnInit, OnDestroy {
  currentUser: any

  constructor(
    private store: Store<fromApp.AppState>,
    private drugService: DrugsService,
    private appTransactionService: AppTransactionService,
    private searchService: SearchService,
    private _dialog: MatDialog,
  ) { }

  // @ViewChild('quantity',{static:false}) quantity:Number;
  @ViewChild('drugsGrid', { read: IgxGridComponent }) public grid: IgxGridComponent;

  private drugsSub: Subscription;
  public drugs: Drug[] = [];
  public transactionQueue: any[] = []
  public transactionData: any[] = []

  public idxColumnData: any[] = [
    { dataType: "string", width: '25%', hasSummary: false, field: "genericName", sortable: true, header: "Generic Name ", filterable: true },



    { dataType: "string", width: '25%', hasSummary: false, field: "brandName", sortable: true, header: "Brand Name ", filterable: true },



    { dataType: "number", width: '10%', hasSummary: false, field: "amount", sortable: false, header: "Amount ", filterable: false },



    { dataType: "number", width: '10%', hasSummary: true, field: "sellingPrice", sortable: false, header: "Selling Price ", filterable: false },



    { dataType: "string", width: '10%', hasSummary: false, field: "type", sortable: true, header: "Type ", filterable: false },



    { dataType: "boolean", width: '25%', hasSummary: false, field: "expired", sortable: true, header: "Expired ", filterable: false },



    { dataType: "boolean", width: '25%', hasSummary: false, field: "available", sortable: true, header: "Available ", filterable: false },

  ]




  addToQueue(form: NgForm) {
    if (form.invalid) {

      this._dialog.open(DialogMessageComponent, {
        data: { message: "Invalid Transaction" }
      })
      return
    }
    // alert("Added To Queue")
    if (this.transactionData.length > 0) {
      // This prevents multiple queues of the sametras data
      this.transactionData = this.transactionData.filter(transData => transData.drug.id != form.value.drug._id)

    }

    const transData = {
      customer: form.value.customer,
      drug: form.value.drug,
      quantity: form.value.quantity

    }

    this.transactionData.push(transData)

  }
  ngOnInit() {


    this.store.select('DrugState').subscribe(
      (response: any) => {
        this.drugs = response.drugs?.data.document


      }
    )

    if (!this.drugs) {
      this.store.dispatch(new DrugActions.TryGetDrugs())

    }

    this.store.select('AuthState').subscribe(
      (data) => {
        this.currentUser = data.currentUser

      }
    )




    this.drugsSub = this.searchService.searchedDrugsListener()
      .subscribe((drugs: any) => {
        this.drugs = drugs.drugs
      })
  }

  getDrug(cellValue: string) {

    this.drugService.getOneDrug(cellValue)
      .subscribe(
        (res: any) => {
          const drug = res.data.document

          if (this.transactionQueue.length > 0) {
            this.transactionQueue = this.transactionQueue.filter(drug => drug.id != cellValue)
          }
          this.transactionQueue.push(drug)
        }
      )
  }


  deleteDrugInTrans(drugId: string, index: number) {
    this.transactionQueue = this.transactionQueue.filter(drug => drug.id != drugId)
    this.transactionData = this.transactionData.filter(trans => trans.drug._id != drugId)

  }
  createPendingTransaction() {
    let customerArray: any[] = [];
    let customer: string
    let drugs: [{ drug: string, quantity: number }] = [{ drug: undefined, quantity: undefined }];

    for (let i = 0; i < this.transactionData.length; i++) {
      customerArray.push(this.transactionData[i].customer)
      drugs.push({ drug: this.transactionData[i].drug._id, quantity: this.transactionData[i].quantity })
      customer = customerArray[0]

    }

    drugs.shift()

    const transaction = {
      drugs: drugs,
      customerName: customer,
      creator: this.currentUser._id
    }


    this.appTransactionService.createPendingTransaction(transaction)
      .subscribe(res => {

        socket.emit("startChartUpdate");


        socket.on("updateTransGraph", (data: any) => {
          console.log("At client", data)
        })


        this._dialog.open(DialogMessageComponent, {
          data: { message: "Transaction Created" }
        })
        this.transactionQueue = []
        this.transactionData = []
      })

  }





  ngOnDestroy(): void {
    this.drugsSub.unsubscribe()
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.

  }
}
