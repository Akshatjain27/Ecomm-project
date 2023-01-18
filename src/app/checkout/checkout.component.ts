import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AddressDetail, Cart, PriceSummary } from '../data-type';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent {
  email: string | undefined;
  priceSummary: PriceSummary = {
    price: 0,
    discount: 0,
    tax: 0,
    delivery: 0,
    total: 0,
  };

  cartData: Cart[] | undefined;
  orderMsg: string | undefined;

  constructor(private product: ProductService, private router: Router) {}
  ngOnInit(): void {
    this.product.currentCart().subscribe((result) => {
      let price = 0;

      this.cartData = result;

      result.forEach((item) => {
        if (item.quantity) {
          price += +item.price * item.quantity;
        }
      });
      this.priceSummary.price = price;
      this.priceSummary.discount = price / 10;
      this.priceSummary.tax = price * 0.18;
      this.priceSummary.delivery = 100;
      this.priceSummary.total =
        this.priceSummary.price -
        this.priceSummary.discount +
        this.priceSummary.tax +
        this.priceSummary.delivery;
    });
  }
  orderNow(data: AddressDetail) {
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;
    this.email = user && JSON.parse(user).email;
    if (this.priceSummary.total) {
      let orderData: AddressDetail = {
        ...data,
        totalPrice: this.priceSummary.total,
        userId,
        id: undefined,
      };

      this.cartData?.forEach((item) => {
        setTimeout(() => {
          item.id && this.product.deleteCartItems(item.id);
        }, 600);
      });
      this.product.orderNow(orderData).subscribe((result) => {
        if (result) {
          // alert('Order Placed')
          this.orderMsg = 'Your order has been placed';
          setTimeout(() => {
            this.router.navigate(['/my-orders']);
            this.orderMsg = undefined;
          }, 4000);
        }
      });
    }
  }
}
