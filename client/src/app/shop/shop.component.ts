import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { IProduct } from '../shared/models/product';
import { ShopService } from './shop.service';
import { IBrand } from '../shared/models/brand';
import { IType } from '../shared/models/productType';
import {ShopParams} from '../shared/models/shopParams';
import { PageEvent } from '@angular/material/paginator';
@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  @ViewChild('search', {static: false}) searchTerm: ElementRef; // because no conditions
  products: IProduct[];
  types: IType[];
  brands: IBrand[];
  shopParams: ShopParams;
  totalCount: number;

  sortOptions = [
    {name: 'Alphabetcial', value: 'name' },
    {name: 'Price: Low to High' , value: 'priceAsc'},
    {name: 'Price: High to Low' , value: 'priceDesc'}
 ];

 constructor(private shopService: ShopService) {
  this.shopParams = this.shopService.getShopParams();
}

  ngOnInit(): void {
    this.getProducts(true);
    this.getBrands();
    this.getTypes();

  }



  getProducts(useCache = false) {
    this.shopService.getProducts(useCache).subscribe(response => {

        this.products = response.data;
        this.shopParams.pageNumber = response.pageIndex;
        this.shopParams.pageSize = response.pageSize;
        this.totalCount = response.count;
      },
      error => {
        console.log(error);
      }
    );

  }


  getTypes() {
    this.shopService.getTypes().subscribe(
      response => {
        this.types =  [{id: 0, name: 'All' }, ...response];
      },
      error => {
        console.log(error);
      }
    );

  }


  getBrands() {
    this.shopService.getBrands().subscribe(
      response => {
        this.brands = [{id: 0, name: 'All' }, ...response];
      },
      error => {
        console.log(error);
      }

    );

  }


  onBrandSelected(brandId: number)
  {
    const params = this.shopService.getShopParams();
    params.brandId = brandId;
    params.pageNumber = 1;
    this.shopService.setShopParams(params);

    this.getProducts();

  }


  onTypeSelected(typeId: number)
  {
    const params = this.shopService.getShopParams();
    params.typeId = typeId;
    params.pageNumber = 1;
    this.shopService.setShopParams(params);
    this.getProducts();

  }

  onSortSelected(sort: string) {
    const params = this.shopService.getShopParams();
    params.sort = sort;
    this.shopService.setShopParams(params);

    this.getProducts();
  }

  onPageChanged(event: any){
    const params = this.shopService.getShopParams();
    if (params.pageNumber !== event) {
      params.pageNumber = event;
      this.shopService.setShopParams(params);
      this.getProducts(true);

    }

  }

  onSearch(x?: string) {
    const params = this.shopService.getShopParams();
    params.search = this.searchTerm.nativeElement.value;
    params.pageNumber = 1;
    this.shopService.setShopParams(params);

    this.getProducts();

  }

  onReset() {
    this.searchTerm.nativeElement.value = '';
    const params = new ShopParams();
    this.shopService.setShopParams(params);
    this.getProducts();
  }

}
