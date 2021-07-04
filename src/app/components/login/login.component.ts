import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup  } from '@angular/forms';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'LoginComponent',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService]
})
export class LoginComponent implements OnInit {

  constructor(private authServ: AuthService, private router: Router) {}

  loginForm = new FormGroup({
    userName: new FormControl,
    password: new FormControl
  })

  async submitForm(): Promise<void> {
    
    const { userName, password } = this.loginForm.value
    
    const r = await this.authServ.login(userName, password)
    
    if(typeof r.operationType != 'undefined' &&  r.operationType == 'signIn'){

      this.router.navigate(['/home'])

    } else {

      alert(r)
      
    }

  }

  ngOnInit(): void {}

}
