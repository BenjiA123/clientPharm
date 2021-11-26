import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SearchService } from './search.service';

@Component({
  selector: 'app-search-comp',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  @Input() searchData: string

  constructor(private searchService: SearchService) { }

  ngOnInit() {
    console.log(this.searchData)

  }

  submitSearch(search: NgForm) {
    this.searchService.searchForDrugs(search.value.search)


  }

}
