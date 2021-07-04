import { Component, OnInit, Input } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'OrdenComponent',
  templateUrl: './orden.component.html',
  styleUrls: ['./orden.component.css'],
  providers: [DataService]
})
export class OrdenComponent implements OnInit {

  @Input() orden: any

  status: string = 'default'
  bDisabled: boolean = false

  constructor(private dataServ: DataService) { }

  ngOnInit(): void {

    if(this.orden.status == 'completed'){
      this.status = 'success'
    }

  }

  pOrden(){
    this.dataServ.completeOrder(this.orden.id)
    this.bDisabled = true
    this.status = 'success'
    alert('Orden procesada!')
  }

}
