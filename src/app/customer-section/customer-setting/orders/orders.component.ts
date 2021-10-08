import { Component, OnInit } from '@angular/core';
import { CustomerSectionService } from '../../customer-section.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  myOrders: any;

  constructor(private customerSectionService: CustomerSectionService) { }

  ngOnInit(): void {

    this.customerSectionService.getUsersOrderedDrugs()
      .subscribe(
        (drugs: any) => {
          this.myOrders = drugs.drugs
        }
      )

  }

}
