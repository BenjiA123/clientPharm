import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { DrugsService } from '../drugs.service';
import * as fromApp from '../../store/app.reducer'
import * as DrugActions from '../store/drug.actions'


@Component({
  selector: 'app-drug-detail',
  templateUrl: './drug-detail.component.html',
  styleUrls: ['./drug-detail.component.scss']
})
export class DrugDetailComponent implements OnInit {


  constructor(private drugService: DrugsService, private route: ActivatedRoute, private store: Store<fromApp.AppState>) { }
  singleDrug: any
  ngOnInit() {


    // this.store.dispatch(new DrugActions.TryGetDrug(this.route.snapshot.params['id']))

    this.drugService.getOneDrug(this.route.snapshot.params['id']).subscribe(
      (res: any) => {
        this.singleDrug = res.data.document
      }
    )


  }

}
