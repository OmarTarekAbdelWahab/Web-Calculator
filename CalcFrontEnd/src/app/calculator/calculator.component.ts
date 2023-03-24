import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { ApiService } from './api.service';
import { Expression } from './Expression';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {
  
  
  expression = new Expression();
  value: string = '';
  isX: boolean = true;
  clr:boolean = true
  isStart:boolean = true
  fin: boolean = false;
  eq: boolean = false;
  error:boolean = false;
  evaluateExp(){
    if((this.expression.exp == "/" && this.expression.y ==0) || ( this.expression.exp == "1/x" && this.expression.x ==0) || (this.expression.exp == "√x" && this.expression.x < 0)){
        this.value = "E";
        this.error = true;
        return;
    }
    this.ngOnInit();
    this.eq = true;
    this.isX = true;
    this.clr = true
    this.fin = false
  }
  async addOperator(chr: string){
    this.dot = false
    if(this.error){
      return;
    }
    if(this.fin || this.eq){
      this.eq = false
      this.evaluateExp();
      await new Promise(f => setTimeout(f, 200));
      this.expression.x = parseFloat(this.value);
      this.fin = true
    }
    this.expression.exp = chr;
    this.isX = false
    this.clr = true
  }
  addNumber(chr:string){
    this.dot = false
    if(this.error){
      this.reset();
      this.error = false;
    }
    if(this.eq){
      this.eq = false;
    }
    if(this.clr){
      this.value = ""
      this.clr = false;
    }
    this.value +=chr;
    if(this.isX){
      this.expression.x = parseFloat(this.value);
    }else{
      this.expression.y = parseFloat(this.value);
      this.fin = true;
    }
  }
  dot:boolean = false
  add(chr: string){
    if(this.clr){
      this.value = ""
      this.clr = false;
    }
    if(!this.dot){
      this.value += chr;
      this.dot = true
    }
  }
  delete(){
    this.eq = false;
    this.value = String(this.value)
    this.value = this.value.slice(0, -1);
    if(this.isX){
      this.expression.x = parseFloat(this.value);
    }else{
      this.expression.y = parseFloat(this.value);

    }
  }
  reset(){
    this.eq = false;
    this.value  = '';
    this.isX  = true;
    this.clr = true
    this.isStart = true
    this.expression.x = 0;
    this.expression.y = 0;
    this.expression.exp = " ";
    this.fin = false
  }

  sign(){
    this.value = String(this.value)
    
    if(this.value[0] != "-"){
      this.value = "-" + this.value;
    }else{
      this.value = this.value.substring(1);
    }
    if(this.eq){
      this.expression.x = parseFloat(this.value);
      this.eq = false;
      this.clr = false
      this.fin = false
      return
      
    }
    if(this.isX){
      this.expression.x = parseFloat(this.value);
    }else{
      this.expression.y = parseFloat(this.value);
    }
  }

constructor(private apiService:ApiService) {}

ngOnInit() {
  this.postExp();
}

refreshPeople() {
  this.apiService.getValue()
    .subscribe(data => {
      console.log(data)
      this.value=data;
    })      

}
postExp() {
  this.apiService.setExpression(this.expression)
    .subscribe(data => {
      console.log(data)
      this.refreshPeople();
    })      
}

}
