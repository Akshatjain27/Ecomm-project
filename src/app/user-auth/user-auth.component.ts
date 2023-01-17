import { Component } from '@angular/core';
import { Cart, Login, Product, SignUp } from '../data-type';
import { ProductService } from '../service/product.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent {
  showLogin:boolean=true;
  invalidLogin:string="";
  constructor(private userService:UserService,private product:ProductService){}
  ngOnInIt():void{
    this.userService.userAuthReload();
  }
signUp(data: SignUp) {
  this.userService.userSignUp(data);
}
login(data:Login){
  this.userService.userLogin(data);
  this.userService.invalidUser.subscribe((result)=>{
    if(result){
      this.invalidLogin="Email Id or Password is Wrong (Invalid Credentials)";
    }
    else{
      this.localCartToRemoteCart();
    }
  })
}
openSignUp(){
this.showLogin=false;
}
openLogin(){
this.showLogin=true;
}
localCartToRemoteCart()
{
  let data = localStorage.getItem('localCart');
  let user = localStorage.getItem('user');
  let userId=user && JSON.parse(user).id;
  if(data){
    let cartDataList:Product[]=JSON.parse(data);
   
    cartDataList.forEach((product:Product,index)=>{
      let cartData:Cart={
        ...product,
        productId:product.id,
        userId
      };
      delete cartData.id;
      setTimeout(()=>{
        this.product.addToCart(cartData).subscribe((result)=>{
          if(result){
           // console.warn("Item stored in db");
          }
        })
      },500);
      if(cartDataList.length===index+1){
        localStorage.removeItem('localCart');
      }
      })

  }
  setTimeout(()=>{
    this.product.getCartList(userId);
  },2000);
}
}
