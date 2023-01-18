import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cart, PriceSummary, Product } from '../data-type';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {

  cartData:Cart[]|undefined;
  priceSummary:PriceSummary = {
    price:0,
    discount:0,
    tax:0,
    delivery:0,
    total:0
  }

  constructor(private product:ProductService,private router:Router) {}

  ngOnInit():void {
    this.loadDetails();
  }

  loadDetails(){
    this.product.currentCart().subscribe((result) => {
      this.cartData=result;
      let price = 0;
      result.forEach((item) => {
        if(item.quantity) {
        price+= +item.price*item.quantity;
        }
      })

      this.priceSummary.price = price;
      this.priceSummary.discount = price/10;
      this.priceSummary.tax = price*0.18;
      this.priceSummary.delivery = 100;
      this.priceSummary.total = this.priceSummary.price-this.priceSummary.discount+this.priceSummary.tax+this.priceSummary.delivery;
      if(!this.cartData.length){
        this.router.navigate(['/']);
      }
    })
  }
  removeFromCart(cartId:number|undefined){
    cartId && this.product.removeToCart(cartId)
        .subscribe((result)=> {
          let user = localStorage.getItem('user');
          let userId=user && JSON.parse(user).id;
            this.product.getCartList(userId);     
            this.loadDetails();     
        })
  }

  checkout(){
    this.router.navigate(['/checkout']);
  }
}

