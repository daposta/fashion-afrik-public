import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import { PaymentService } from '../../services/payment.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
  providers: [PaymentService,]
})
export class PaymentComponent implements OnInit {

  cost: Number;
  paid: Boolean = false;
  @Output() notifyPayment: EventEmitter<Boolean> = new EventEmitter<Boolean>();

  cardnumber;
  cardyear;
  cardmonth;
  cardcvv;

  amount: any;
  order_id: any;
  txn_id: any;
  currency: any;

  constructor(private paymentSrv: PaymentService, private fb: FormBuilder, private _zone: NgZone) { }


  ngOnInit() {


    let order = JSON.parse(localStorage.getItem('order'));
    this.amount = order.amount;
    this.order_id = order.order_id;
    this.currency = order.currency;
  }

  pay() {

    (<any>window).Stripe.card.createToken({
      number: this.cardnumber,
      exp_month: this.cardmonth,
      exp_year: this.cardyear,
      cvc: this.cardcvv
    }, (status: number, response: any) => {

      // Wrapping inside the Angular zone
      this._zone.run(() => {
        if (status === 200) {
          // console.log(response)

          let notifyPayment = this.notifyPayment;
          let data = {};

          data['amount'] = this.amount;
          data['order_id'] = this.order_id;
          data['currency'] = this.currency
          data['tx_id'] = response.id;

          this.paymentSrv.makePayment(data).subscribe(res => {

            // console.log(res);
            localStorage.removeItem('order');
            localStorage.removeItem('cart');
            this.paid = true;
            notifyPayment.emit(this.paid);
          }, err => {

            console.log(err);
          })
        } else {
          // this.message = response.error.message;
          console.log(response.error.message);
        }
      });
    });
  }


  // order = JSON.parse(localStorage.getItem('checkout'))['order'];
  // openCheckout() {

  //   let pymnt = this.paymentSrv
  //   let notifyPayment = this.notifyPayment;
  //   var handler = (<any>window).StripeCheckout.configure({
  //     key: 'pk_test_rc3kF517lh5pGOR8wRdRiekO',
  //     locale: 'auto',
  //     token: function (token: any) {
  //       // You can access the token ID with `token.id`.
  //       // Get the token ID to your server-side code for use.

  //       let order = JSON.parse(localStorage.getItem('checkout'))['order'];
  //       let data = {};
  //       data['stripeToken'] = token.id;
  //       data['amount'] = order.cost; //20.00;
  //       data['order'] = order.id;
  //       pymnt.processPayment(data).subscribe(payment => {

  //         let data = JSON.parse(localStorage.getItem('checkout'));
  //         data['paid'] = true
  //         localStorage.setItem('checkout', JSON.stringify(data));
  //         this.paid = true;
  //         notifyPayment.emit(this.paid);

  //       }, error => {

  //       });
  //     }
  //   });

  //   handler.open({
  //     name: 'VogueAfriq',
  //     description: 'Purchase From VogueAfriq',
  //     currency: 'GBP',
  //     // amount: this.order.cost,
  //     image: 'http://vogueafriq.com/favicon.ico',
  //     //label: 'Pay with Card'
  //   });

  // }

}
