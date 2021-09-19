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
