import { Component, OnInit, } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ShopComponent',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
  providers: [AuthService, DataService]
})
export class ShopComponent implements OnInit {

  ordenes: any[] = []

  constructor(private authServ: AuthService,private dataServ: DataService, private router: Router) {

  }

  async ngOnInit(): Promise<void> {
    const usr = await this.authServ.getCurrentUser();

    if(!usr){
      this.router.navigate(['/login'])
    }

    this.ordenes = await this.dataServ.getOrders()

  }

}
