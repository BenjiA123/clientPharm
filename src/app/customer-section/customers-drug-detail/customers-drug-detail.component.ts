import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { CustomerSectionService } from '../customer-section.service';
import { StripeScriptTag } from "stripe-angular"

// var stripe = Stripe('pk_test_51JdfkqIRiTKUTBzlyu2ZokBrkgB2cXadm1a5Fz0uRjU5KjJZpn7hgZEgILHUCDZl5hrX30kfNRwjoYBa3DqAp2j800L4Lvuvku');

@Component({
  selector: 'app-customers-drug-detail',
  templateUrl: './customers-drug-detail.component.html',
  styleUrls: ['./customers-drug-detail.component.scss']
})
export class CustomersDrugDetailComponent implements OnInit {

  constructor(private route: ActivatedRoute, private customerService: CustomerSectionService, private stripeScriptTag: StripeScriptTag) { }

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

  createCheckout(drugId: string) {
    this.customerService.createCheckout(drugId).subscribe((res) => {
      console.log(res)
      // create checkout session here
      // this.stripeScriptTag.promiseInstance.
    })

  }

}
