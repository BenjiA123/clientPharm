import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DrugsService } from '../drugs.service';


@Component({
  selector: 'app-drug-detail',
  templateUrl: './drug-detail.component.html',
  styleUrls: ['./drug-detail.component.scss']
})
export class DrugDetailComponent implements OnInit {

  constructor(private drugService: DrugsService, private route: ActivatedRoute) { }
  singleDrug: any
  ngOnInit() {
    this.drugService.getOneDrug(this.route.snapshot.params['id']).subscribe(
      (res: any) => {
        this.singleDrug = res.data.document
      }
    )


  }

}
