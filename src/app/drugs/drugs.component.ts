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




  ngOnDestroy(): void {
    this.drugsSub.unsubscribe()
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    
  }
}
