import { Component, ViewChild, OnInit } from '@angular/core';
import { IgxGridComponent } from 'igniteui-angular';
import { SourcesService } from './sources.service';

@Component({
  selector: 'app-sources',
  templateUrl: './sources.component.html',
  styleUrls: ['./sources.component.scss']
})
export class SourcesComponent implements OnInit {

  public sources: any[]
  constructor(private sourceService: SourcesService) { }
  @ViewChild('sourcesGrid', { read: IgxGridComponent }) public grid: IgxGridComponent;

  public idxColumnData: any[] = [
    { dataType: "string", width: '15%', hasSummary: false, field: "name", sortable: false, header: "Vendor Name ", filterable: true },

    { dataType: "string", width: '20%', hasSummary: false, field: "address", sortable: false, header: "Address ", filterable: false },

    { dataType: "date", width: '15%', hasSummary: false, field: "purchaseDate", sortable: true, header: "Date ", filterable: false },
  ]


  ngOnInit(): void {
    this.sourceService.getAllSources()
      .subscribe(
        (res: any) => {
          const sources = res.data.document
          this.sources = sources
        }
      )
  }

}
