import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Globals } from '../../shared/api';
import { Router } from '@angular/router';
import { count } from 'rxjs/operator/count';

declare var $: any;

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
  providers: [CartService]
})
export class ShoppingCartComponent implements OnInit {
  t = localStorage;
  cart: any = [];
  // qty: number;
  // @Input() count: number;
  // @Output() update = new EventEmitter<any>();
  host_address: string = this.globals.HOST_URL;
  constructor(private cartSrv: CartService, private router: Router, private globals: Globals) { }

  ngOnInit() {

    this.getCart();


  }


  remove(data) {
    this.cartSrv.removeFromCart(data);
    this.getCart();

  }

  getCart() {
    this.cart = this.cartSrv.loadCart();
    console.log(this.cart);

    // let count = this.count;
    // this.count = this.cart.qty;

    // this.cart.forEach(item => {
    //   let count = this.count;
    //   this.count = item.qty;
    //   console.log(this.count);
    // })
  }

  clear() {
    this.cartSrv.clearCart();
    this.getCart();
  }

  proceed() {

    // window.location.href = '/checkout';
    this.router.navigate(['/checkout']);
  }

  goHome() {

    //window.location.href = '/';
    this.router.navigate(['/']);

  }

  openCheckout() {

    var handler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_oi0sKPJYLGjdvOXOM8tE8cMa',
      locale: 'auto',
      token: function (token: any) {
        console.log(token);
        // You can access the token ID with `token.id`.
        // Get the token ID to your server-side code for use.
      }
    });

    handler.open({
      name: 'VogueAfriq',
      description: 'VogueAfriq Purchase',
      amount: 2000
    });

    //}
  }

  // increment() {
  //   console.log('incrementing');
  //   console.log(this.count);
  //   this.count++;
  //   this.update.emit({
  //     count: this.count
  //   })
  //   console.log(this.count);
  // }

  // decrement() {
  //   console.log('decrementing');
  //   this.count--;
  //   this.update.emit({
  //     count: this.count
  //   })
  //   console.log(this.count);
  // }



}
