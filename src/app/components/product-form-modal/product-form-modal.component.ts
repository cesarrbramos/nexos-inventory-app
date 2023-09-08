import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbDateStruct, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Product } from 'src/app/models/product.model';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/service/api/user.service';

@Component({
  selector: 'app-product-form-modal',
  templateUrl: './product-form-modal.component.html',
  styleUrls: ['./product-form-modal.component.scss'],
  providers: [DatePipe, UserService],
})
export class ProductFormModalComponent implements OnInit {

  form: FormGroup;
  isnew: boolean = true;
  filterUsuarioCre: User[] = [];
  filterUsuarioMod: User[] = [];

  constructor(private config: NgbModalConfig, 
    private activeModal: NgbActiveModal, 
    private fb: FormBuilder,
     private datePipe: DatePipe,
     private userService: UserService) {
    this.config.backdrop = 'static';
    this.form = this.fb.group({
      name: ['', Validators.required],
      quantity: ['', Validators.required],
      entryDate: ['', Validators.required],
      createUserId: ['', Validators.required],
      updateUserId: [''],
    });
  }

  ngOnInit(): void {
    this.searchQueryCreador();
    this.searchQueryMod();
  }

  setFormValue(product: Product) {
    this.isnew = false;

    let date = new Date(product.entryDate);
    const entryDate: NgbDateStruct = {
      year: date.getFullYear(),
      day: date.getDate(),
      month: date.getMonth() + 1
    };

    this.form.setValue({
      entryDate,
      name: product.name,
      quantity: product.quantity,
      createUserId: product?.createUser?.id,
      updateUserId: product?.updateUser?.id
    });

    

    this.form.get('updateUserId')?.setValidators(Validators.required);
  }

  save() {
    if (this.form.invalid) return;
    
    const result: Product = this.form.value;
    const {year, month, day}: NgbDateStruct = this.form.value.entryDate;
    result.entryDate = this.datePipe.transform(new Date(year, month, day), 'yyyy-MM-dd')||'';
    this.activeModal.close(result);
  }

  dismiss() {
    this.activeModal.dismiss('Dismiss');
  }

  searchQueryCreador(query: string = '') {
    this.userService.getUsers(query, 0, 15).subscribe(res => {
      this.filterUsuarioCre = res.content;
    })
  }

  searchQueryMod(query: string = '') {
    this.userService.getUsers(query, 0, 15).subscribe(res => {
      this.filterUsuarioMod = res.content;
    })
  }

}
