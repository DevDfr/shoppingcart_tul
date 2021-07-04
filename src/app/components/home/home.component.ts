import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'HomeComponent',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [AuthService]
})
export class HomeComponent implements OnInit {

  constructor(private authServ: AuthService, private router: Router) { }

  async ngOnInit(): Promise<void> {
    const usr = await this.authServ.getCurrentUser();

    if(!usr){
      this.router.navigate(['/login'])
    }
  }

  logout(){
    this.authServ.logout()
    this.router.navigate(['/login'])
  }

}
