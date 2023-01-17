import { Component } from '@angular/core';
import { Product } from '../data-type';
import { ProductService } from '../service/product.service';
import { SellerService } from '../service/seller.service';
import {faTrash,faEdit} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent {
  productList:undefined | Product[];
  deleteMessage:undefined | string;
  deleteIcon=faTrash;
  editIcon=faEdit;
  constructor(private product:ProductService){}

  ngOnInit():void{
     this.List();
  }
  
  deleteProduct(id:number){
    console.warn("test id",id);
    this.product.deleteProduct(id).subscribe((result)=>{
      console.warn(result);
      if(result)
      {
        this.deleteMessage="Product is Deleted";
        console.warn(this.deleteMessage);
        this.List();
      }
    })

    setTimeout(()=>{
       this.deleteMessage=undefined
    },3000);
  }

  List():void{
    this.product.productList().subscribe((result)=>{
      console.warn(result);
      this.productList=result;
   })
  }
}
