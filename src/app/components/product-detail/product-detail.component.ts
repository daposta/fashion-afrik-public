import { Component, OnInit } from '@angular/core';

import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { ColorService } from '../../services/color.service';
import { FabricService } from '../../services/fabric.service';
import { SizeService } from '../../services/size.service';
import { CurrencyService } from '../../services/currency.service';
import { ExchangeRateService } from '../../services/exchange-rate.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms'

import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Globals } from '../../shared/api';
// import 'assets/summernote';
import 'jquery-zoom';

declare var $: any;

// import  'slick-carousel';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
  providers: [ProductService, CartService, ColorService, FabricService, SizeService,
    CurrencyService, ExchangeRateService]
})
export class ProductDetailComponent implements OnInit {
  t = localStorage;
  currencys: any[];
  exchange_rates: any[];
  product: Object = {};
  review: Object = {};
  host_address: string = this.globals.HOST_URL;
  productItem: Object = {};
  cartForm: FormGroup;
  reviewForm: FormGroup;
  customizeProductForm: FormGroup;
  reviewSubmitAttempt: boolean;
  customSubmitAttempt: boolean;
  reps: any[];
  title: any;
  description: any;
  img_url: any;
  url: any;
  error: any;
  cart: any[];
  colors: any[];
  fabrics: any[];
  sizes: any[];

  private formSubmitAttempt: boolean;

  constructor(private productSrv: ProductService, private route: ActivatedRoute, private globals: Globals,
    private cartSrv: CartService, private colorSrv: ColorService, private sizeSrv: SizeService,
    private fabricSrv: FabricService, fb: FormBuilder, private currencySrv: CurrencyService,
    private rateSrv: ExchangeRateService) {
    this.cartForm = fb.group({
      'qty': ['', Validators.required],
      'size': ['', Validators.required],
      'color': ['', Validators.required],
    });

    this.reviewForm = fb.group({
      'name': ['', Validators.required],
      'email': ['', Validators.required],
      'comment': ['', Validators.required],
    });

    this.customizeProductForm = fb.group({
      'fabric': ['', Validators.required],
      'color': ['', Validators.required],
      'collar': ['', Validators.required],
      'waist': ['', Validators.required],
      'chest': ['', Validators.required],
      'insideLegs': ['', Validators.required],
      'upperBodyLength': ['', Validators.required],
    });




    $(function () {
      $('.responsive').slick({
        dots: true,
        infinite: false,
        speed: 300,
        slidesToShow: 5,
        slidesToScroll: 5
      });

      $('.slider-for').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        centerMode: true,
        asNavFor: '.slider-nav'
      });
      $('.slider-nav').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        asNavFor: '.slider-for',
        // centerMode: true,
        arrows: true,
        focusOnSelect: true
      });

      // product slider zoom
      $('.slider-nav .slider-item').zoom({ url: '/assets/img/denim1.jpg' });
    });

    $('.filter').click(function (e) {
      $(this).addClass('is-loading');
    });

  }






  ngOnInit() {
    //localStorage.removeItem('cart');
    //localStorage.removeItem('checkout');
    //  console.log(localStorage);

    // this.colorSrv.fetchColors().subscribe(
    //   data => {
    //     this.colors = data.results;

    //   }, error => {
    //     console.log(error);        
    //     // let msg = JSON.parse(error._body)['message'];

    //     // this.error = msg;

    //   });

    // this.fabricSrv.fetchFabrics().subscribe(
    //   data => {
    //     this.fabrics = data.results;

    //   }, error => {
    //     console.log(error);
    //     // let msg = JSON.parse(error._body)['message'];

    //     // this.error = msg;

    //   });
    // this.sizeSrv.fetchSizes().subscribe(
    //   data => {
    //     this.sizes = data.results;

    //   }, error => {
    //     console.log(error);        

    //     // let msg = JSON.parse(error._body)['message'];

    //     // this.error = msg;

    //   });



    this.route.params.switchMap((params: Params) =>
      this.productSrv.findProductByUUID(params['id']))
      .subscribe(
        res => {
          this.product = res;
          // console.log(this.product);
          let product_imgs = [];

          for (let i = 0; i < this.product['other_images'].length; i++) {
            product_imgs.push(this.product['other_images'][i].image);
          }
          this.reps = product_imgs;
          this.title = this.product['name'];
          this.description = this.product['description'];
          this.img_url = this.product['feature_image'];
          this.url = document.location.href;
        }, err => {
          console.log(err);
        });

    this.fetchCurrencys();
    this.fetchExchangeRates()
    if (!localStorage.getItem('currency')) {
      localStorage.setItem('currency', 'GBP');
    }
    //  $('.summernote').summernote();
  }

  fetchCurrencys() {

    this.currencySrv.fetchCurrencys().subscribe(
      res => {
        this.currencys = res;
        // console.log(this.currencys);
      }, err => {
        console.log(err);
      });
  }

  fetchExchangeRates() {
    this.rateSrv.fetchRates().subscribe((res: any) => {
      this.exchange_rates = res;
      // console.log(this.exchange_rates);

      let selected_currency = this.exchange_rates.find(x => x['currency']['code'] == localStorage.getItem('currency'));
      localStorage.setItem('rate', selected_currency.rate);
    }, err => {
      console.log(err);
    })

  }

  changeCurrency(evt) {
    localStorage.setItem('currency', evt.target.value);
    let selected_currency = this.exchange_rates.find(x => x['currency']['code'] == localStorage.getItem('currency'));
    localStorage.setItem('rate', selected_currency.rate);

  }

  numbersOnly(event: any) {
    const pattern = /[0-9\+\-\ ]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  addToCart(t) {
    this.formSubmitAttempt = true;
    if (this.cartForm.valid && this.product) {
      // console.log(this.product);
      // console.log(this.cartForm.value);

      let nProduct: any = {};
      nProduct = this.product;

      let data = { 'product_id': nProduct.id, 'product_name':  nProduct.name, 'product_image': nProduct.banner_image, 'sale_price': nProduct.sale_price, 'cost': nProduct.sale_price * parseInt(t['qty'], 10), 'qty': parseInt(t['qty'], 10), 'size': t['size'], 'color': t['color'] };
      // console.log(data);

      this.cartSrv.addToCart(data);
      this.getCart();
      $("html, body").animate({ scrollTop: 0 }, "slow");
    }

  };

  getCart() {

    this.cart = this.cartSrv.loadCart()//.then(response => this.cart = response)


  }

  saveReview(review) {
    this.reviewSubmitAttempt = true;
    if (this.reviewForm.valid) {
      review['product'] = this.product['id'];
      this.productSrv.saveNewReview(review).subscribe(res => {

        if (res) {

          this.product['reviews'].unshift(res);
          $('html, body').animate({
            scrollTop: $(".review-block").offset().top
          }, 2000);

        }
        this.reviewForm.reset();
      }, error => {
        console.log(error);
        // let msg = JSON.parse(error._body)['message'];
      });
    }
  };

  saveCustomRequest(data) {
    this.customSubmitAttempt = true;
    if (this.customizeProductForm.valid) {
      console.log(data);
    }
  }


  goToAddReview() {
    $('html, body').animate({
      scrollTop: $("#product-description").offset().top
    }, 2000);
  }



  checkItemInCart() {

  }


  checkItemInWishList() {

  }





}
