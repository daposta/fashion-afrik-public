import { Injectable } from '@angular/core';

@Injectable()
export class CartService {

  public cart =[];
  constructor() { }


  addToCart(data:any){
  	if(localStorage.getItem('cart')){
  		let cart:any = JSON.parse(localStorage.getItem('cart'));
      let index:number = -1;
      for(var i =0; i < cart.length; i++){
        let item: string = JSON.parse(cart[i]);
        if(item['product'] == data.id){
            index = i;
            break;
        }
      }
      
      if(index = -1){

        }else{

       }


  	}
  	else{

  		// let cart = any[];
  		// cart.push(data);
  		// localStorage.setItem('cart', JSON.stringify(cart));
  	}

  };

  removeFromCart(){

  }


  clearCart(){

  }

}
