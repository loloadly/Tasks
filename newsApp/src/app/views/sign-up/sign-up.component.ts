import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  log(x: any) {
    console.log(x);
  }

  constructor(
    private authService:AuthService,
    private router:Router
  ) { }

  reporter: any;
  token: any;
  invalidEmail:boolean= false;


  signUp(credentials: any) {
    this.authService.signUp(credentials).subscribe((res) => {
      this.reporter = res;
      this.token = this.reporter.token;
      localStorage.setItem('token', this.token)
      this.router.navigate(['/profile'])
    },(httpError)=>{
      console.log(httpError)
     if(httpError.error.name == 'MongoError'){
       this.invalidEmail = true
     }
    });
  }

  ngOnInit(): void {
  }

}
