import { IBasket } from 'src/app/shared/models/basket';
import { Observable } from 'rxjs';
import { Component, OnInit, Input } from '@angular/core';

import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CdkStepper } from '@angular/cdk/stepper';
import { BasketService } from 'src/app/basket/basket.service';

@Component({
  selector: 'app-checkout-review',
  templateUrl: './checkout-review.component.html',
  styleUrls: ['./checkout-review.component.scss']
})
export class CheckoutReviewComponent implements OnInit {
  basket$: Observable<IBasket>;
  @Input() reviewFormGroup: FormGroup;
  @Input() appStepper: CdkStepper;


  constructor(private basketService: BasketService, private toastr: ToastrService) { }


  ngOnInit(): void {
    this.basket$ = this.basketService.basket$;

  }
  createPaymentIntent() {
    return this.basketService.createPaymentIntent().subscribe((response: any) => {
      this.toastr.success('Payment intent created');
      this.appStepper.next();
    }, error => {
      console.log(error);
      this.toastr.error(error.message);
    });
  }


}
