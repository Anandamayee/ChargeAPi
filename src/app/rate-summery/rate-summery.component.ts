import { element } from 'protractor';
import { RateSummeryServiceService } from './../rate-summery-service.service';
import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { FormBuilder, Validators } from '../../../node_modules/@angular/forms';
@Component({
  selector: 'app-rate-summery',
  templateUrl: './rate-summery.component.html',
  styleUrls: ['./rate-summery.component.css']
})
export class RateSummeryComponent implements OnInit {
  constructor(private service: RateSummeryServiceService, private fb: FormBuilder) { }
  legDetails = [];
  errorMessageShow: boolean = false;
  copiedLeg = [];
  confirmationMessage: boolean = false;
  editChargeForm: any;
  basis: any;
  amount: any;
  editedCharge: any;
  addChargesForm: any;
  addLegForm: any;
  RHPChanged: boolean = false;
  // margin: any;
  vari: any;
  showOkError: boolean = false;
  errorMessage: string = '';
  @ViewChild('btnSave') btnSave: ElementRef;
  @ViewChild('btnADD') btnADD: ElementRef;
  @ViewChild('btncreate') btncreate: ElementRef;
  @ViewChild('btncopy') btncopy: ElementRef;
  @ViewChild('margin') margin: ElementRef;
  errorArray = [];
  totalAmout: number = 0;
  breakUpRate: number = 0;
  ngOnInit() {
    this.buildEditForm();
    this.buildAddForm();
    this.buildCreateLegForm();
    this.service.getLegDetails().subscribe((response) => {
      console.log(response);
      this.legDetails = response['leg_data'];
      this.legDetails.forEach(element => {
        element['showOkError'] = false,
          element['margin'] = ''
      });
    }),
      error => {
        console.log(error.message);
        this.errorMessageShow = true;
      }
  }
  ngDoCheck() {
    if (this.legDetails.length > 0) {
      this.breakUpRate = this.legDetails[0].rate_card_obj.card_meta.total_cost;
      this.totalAmout = 0;
      this.legDetails.forEach(element => {
        this.totalAmout += element.rate_card_obj.card_meta.total_cost;
      })
    }
    else {
      this.totalAmout = 0;
      this.breakUpRate = 0;
    }
  }
  copyButtonClicked(legData) {
    this.copiedLeg.push(legData);
    this.legDetails = this.legDetails.filter(element => element.rate_card_meta.leg_name != legData.rate_card_meta.leg_name);
    this.RHPChanged = true;
    console.log(this.legDetails);
  }
  copyAll() {
    this.btncopy.nativeElement.click();
    this.legDetails.forEach(element => {
      this.copiedLeg.push(element);
    });
    this.legDetails = [];
    this.RHPChanged = true;
  }
  removeLeg(legData) {
    legData.showOkError = false;
    this.legDetails.push(legData);
    this.copiedLeg = this.copiedLeg.filter(element => element.rate_card_meta.leg_name != legData.rate_card_meta.leg_name);
    this.RHPChanged = true;
  }
  deleteACharge(chargeData, i) {
    this.copiedLeg = this.copiedLeg.filter(e1 => e1.rate_card_obj.card_charges = e1.rate_card_obj.card_charges.filter(element => element.charge_name != chargeData.charge_name))
    this.copiedLeg[i].rate_card_obj.card_meta.total_cost = this.copiedLeg[i].rate_card_obj.card_meta.total_cost - chargeData.total;
    this.RHPChanged = true;
  }
  buildEditForm() {
    this.editChargeForm = this.fb.group({
      charge_name: [''],
      basis: [''],
      total: [''],
      container_type: [''],
      charge_currency: [''],
      amount: [''],
      currency: ['']
    });
  }
  buildAddForm() {
    this.addChargesForm = this.fb.group({
      charge_name: ['', Validators.required],
      description: [''],
      basis: ['', Validators.required],
      unit_price: ['', Validators.required],
      quantity: [''],
      amount: ['', Validators.required],
      total: ['', Validators.required],
      container_type: ['', Validators.required],
      charge_currency: ['', Validators.required],
      remark: [''],
      charge_line: [''],
      min_flag: [''],
      min_amount: [''],
      global_charge_id: ['', Validators.required],
      global_leg_id: [''],
      leg_name: ['']
    });
  }
  buildCreateLegForm() {
    this.addLegForm = this.fb.group({
      leg_name: ['', Validators.required],
      charge_name: ['', Validators.required]
    })
  }
  ediFormSubmit() {
    this.copiedLeg.forEach(element => {
      element.rate_card_obj.card_charges.forEach(elementrated => {
        if (elementrated.charge_name == this.editChargeForm.value.charge_name) {
          if (this.editChargeForm.value.basis != "" && this.editChargeForm.value.basis != null) {
            elementrated.basis = this.editChargeForm.value.basis;
          }
          if (this.editChargeForm.value.total != "" && this.editChargeForm.value.total != null) {
            element.rate_card_obj.card_meta.total_cost += Math.abs(this.editChargeForm.value.total - elementrated.total);
            elementrated.total = this.editChargeForm.value.total;
          }
          if (this.editChargeForm.value.container_type != "" && this.editChargeForm.value.container_type != null) {
            elementrated.container_type = this.editChargeForm.value.container_type;
          }
          if (this.editChargeForm.value.charge_currency != "" && this.editChargeForm.value.charge_currency != null) {
            elementrated.charge_currency = this.editChargeForm.value.charge_currency;
          }
          if (this.editChargeForm.value.amount != "" && this.editChargeForm.value.amount != null) {
            elementrated.amount = this.editChargeForm.value.amount;
          }
          if (this.editChargeForm.value.currency != "" && this.editChargeForm.value.currency != null) {
            element.rate_card_obj.card_meta.currency = this.editChargeForm.value.currency;
          }
        }
      })
    })
    this.RHPChanged = true;
    console.log(this.editChargeForm.value)
    this.btnSave.nativeElement.click();
    this.editChargeForm.reset();
  }
  addChargesFormSubmit() {
    this.copiedLeg.forEach(element => {
      if (element.rate_card_meta.leg_name == this.addChargesForm.value.leg_name) {
        element.rate_card_obj.card_charges.push(this.addChargesForm.value);
      }
      element.rate_card_obj.card_meta.total_cost += this.addChargesForm.value.total;
    })
    console.log("copiedLeg", this.copiedLeg, "   ", this.addChargesForm.value);
    this.RHPChanged = true;
    this.btnADD.nativeElement.click();
    this.addChargesForm.reset();
  }
  addLegFormSubmit() {
    let global_leg_id = 0
    if (this.copiedLeg.length > 0) {
      global_leg_id = this.copiedLeg[this.copiedLeg.length - 1].rate_card_meta.global_leg_id + 1;
    }
    else {
      global_leg_id = 1;
    }
    this.copiedLeg.push(
      {
        rate_card_meta: {
          leg_name: this.addLegForm.value.leg_name,
          step: "fcl_" + global_leg_id,
          global_leg_id: global_leg_id
        },
        rate_card_obj: {
          card_charges: [
            {
              charge_name: this.addLegForm.value.charge_name,
              description: "",
              basis: "",
              unit_price: "",
              quantity: 1,
              amount: "",
              total: "",
              container_type: "",
              charge_currency: "",
              remark: "",
              charge_line: 0,
              min_flag: 0,
              min_amount: 0,
              global_charge_id: "",
              global_leg_id: "",
              leg_name: ""
            }
          ],
          card_meta: {
            total_cost: 0,
            currency: '',
          }
        }
      }
    )
    this.addLegForm.reset();
    this.btncreate.nativeElement.click();
  }
  marginOk(legData, value) {
    if (value != '') {
      if (value < 99 && value != 0) {
        console.log
          (document.getElementById(legData.rate_card_obj.card_meta.leg_name))
        legData.rate_card_obj.card_charges.forEach(element => {
          element.amount = Number(element.amount + (element.amount * value / 100))
        });
        legData.margin = '';
        legData.showOkError = '';
        this.copiedLeg.push(legData);
        this.legDetails = this.legDetails.filter(element => element.rate_card_meta.leg_name != legData.rate_card_meta.leg_name);
        this.RHPChanged = true;
      }
    }
  }
  isFieldValid(form, field: string) {
    return !form.get(field).valid && form.get(field).touched;
  }
  @HostListener("window:beforeunload", ["$event"]) unloadHandler(event: Event) {
    if (this.RHPChanged) { event.returnValue = false; }
  }
  indexTracker(index: number, value: any) {
    return index;
  }
  input(event) {
    console.log(this.margin.nativeElement.value);
  }
}
