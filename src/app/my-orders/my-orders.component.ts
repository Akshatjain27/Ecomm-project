import { Component } from '@angular/core';
import { AddressDetail } from '../data-type';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent {
  orderData:AddressDetail[]|undefined;
 constructor(private product:ProductService){}
 ngOnInIt():void{
  this.product.orderList().subscribe((result)=>{
    this.orderData=result;
  })
 }
}
