import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  baseUrl='http://localhost:3000/'

  signUp(credentials:any){
    return this.http.post(this.baseUrl + 'users',credentials)
  }

  login(credentials:any){
    return this.http.post(this.baseUrl + 'users/login',credentials)
  }

  getToken(){
    return localStorage.getItem('token')
  }
}
