import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../data-type';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.css']
})
export class SellerUpdateProductComponent {
  updateproductMessage:undefined | string;
  productData:undefined | Product;

  constructor(private route:ActivatedRoute,private product:ProductService,private router:Router){}
  
  ngOnInit():void{
    let productId=this.route.snapshot.paramMap.get('id');
    console.warn(productId);
    productId && this.product.getProduct(productId).subscribe((data)=>{
      console.warn(data);
      this.productData=data;
    })
  }
  submit(data:Product){
    console.warn(data);
    if(this.productData){
      data.id=this.productData.id;
    }
    this.product.updateProduct(data).subscribe((result)=>{
      if(result){
        this.updateproductMessage="Product detail updated";
        this.router.navigate(['/seller-home']);
      }
    });
    setTimeout(()=>{
      this.updateproductMessage=undefined
    },3000);
    
  }

}
