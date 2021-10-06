import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { CustomerSectionService } from '../customer-section.service';


declare var Stripe: any;


@Component({
  selector: 'app-customers-drug-detail',
  templateUrl: './customers-drug-detail.component.html',
  styleUrls: ['./customers-drug-detail.component.scss']
})
export class CustomersDrugDetailComponent implements OnInit {
  stripe = Stripe('pk_test_51JdfkqIRiTKUTBzlyu2ZokBrkgB2cXadm1a5Fz0uRjU5KjJZpn7hgZEgILHUCDZl5hrX30kfNRwjoYBa3DqAp2j800L4Lvuvku');

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

  createCheckout() {
    this.customerService.createCheckout(this.drugId).subscribe((res: any) => {
      this.stripe.redirectToCheckout({ sessionId: res.stripeSession.id })
    })

  }

}
