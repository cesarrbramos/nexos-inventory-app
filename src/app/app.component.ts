import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { NgbdSortableHeaderDirective } from './ngbd-sortable-header.directive';
import { CountryService } from './service/country.service';
import { ProductService } from './service/api/product.service';
import { Product } from './models/product.model';
import { Page } from './utils/page';
import { debounceTime, delay, startWith, timeout } from 'rxjs';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductFormModalComponent } from './components/product-form-modal/product-form-modal.component';
import { IProductForm } from './utils/product.form';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {

}
