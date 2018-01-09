import { Component, OnInit,  Output, EventEmitter} from '@angular/core';
import { PaymentService } from '../../services/payment.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
   providers: [ PaymentService,]
})
export class PaymentComponent implements OnInit {
  
  cost:Number;
  paid: Boolean=false;
  @Output() notifyPayment: EventEmitter<Boolean> = new EventEmitter<Boolean>();
  constructor(private paymentSrv :PaymentService,) { }

  ngOnInit() {
  }
  order = JSON.parse(localStorage.getItem('checkout'))['order'];
  openCheckout() {
  
    let pymnt = this.paymentSrv
    let notifyPayment = this.notifyPayment;
    var handler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_rc3kF517lh5pGOR8wRdRiekO',
      locale: 'auto',
      token: function (token: any) {
        // You can access the token ID with `token.id`.
        // Get the token ID to your server-side code for use.
      
        let order = JSON.parse(localStorage.getItem('checkout'))['order'];
        let  data = {};
        data['stripeToken'] = token.id;
        data['amount'] = order.cost; //20.00;
        data['order'] = order.id;
        pymnt.processPayment(data).subscribe(payment=>{
            
              let data = JSON.parse(localStorage.getItem('checkout'));
              data['paid'] = true
              localStorage.setItem('checkout',JSON.stringify(data));
             this.paid = true;
             notifyPayment.emit(this.paid);
          


        },  error=>{

        });
      }
    });

    handler.open({
      name: 'VogueAfriq',
      description: 'Purchase From VogueAfriq',
      currency: 'GBP',
      amount: this.order.cost,
      image: 'http://vogueafriq.com/favicon.ico',
      //label: 'Pay with Card'
    });

  }

}
