import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'ProductComponent',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  isChecked: any = false

  @Input() product: Product = new Product()
  @Output() checkProd: EventEmitter<Product> = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }

  changeCheck(prod: Product){
    const data = {
      ...prod,
      checked: this.isChecked,
    }
    this.checkProd.emit(data)
 }

}
