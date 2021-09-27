import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppTransactionService } from '../transaction.service';

@Component({
  selector: 'app-transactio-detail',
  templateUrl: './transactio-detail.component.html',
  styleUrls: ['./transactio-detail.component.scss']
})
export class TransactioDetailComponent implements OnInit {

  constructor(private appTransService: AppTransactionService, private route: ActivatedRoute) { }

  singleTrans: any
  ngOnInit() {
    this.appTransService.getOneTransaction(this.route.snapshot.params['id']).subscribe(
      (res: any) => {
        this.singleTrans = res.data.document
      }
    )


  }


}
