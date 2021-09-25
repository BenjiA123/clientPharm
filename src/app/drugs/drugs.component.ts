import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { IgxGridComponent } from 'igniteui-angular';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { DialogMessageComponent } from '../dialog-message/dialog-message.component';
import { SearchService } from '../search/search.service';
import { AppTransactionService } from '../transaction/transaction.service';
import { Drug } from './drugs.interface';
import { DrugsService } from './drugs.service';
@Component({
  selector: 'app-drugs',
  templateUrl: './drugs.component.html',
  styleUrls: ['./drugs.component.scss'],
})
export class DrugsComponent implements OnInit, OnDestroy {

  constructor(private drugService: DrugsService,
    private appTransactionService: AppTransactionService,
    private searchService: SearchService,
    private authService: AuthService
    , private _dialog: MatDialog) { }

  // @ViewChild('quantity',{static:false}) quantity:Number;
  @ViewChild('drugsGrid', { read: IgxGridComponent }) public grid: IgxGridComponent;

  private drugsSub: Subscription;
  public drugs: Drug[];
  public transactionQueue: any[] = []
  public transactionData: any[] = []




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

    this.drugsSub = this.searchService.searchedDrugsListener()
      .subscribe((drugs: any) => {
        // this.grid.isLoading = true
        this.drugs = drugs.drugs
        // this.grid.isLoading = false
      })


    this.drugService.getAllDrugs()
      .subscribe(
        (response: any) => {
          // this.grid.isLoading = true
          this.drugs = response.data.document
          // this.grid.isLoading = false
        }
      )
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
      creator: this.authService.getCurrentUser()._id
    }


    this.appTransactionService.createPendingTransaction(transaction)
      .subscribe(res => {

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
