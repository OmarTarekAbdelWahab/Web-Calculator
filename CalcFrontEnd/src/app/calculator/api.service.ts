import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Expression } from './Expression';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
 
@Injectable({providedIn:'root'})
export class ApiService {
 
  private baseURL: string = "http://localhost:8080/";
 
  constructor(private http: HttpClient) {
  }
 
  getValue(): Observable<string> {
    console.log('getValue '+this.baseURL + 'exp')
    return this.http.get<string>(this.baseURL + 'exp')
  }
 
  setExpression(expression:Expression): Observable<any> {
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(expression);
    console.log(body)
    return this.http.post(this.baseURL + 'set', body,{'headers':headers})
  }
 
}
 