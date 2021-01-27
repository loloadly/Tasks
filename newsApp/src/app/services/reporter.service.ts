import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Reporter } from '../interfaces/reporter';

@Injectable({
  providedIn: 'root'
})
export class ReporterService {

  url = "http://localhost:3000/"
  
  constructor(private http:HttpClient) { }

  getProfile(){
    return this.http.get<Reporter>(this.url + 'users/profile')
  }

}
