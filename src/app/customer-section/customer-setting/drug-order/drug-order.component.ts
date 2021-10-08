import { Component, OnInit } from '@angular/core';
import { CustomerSectionService } from '../../customer-section.service';

@Component({
  selector: 'app-drug-order',
  templateUrl: './drug-order.component.html',
  styleUrls: ['./drug-order.component.scss']
})
export class DrugOrderComponent implements OnInit {
  myDrugs: any;

  constructor(private customerSectionService: CustomerSectionService) { }

  ngOnInit(): void {
    this.customerSectionService.getUsersOrderedDrugs()
      .subscribe(
        (drugs: any) => {
          this.myDrugs = drugs.drugs
        }
      )
  }

}
