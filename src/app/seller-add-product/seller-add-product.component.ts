import { Component, OnInit } from '@angular/core';
import { Product } from '../data-type';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css']
})
export class SellerAddProductComponent implements OnInit {
  addproductMessage:string | undefined;
  constructor(private product:ProductService){}
  ngOnInit():void{
  }
  submit(data:Product){
    this.product.addProduct(data).subscribe((result)=>{
      console.warn(result);
      if(result){
        this.addproductMessage='Product is successfully added';
      }
      setTimeout(()=>(this.addproductMessage=undefined),3000);
    });
    console.warn(data);
  }
}
