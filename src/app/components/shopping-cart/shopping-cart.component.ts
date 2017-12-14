import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Globals } from '../../shared/api';
@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
   providers: [  CartService]
})
export class ShoppingCartComponent implements OnInit {
 
  cart: any[];
   host_address: string =  this.globals.HOST_URL;
  constructor(private cartSrv: CartService,private globals: Globals) { }

  ngOnInit() {
  		this.getCart();
  }


  removeFromCart(){
  	
  }

  getCart(){
    this.cart = this.cartSrv.loadCart()//.then(response => this.cart = response)
    
  }

  clear(){
    console.log('poooo');
    this.cartSrv.clearCart();
    this.getCart();
  }



}
