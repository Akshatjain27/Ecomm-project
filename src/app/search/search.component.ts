import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../data-type';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
constructor(private activeRoute:ActivatedRoute,private product:ProductService){}
searchResult:undefined|Product[];
ngOnInit():void{
  let query = this.activeRoute.snapshot.paramMap.get('query')
  query&& this.product.searchProducts(query).subscribe((result)=>{
    this.searchResult=result;
  })
}
}
