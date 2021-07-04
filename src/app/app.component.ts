import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AuthService]
})
export class AppComponent {
  title = 'tul';

  constructor(private authServ: AuthService, private router: Router) {}

  logout(){
    this.authServ.logout()
    this.router.navigate(['/login'])
  }

}
