import { Component, OnInit } from '@angular/core';
// import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() {
    // thiuser = this.formBuilder.group({
    //   username: new FormControl('', Validators.required),
    //   email: new FormControl('', Validators.compose([
    //     Validators.required,
    //     Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
    //   ]))
    // });
   }

  ngOnInit(): void {  }

  

  changeLogin() {
    const loginForm =  document.getElementById('loginForm');
    const registerForm =  document.getElementById('registerForm');

    if(loginForm !== null && registerForm !== null) {
      registerForm.classList.toggle('active')
      loginForm.classList.toggle('active')
    } 
  }

  changeRegister() {
    const loginForm =  document.getElementById('loginForm');
    const registerForm =  document.getElementById('registerForm');
    if(registerForm !== null && loginForm !== null) {
      registerForm.classList.toggle('active')
      loginForm.classList.toggle('active')
    }
  }
}
