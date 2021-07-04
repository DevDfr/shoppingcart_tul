import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'TotalComponent',
  templateUrl: './total.component.html',
  styleUrls: ['./total.component.css']
})
export class TotalComponent implements OnInit {

  @Input() total: number = 0

  constructor() { }

  ngOnInit(): void {
  }


}
