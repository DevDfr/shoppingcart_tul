import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'MenuComponent',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  @Input() loc: string = ''

  constructor() { }

  ngOnInit(): void {
  }

}
