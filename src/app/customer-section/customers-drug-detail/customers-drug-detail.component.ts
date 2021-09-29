import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { CustomerSectionService } from '../customer-section.service';

@Component({
  selector: 'app-customers-drug-detail',
  templateUrl: './customers-drug-detail.component.html',
  styleUrls: ['./customers-drug-detail.component.scss']
})
export class CustomersDrugDetailComponent implements OnInit {

  constructor(private route: ActivatedRoute, private customerService: CustomerSectionService) { }

  drugId: string
  ngOnInit(): void {


    this.route.params
      .subscribe(
        (params: Params) => {
          this.drugId = params['id']
          this.customerService.getOneDrug(this.drugId)

        }
      )


  }

}
