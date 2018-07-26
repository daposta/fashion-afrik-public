import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import { PaymentService } from '../../services/payment.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
  providers: [PaymentService, CartService]
})
export class PaymentComponent implements OnInit {

  cart: any[] = [];
  cost: Number;
  paid: Boolean = false;
  @Output() notifyPayment: EventEmitter<Boolean> = new EventEmitter<Boolean>();

  cardnumber;
  cardyear;
  cardmonth;
  cardcvv;

  errMessage: any;
  masks: any;

  order: any = {};
  amount: any;
  order_id: any;
  txn_id: any;
  currency: any;
  sub_total: any;
  shipping_cost: any;

  constructor(private paymentSrv: PaymentService, private fb: FormBuilder, private _zone: NgZone, private cartSrv: CartService) {

    this.masks = {
      cardNumber: [/\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
      cardMonth: [/\d/, /\d/],
      cardYear: [/\d/, /\d/],
      cardCVV: [/\d/, /\d/, /\d/]
    };
  }


  ngOnInit() {

    this.loadCart();

    this.order = JSON.parse(localStorage.getItem('order'));
    this.amount = Math.round(this.order.amount.toFixed(2) * 100 / 100);
    this.sub_total = Math.round(this.order.sub_total.toFixed(2) * 100 / 100);
    this.order_id = this.order.order_id;
    this.currency = this.order.currency;
    this.shipping_cost = this.order.shipping_cost;

    console.log(this.order);
  }

  numbersOnly(event: any) {
    const pattern = /[0-9\+\-\ ]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  loadCart() {

    this.cart = this.cartSrv.loadCart()
    console.log(this.cart);
  }

  pay() {

    (<any>window).Stripe.card.createToken({
      number: this.cardnumber.replace(/\D+/g, ''),
      exp_month: this.cardmonth.replace(/\D+/g, ''),
      exp_year: this.cardyear.replace(/\D+/g, ''),
      cvc: this.cardcvv.replace(/\D+/g, '')
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
          this.errMessage = response.error.message;
          console.log(response.error.message);
        }
      });
    });
  }

}
