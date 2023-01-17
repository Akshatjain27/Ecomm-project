import { Component, OnInit } from '@angular/core';
import { SellerService } from '../service/seller.service';
import {Router} from '@angular/router';
import { Login, SignUp } from '../data-type';
@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent implements OnInit {
  constructor(private seller:SellerService,private router:Router){}
  showLogin=false;
  authError:string = '';

  ngOnInit():void{
    this.seller.reloadSeller();
  }

  signUp(data:SignUp):void{
    console.warn(data);
    this.seller.userSignUp(data);
  }

  login(data:Login):void{
    this.authError = '';
    console.warn(data);
    this.seller.userLogin(data);
    this.seller.isLoginError.subscribe((isError)=>{
      if(isError) {
        this.authError = "Email or password incorrect";
      }
    })
  }

  toggleLogin(){
    this.showLogin=!this.showLogin;
  }

}
