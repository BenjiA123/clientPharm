import { Component, OnInit, ViewChild } from '@angular/core';
import { IgxGridComponent } from 'igniteui-angular';
import { Drug } from './drugs.interface';
import { DrugsService } from './drugs.service';
@Component({
  selector: 'app-drugs',
  templateUrl: './drugs.component.html',
  styleUrls: ['./drugs.component.scss'],
})
export class DrugsComponent implements OnInit {

  @ViewChild('drugsGrid', { read: IgxGridComponent })
public grid: IgxGridComponent;

  constructor(private drugService:DrugsService) {}
  public drugs :Drug[];
  ngOnInit() {
  this.drugService.getAllDrugs()
  .subscribe(
    (response:any)=>{
      this.drugs = response.data.document
    }
  )
  }
}
