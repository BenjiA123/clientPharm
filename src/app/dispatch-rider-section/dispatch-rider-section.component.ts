import { Component, OnInit } from '@angular/core';
import { DispatchRiderSectionService } from './dispatch-rider-section.service';

@Component({
  selector: 'app-dispatch-rider-section',
  templateUrl: './dispatch-rider-section.component.html',
  styleUrls: ['./dispatch-rider-section.component.scss']
})
export class DispatchRiderSectionComponent implements OnInit {

  constructor(private drService: DispatchRiderSectionService) { }

  ngOnInit(): void {
    this.drService.getAllOrders().subscribe(res => console.log(res))
  }
}
