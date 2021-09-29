import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Drug } from 'src/app/drugs/drugs.interface';
import { SearchService } from 'src/app/search/search.service';
import { CustomerSectionService } from '../customer-section.service';

@Component({
  selector: 'app-drug-overview',
  templateUrl: './drug-overview.component.html',
  styleUrls: ['./drug-overview.component.scss']
})
export class DrugOverviewComponent implements OnInit, OnDestroy {

  constructor(private searchService: SearchService, private customerSectionService: CustomerSectionService) { }
  private drugsSub: Subscription;
  public drugs: Drug[];


  ngOnInit(): void {


    this.customerSectionService.getAllDrugs()
      .subscribe(
        (response: any) => {
          this.drugs = response.data.document
          console.log(this.drugs)

        }
      )

    this.drugsSub = this.searchService.searchedDrugsListener()
      .subscribe((drugs: any) => {
        this.drugs = drugs.drugs
      })
  }


  ngOnDestroy(): void {
    this.drugsSub.unsubscribe();

  }

}
