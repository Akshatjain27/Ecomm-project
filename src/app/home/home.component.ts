import { Component } from '@angular/core';
import '@angular/localize/init';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { Product } from '../data-type';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
	popularProducts:undefined | Product[]
  trendyProducts:undefined | Product[]
  constructor(private product:ProductService){}

  ngOnInit():void{
	this.product.popularProducts().subscribe((data)=>{
		console.warn(data);
		this.popularProducts=data;
	})

  this.product.trendyProducts().subscribe((data)=>{
   console.warn(data);
   this.trendyProducts=data;
  })
  }
}
