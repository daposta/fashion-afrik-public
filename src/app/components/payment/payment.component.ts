import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  openCheckout() {
  	console.log('=====');
    var handler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_rc3kF517lh5pGOR8wRdRiekO',
      locale: 'auto',
      token: function (token: any) {
        // You can access the token ID with `token.id`.
        // Get the token ID to your server-side code for use.
        console.log(token);
      }
    });

    handler.open({
      name: 'VogueAfriq',
      description: 'Payment For Items in Cart',
      currency: 'GBP',
      amount: 2000,
      image: 'http://vogueafriq.com/favicon.ico',
      //label: 'Pay with Card'
    });

  }

}
