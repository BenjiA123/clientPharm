import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { IgxGridComponent } from 'igniteui-angular';
import { Subscription } from 'rxjs';
import { SearchService } from '../search/search.service';
import { Drug } from './drugs.interface';
import { DrugsService } from './drugs.service';
@Component({
  selector: 'app-drugs',
  templateUrl: './drugs.component.html',
  styleUrls: ['./drugs.component.scss'],
})
export class DrugsComponent implements OnInit,OnDestroy {

  @ViewChild('drugsGrid', { read: IgxGridComponent })
public grid: IgxGridComponent;
private drugsSub: Subscription;
  constructor(private drugService:DrugsService, private searchService:SearchService) {}
  public drugs :Drug[];

  public transactionDrugs :any[] =[]

  ngOnInit() {

    this.drugsSub = this.searchService.searchedDrugsListener()
    .subscribe((drugs:any)=>{
      this.grid.isLoading = true
      this.drugs = drugs.drugs
      this.grid.isLoading = false
    })


  this.drugService.getAllDrugs()
  .subscribe(
    (response:any)=>{
      this.grid.isLoading = true
      this.drugs = response.data.document
      this.grid.isLoading = false
    }
  )
  }

  cellContent(cellValue:string){

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

  createPendingTransaction(){
    const transaction = {
      customerName: "Benjamin",
      quantity:[
          3,5
      ],
      drugs:[
          "60a3615e1a56ca1accf24c57",
          "603d773cab3dd222f0ebcd33"
      ],
      creator:"5f518bfa17ab81425883fde4"
  }



    this.drugService.createPendingTransaction(transaction)
    .subscribe(res =>console.log(res))

  }





  ngOnDestroy(): void {
    this.drugsSub.unsubscribe()
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    
  }
}
