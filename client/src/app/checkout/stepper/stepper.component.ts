import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AccountService } from 'src/app/account/account.service';
import { BasketService } from 'src/app/basket/basket.service';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss']
})
export class StepperComponent implements OnInit {
  isLinear = false;
  addressFormGroup: FormGroup;
  deliveryFormGroup: FormGroup;
  reviewFormGroup: FormGroup;
  paymentFormGroup: FormGroup;


  constructor(private formBuilder: FormBuilder , private accountService: AccountService, private basketService: BasketService) {}

  ngOnInit() {
    this.addressFormGroup = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    street: ['', Validators.required],
    city: ['', Validators.required],
    state: ['', Validators.required],
    zipcode: ['', Validators.required],
    });

    this.deliveryFormGroup = this.formBuilder.group({
      deliveryMethod: ['', Validators.required]

    });
    this.reviewFormGroup = this.formBuilder.group({

    });
    this.paymentFormGroup = this.formBuilder.group({
      nameOnCard: ['', Validators.required]
    });

    this.getAddressFormValues();
    this.getDeliveryMethodValue();
  }

   getAddressFormValues()
  {
   this.accountService.GetUserAddress().subscribe(address => {
     if (address)
     {
       this.addressFormGroup.get('firstName').patchValue(address.firstName);
       this.addressFormGroup.get('lastName').patchValue(address.lastName);
       this.addressFormGroup.get('street').patchValue(address.street);
       this.addressFormGroup.get('city').patchValue(address.city);
       this.addressFormGroup.get('state').patchValue(address.state);
       this.addressFormGroup.get('zipcode').patchValue(address.zipcode);
     }
   }, error => {
     console.log(error);
   });


  }
  getDeliveryMethodValue() {
    const basket = this.basketService.getCurrentBasketValue();
    if (basket.deliveryMethodId !== null) {
      this.deliveryFormGroup.get('deliveryMethod').patchValue(basket.deliveryMethodId.toString());
    }
  }
}
