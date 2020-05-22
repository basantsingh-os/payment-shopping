import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatPaginatorModule} from '@angular/material/paginator';
import {PaginationModule} from 'ngx-bootstrap/pagination';
import { PagingHeaderComponent } from './Components/paging-header/paging-header.component';
import { PagerComponent } from './Components/pager/pager.component';
import { MatIconModule } from '@angular/material/icon';
import {CarouselModule} from 'ngx-bootstrap/carousel';
import { OrderTotalComponent } from './Components/order-total/order-total.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import {  ReactiveFormsModule, FormsModule } from '@angular/forms';
import {MatMenuModule} from '@angular/material/menu';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatStepperModule} from '@angular/material/stepper';
import { BasketSummaryComponent } from './Components/basket-summary/basket-summary.component';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import {CurrencyMaskModule} from 'ng2-currency-mask';






@NgModule({
  declarations: [PagingHeaderComponent, PagerComponent, OrderTotalComponent, BasketSummaryComponent],
  imports: [
    CommonModule,
    MatPaginatorModule,
    PaginationModule.forRoot(),
    CarouselModule,
    MatToolbarModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatExpansionModule,
    MatStepperModule,
    RouterModule,
    MatButtonModule,
    FormsModule,
    CurrencyMaskModule
  ],
  exports: [MatPaginatorModule,
             PaginationModule,
             PagingHeaderComponent,
             PagerComponent,
             MatIconModule,
             CarouselModule,
             OrderTotalComponent,
             ReactiveFormsModule,
             MatMenuModule,
             MatExpansionModule,
             BasketSummaryComponent,
             FormsModule,
             CurrencyMaskModule

            ]
})
export class SharedModule { }
