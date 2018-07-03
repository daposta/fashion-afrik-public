import { Injectable } from '@angular/core';

@Injectable()
export class CartService {

  //public cart =[];
  constructor() { }

  loadCart() {
    let items = [];
    let cart = JSON.parse(localStorage.getItem('cart'));
    if (cart) {
      for (var i = 0; i < cart.length; i++) {
        let t = cart[i];
        // items.push({
        //   product_name: t.product_name, banner_image: t.product_image, qty: t.qty, cost: t.cost, price: t.price, color: t.color, size: t.size
        // });
        items.push(t);

      }

      return items;
    }

  }


  addToCart(data: any) {
    console.log(data);
    let productId = data.product_id;
    if (localStorage.getItem('cart')) {
      let cart: any = JSON.parse(localStorage.getItem('cart'));
      let index: number = -1;
      // for (var i = 0; i < cart.length; i++) {

      //   let item = cart[i];

      //   if (item['product']['id'] == productId) {

      //     index = i;
      //     break;
      //   }
      // }
      if (index == -1) {

        console.log('here');

        let item = data;
        // item.price = data.sale_price;
        // item.qty = data['qty'];
        // item.color = data['color'];
        // item.size = data['size'];
        // item.image = data.product_image;
        // item.name = data.product_name;
        // item.cost = item.qty * item.price;
        // cart[index] = item;//JSON.stringify(item);
        cart.push(item);
        localStorage.setItem('cart', JSON.stringify(cart));

      }
      else {

        console.log('there');

        // let item = cart[index]
        // item.price = item['product']['sale_price'];
        // item.qty += data['qty'];
        // item.color = data['color'];
        // item.cost = item.qty * item.price;
        // item.size = data['size'];
        // cart[index] = item;

        // localStorage.setItem('cart', JSON.stringify(cart));
      }

    }
    else {

      console.log('here and there');

      let item = data;
      // item.price = data.sale_price;
      // item.qty = data['qty'];
      // item.color = data['color'];
      // item.size = data['size'];
      // item.cost = item.qty * item.price;

      let cart = [];
      cart.push(item);
      localStorage.setItem('cart', JSON.stringify(cart));

    }

  };

  removeFromCart(data: any) {
    console.log(data);

    let productId = data.product_id;
    if (localStorage.getItem('cart')) {
      let cart: any = JSON.parse(localStorage.getItem('cart'));
      let index: number = -1;
      for (var i = 0; i < cart.length; i++) {

        let item = cart[i];

        if (item.product_id == productId) {

          index = i;
          break;
        }
      }
      if (index != -1) {

        let item = cart[index]
        cart.pop(item);

        localStorage.setItem('cart', JSON.stringify(cart));
      }

    }


  }


  clearCart() {
    localStorage.removeItem('cart');
  }

}
