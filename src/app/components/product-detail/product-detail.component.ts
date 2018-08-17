import { Component, OnInit, AfterViewInit } from '@angular/core';
import { EcomProductZoomModalImage, EcomProductZoomModalService } from '@plency/ecom-product-zoom-modal';

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
import 'jquery-zoom';

declare var $: any;

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
  providers: [ProductService, CartService, ColorService, FabricService, SizeService,
    CurrencyService, ExchangeRateService]
})
export class ProductDetailComponent implements OnInit, AfterViewInit {
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
  allImages: any[] = [];
  imgWindex: any[] = [];
  image: any;

  private formSubmitAttempt: boolean;

  images: EcomProductZoomModalImage[] = [{
    img: this.allImages['image'],
    thumb: this.allImages['image'],

  //   img: 'large-1.jpg',
  //   thumb: 'small-1.jpg'
  // }, {
  //   img: 'large-2.jpg',
  //   thumb: 'small-2.jpg'
  // }, {
  //   img: 'large-3.jpg',
  //   thumb: 'small-3.jpg'
  }];

  constructor(private productSrv: ProductService, private route: ActivatedRoute, private globals: Globals,
    private cartSrv: CartService, private colorSrv: ColorService, private sizeSrv: SizeService,
    private fabricSrv: FabricService, fb: FormBuilder, private currencySrv: CurrencyService,
    private rateSrv: ExchangeRateService, private prodZoomModalService: EcomProductZoomModalService) {

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

      $('.slider-for').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        fade: true,
        asNavFor: '.slider-nav'
      });
      $('.slider-nav').slick({
        slidesToShow: 5,
        slidesToScroll: 1,
        // asNavFor: '.slider-for',
        dots: false,
        centerMode: true,
        focusOnSelect: true
      });
    });

    $('.filter').click(function (e) {
      $(this).addClass('is-loading');
    });

  }

  ngOnInit() {

    this.route.params.switchMap((params: Params) =>
      this.productSrv.findProductByUUID(params['id']))
      .subscribe(
        res => {
          this.product = res;
          console.log(this.product);
          const product_imgs = [];
          this.image = this.product['banner_image'];

          for (let i = 0; i < this.product['other_images'].length; i++) {
            product_imgs.push(this.product['other_images'][i].image);
            this.allImages.push({
              id: i + 1,
              image: this.product['other_images'][i].image,
              slide: 'slide_' + (i + 1),
            });
          }
          // const length = this.allImages.length;
          this.allImages.unshift({
            id: 0,
            image: this.product['banner_image'],
            slide: 'slide_' + 0,
          });
          this.reps = product_imgs;
          this.title = this.product['name'];
          this.description = this.product['description'];
          this.img_url = this.product['banner_image'];
          this.url = document.location.href;
          console.log(this.allImages);
        }, err => {
          console.log(err);
        });

    this.fetchCurrencys();
    this.fetchExchangeRates()
    if (!localStorage.getItem('currency')) {
      localStorage.setItem('currency', 'GBP');

    }

    $(function () {

      // $('.slider-for').slick({
      //   slidesToShow: 1,
      //   slidesToScroll: 1,
      //   arrows: true,
      //   fade: true,
      //   asNavFor: '.slider-nav'
      // });
      // $('.slider-nav').slick({
      //   slidesToShow: 5,
      //   slidesToScroll: 1,
      //   // asNavFor: '.slider-for',
      //   dots: false,
      //   centerMode: true,
      //   focusOnSelect: true
      // });
    });
  }

  ngAfterViewInit() {
    // $(function () {

    //   $('.slider-for').slick({
    //     slidesToShow: 1,
    //     slidesToScroll: 1,
    //     arrows: true,
    //     fade: true,
    //     asNavFor: '.slider-nav'
    //   });
    //   $('.slider-nav').slick({
    //     slidesToShow: 5,
    //     slidesToScroll: 1,
    //     // asNavFor: '.slider-for',
    //     dots: false,
    //     centerMode: true,
    //     focusOnSelect: true
    //   });
    // });
  }

  viewImage(_image) {
    console.log(_image);
    this.image = _image;
  }

  fetchCurrencys() {

    this.currencySrv.fetchCurrencys().subscribe(
      res => {
        this.currencys = res.results;
        // console.log(this.currencys);
      }, err => {
        console.log(err);
      });
  }

  fetchExchangeRates() {
    this.rateSrv.fetchRates().subscribe((res: any) => {
      this.exchange_rates = res.results;
      // console.log(this.exchange_rates);

      const selected_currency = this.exchange_rates.find(x => x['currency']['code'] === localStorage.getItem('currency'));
      // localStorage.setItem('rate', selected_currency.rate);

      if (this.product && this.product['currency  ']) {
        if (!(this.product['currency']['code'] === selected_currency['currency']['code'])) {


          localStorage.setItem('rate', selected_currency['rate']);
        } else {
          localStorage.setItem('rate', String(1));
        }

      }
    }, err => {
      console.log(err);
    })

  }

  changeCurrency(evt) {
    localStorage.setItem('currency', evt.target.value);
    const selected_currency = this.exchange_rates.find(x => x['currency']['code'] === localStorage.getItem('currency'));

    if (!(this.product['currency']['code'] === selected_currency['currency']['code'])) {

      localStorage.setItem('rate', selected_currency['rate']);
    } else {
      localStorage.setItem('rate', String(1));
    }

  };

  numbersOnly(event: any) {
    const pattern = /[0-9\+\-\ ]/;

    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode !== 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  addToCart(t) {
    this.formSubmitAttempt = true;
    if (this.cartForm.valid && this.product) {

      let nProduct: any = {};
      nProduct = this.product;

      const data = { 'product_id': nProduct.id, 'product_name': nProduct.name,
      'product_image': nProduct.banner_image, 'sale_price': nProduct.sale_price,
      'cost': nProduct.sale_price * parseInt(t['qty'], 10), 'qty': parseInt(t['qty'], 10),
      'size': t['size'], 'color': t['color'], 'price': nProduct.sale_price / JSON.parse(localStorage.getItem('rate')) };

      this.cartSrv.addToCart(data);
      this.getCart();
      $('html, body').animate({ scrollTop: 0 }, 'slow');
    }

  };

  getCart() {

    this.cart = this.cartSrv.loadCart()


  }

  saveReview(review) {
    this.reviewSubmitAttempt = true;
    if (this.reviewForm.valid) {
      review['product'] = this.product['id'];
      this.productSrv.saveNewReview(review).subscribe(res => {

        if (res) {

          this.product['reviews'].unshift(res);
          $('html, body').animate({
            scrollTop: $('.review-block').offset().top
          }, 2000);

        }
        this.reviewForm.reset();
      }, error => {
        console.log(error);
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
      scrollTop: $('#product-description').offset().top
    }, 2000);
  }



  checkItemInCart() {

  }


  checkItemInWishList() {

  }





}
