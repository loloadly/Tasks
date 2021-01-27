import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }



  log(x: any) {
    console.log(x);
  }

  invalidLogin: boolean = false;
  users: any;
  token: any;


  login(credentials: any) {
    this.authService.login(credentials).subscribe(
      (res) => {
        console.log(res);
        this.users = res;
        this.token = this.users.token;
        localStorage.setItem('token', this.token);
        this.router.navigate(['/profile']);
      },
      (httpError) => {
        this.invalidLogin = true;
      });
  }


  ngOnInit(): void {
  }

}
