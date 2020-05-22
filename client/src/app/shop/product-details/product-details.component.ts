import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/shared/models/product';
import { ShopService } from '../shop.service';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from 'xng-breadcrumb';
import { BasketService } from 'src/app/basket/basket.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product: IProduct;
  quantity = 1;

  constructor(private shopService: ShopService , private activatedRoutes: ActivatedRoute,
              private bcService: BreadcrumbService,
              private basketService: BasketService) {
    this.bcService.set('@productDetails', '');
  }

  ngOnInit(){
    this.loadProduct();
  }

  addItemToBasket() {
    this.basketService.addItemToBasket(this.product , this.quantity);
  }
  incrementQuantity() {
    this.quantity++;
  }

  decrementQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }

  }


  loadProduct()
  {
    this.shopService.getProduct(+this.activatedRoutes.snapshot.paramMap.get('id')).subscribe(product => {
      this.product = product;
      this.bcService.set('@productDetails' , product.name);
      console.log(product);
    },
    error => {
      console.log(error);
    }
    );

  }

}