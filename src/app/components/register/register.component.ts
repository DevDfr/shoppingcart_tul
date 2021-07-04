import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup  } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'RegisterComponent',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [AuthService]
})
export class RegisterComponent implements OnInit {

  constructor(private authServ: AuthService, private router: Router) {}

  registerForm = new FormGroup({
    userName: new FormControl,
    password: new FormControl
  })

  async submitForm(): Promise<void> {
    
    const { userName, password } = this.registerForm.value
    
    const r = await this.authServ.signIn(userName, password)
    
    if(typeof r.operationType != 'undefined' &&  r.operationType == 'signIn'){

      alert('Registro exitoso!!')
      this.router.navigate(['/login'])

    } else {

      alert(r)
      
    }
    
  }

  ngOnInit(): void {
  }

}
