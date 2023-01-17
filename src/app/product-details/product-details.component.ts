import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cart, Product } from '../data-type';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent {

  constructor(
    private activeRoute: ActivatedRoute,
    private product: ProductService
  ) {}
  productDetail: undefined | Product;
  productQuantity: number = 1;
  removeCart=false;  
  cartData:Product|undefined;
  ngOnInit(): void {
    let productId = this.activeRoute.snapshot.paramMap.get('productId');
    productId &&
      this.product.getProduct(productId).subscribe((result) => {
        this.productDetail = result;
        let cartData=localStorage.getItem('localCart');
        if(productId&&cartData)
        {
          let items =JSON.parse(cartData);
          items = items.filter((item:Product)=>productId==item.id.toString())
          if(items.length){
            this.removeCart=true;
          }
          else{
            this.removeCart=false;
          }
        }
        let user = localStorage.getItem('user');
        if(user){
          let userId=user && JSON.parse(user).id;
          this.product.getCartList(userId);
          this.product.cartData.subscribe((result)=>{
           let item = result.filter((item:Product)=>productId?.toString()===item.productId?.toString())
           if(item.length){
            this.cartData = item[0];
            this.removeCart=true;
           }
          })
        }
      });
  }
  handleQuantity(val: string) {
    if (this.productQuantity < 20 && val === 'plus') {
      this.productQuantity += 1;
    } else if (this.productQuantity > 1 && val === 'min') {
      this.productQuantity -= 1;
    }
  }
  AddToCart() {
    if(this.productDetail){
      this.productDetail.quantity=this.productQuantity;
      if(!localStorage.getItem('user')){
        this.product.localAddToCart(this.productDetail);
        this.removeCart=true;
      }
      else{
       // console.warn("user is logged in");
        let user = localStorage.getItem('user');
        let userId=user && JSON.parse(user).id;
        
        let cartData:Cart={
          ...this.productDetail,
          userId,
          productId:this.productDetail.id,
        }
        delete cartData.id;
        this.product.addToCart(cartData).subscribe((result)=>{
          if(result){
            // alert("data added to cart");
            this.product.getCartList(userId);
            this.removeCart=true;
          }
        })
      }
    }
  }
  RemoveFromCart(id:number){
    if(!localStorage.getItem('user')){
    this.product.removeItemFromCart(id);
    this.removeCart=false;
    }
    else {
      let user = localStorage.getItem('user');
      let userId=user && JSON.parse(user).id;
      console.warn('remove', this.cartData)
      this.cartData && this.product.removeToCart(this.cartData.id)
        .subscribe((result)=> {
          if(result) {
            this.product.getCartList(userId);
            this.removeCart=false;
          }
        })
    }
  }
}
