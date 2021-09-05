import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SearchService } from './search.service';

@Component({
  selector: 'app-search-comp',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {

  constructor(private searchService:SearchService) { }

  submitSearch(search:NgForm){
  this.searchService.searchDrugs(search.value.search)


  }

}
