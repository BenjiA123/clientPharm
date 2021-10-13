import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { environment } from 'src/environments/environment';
import { CustomerSectionService } from '../customer-section.service';



declare var Stripe: any;


@Component({
  selector: 'app-customers-drug-detail',
  templateUrl: './customers-drug-detail.component.html',
  styleUrls: ['./customers-drug-detail.component.scss']
})
export class CustomersDrugDetailComponent implements OnInit {
  stripe = Stripe(environment.stripe_publish_key);

  constructor(private route: ActivatedRoute, private customerService: CustomerSectionService) { }

  drugId: string
  drug: string
  ngOnInit(): void {


    this.route.params
      .subscribe(
        (params: Params) => {
          this.drugId = params['id']
          this.customerService.getOneDrug(this.drugId)
            .subscribe((res: any) => {
              this.drug = res.data.document
              console.log(this.drug)
            })

        }
      )


  }

  createCheckout() {
    this.customerService.createCheckout(this.drugId).subscribe((res: any) => {
      this.stripe.redirectToCheckout({ sessionId: res.stripeSession.id })
    })

  }

}
