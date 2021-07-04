import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'CarloadComponent',
  templateUrl: './carload.component.html',
  styleUrls: ['./carload.component.css'],
  providers: [AuthService, DataService]
})
export class CarloadComponent implements OnInit {

  products: Product[] = []
  orden: Product[] = []
  total: number = 0;

  constructor(private authServ: AuthService, private dataServ: DataService, private router: Router) {}

  async ngOnInit(): Promise<void> {
    const usr = await this.authServ.getCurrentUser();

    if(!usr){
      this.router.navigate(['/login'])
    }

    this.products = await this.dataServ.getProducts()

  }

  checkProd(proddata: any){
    if(proddata.checked) {
      this.total = this.total + proddata.quantity
      this.orden.push(proddata)
    } else {
      this.total = this.total - proddata.quantity
      this.orden = this.orden.filter(x => x.id != proddata.id)
    }
 }

 async pOrden(){
   const r = await this.dataServ.orderSave(this.orden)
   alert('Orden guardada con exito!')
 }

}
