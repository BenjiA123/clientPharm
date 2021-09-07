import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { IgxGridComponent } from 'igniteui-angular';
import { Subscription } from 'rxjs';
import { SearchService } from '../search/search.service';
import { AppTransactionService } from '../transaction/transaction.service';
import { Drug } from './drugs.interface';
import { DrugsService } from './drugs.service';
@Component({
  selector: 'app-drugs',
  templateUrl: './drugs.component.html',
  styleUrls: ['./drugs.component.scss'],
})
export class DrugsComponent implements OnInit,OnDestroy {

constructor(private drugService:DrugsService,private appTransactionService: AppTransactionService,private searchService:SearchService) {}

@ViewChild('quantity',{static:false}) quantity:Number;
@ViewChild('drugsGrid', { read: IgxGridComponent }) public grid: IgxGridComponent;

private drugsSub: Subscription;
public drugs :Drug[];
public transactionDrugs :any[] =[]

public transactionDataWithQuantity:any =[]

  ngOnInit() {

    this.drugsSub = this.searchService.searchedDrugsListener()
    .subscribe((drugs:any)=>{
      // this.grid.isLoading = true
      this.drugs = drugs.drugs
      // this.grid.isLoading = false
    })


  this.drugService.getAllDrugs()
  .subscribe(
    (response:any)=>{
      // this.grid.isLoading = true
      this.drugs = response.data.document
      // this.grid.isLoading = false
    }
  )
  }

  getDrug(cellValue:string){

    this.drugService.getOneDrug(cellValue)
    .subscribe(
      (res:any)=>{
        const drug = res.data.document
        this.transactionDrugs.push(drug)
      }
    )
  }


  deleteDrugInTrans(drugId:string){
    this.transactionDrugs = this.transactionDrugs.filter(drug =>drug.id != drugId)
  }
  quantityX
  createPendingTransaction(){

    this.transactionDataWithQuantity= [

    ]
    const transaction = {
      customerName: "Benjamin",
      quantity:[
        3,5
      ],
      drugs:this.transactionDrugs,
      // To get the creator, we retrieve it from the auth
      creator:"5f518bfa17ab81425883fde4"
    }
    
    console.log(this.quantityX,transaction)


    // this.appTransactionService.createPendingTransaction(transaction)
    // .subscribe(res =>console.log(res))

  }





  ngOnDestroy(): void {
    this.drugsSub.unsubscribe()
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    
  }
}
