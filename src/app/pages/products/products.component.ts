import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime } from 'rxjs';
import { DeleteAsModalComponent } from 'src/app/components/delete-as-modal/delete-as-modal.component';
import { ProductFormModalComponent } from 'src/app/components/product-form-modal/product-form-modal.component';
import { Product } from 'src/app/models/product.model';
import { NgbdSortableHeaderDirective } from 'src/app/ngbd-sortable-header.directive';
import { AlertService } from 'src/app/service/alert.service';
import { ProductService } from 'src/app/service/api/product.service';
import { ToolbarService } from 'src/app/service/toolbar.service';
import { Page } from 'src/app/utils/page';
import { IProductForm } from 'src/app/utils/product.form';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  title = 'nexos-inventory-app';
  products: Product[] = [];
  total: number = 0;
  loading: boolean = true;
  isLast: boolean = true;

  private _querySearch: string = '';
  _page: number = 0;
  private _pageSize: number = 5;

  searchCtrl: FormControl = new FormControl();

  @ViewChildren(NgbdSortableHeaderDirective) headers!: QueryList<NgbdSortableHeaderDirective>;

  constructor(private productService: ProductService,
    private modalService: NgbModal,
    private alertService: AlertService,
    private toolbarService: ToolbarService) { }

  get querySearch() {
    return this._querySearch;
  }

  set page(value: number) {
    this._page = value - 1;
    this.searchProducts(this.searchCtrl.value, this._page);
  }

  set pageSize(value: number) {
    this._pageSize = value;
    this.searchProducts(this.searchCtrl.value);
  }

  get page() {
    return this._page;
  }

  get pageSize() {
    return this._pageSize;
  }

  ngOnInit(): void {
    this.searchProducts();

    this.toolbarService.onSearch$.subscribe((value: string) => this.searchProducts(value));

    this.toolbarService.onNew
    .pipe(debounceTime(500))
    .subscribe(this.onNewProduct);
  }

  searchProducts(query: string = '', page: number = 0) {
    this.loading = true;
    this.productService.getProducts(query || '', page, this.pageSize)
      .pipe(
        debounceTime(300)
      )
      .subscribe({
        next: this.OnResult
      })
      .add(() => this.loading = false);
  }

  OnResult = (page: Page<Product>) => {
    this.total = page.totalElements;
    this.products = page.content;
    this._page = page.number + 1;
    this.isLast = page.last;
  }

  onNewProduct = async () => {
    const modalRef = this.modalService.open(ProductFormModalComponent);
    const result: IProductForm = await modalRef.result;

    this.productService.create(result, result.createUserId)
      .subscribe({ next: this.onCreateSuccess,  })
  }

  async edit(item: Product) {
    const modalRef = this.modalService.open(ProductFormModalComponent);
    const instance: ProductFormModalComponent = modalRef.componentInstance;
    instance.setFormValue(item);
    
    modalRef.result.then((result: IProductForm) => {
      
      this.productService.update(item.id, result, result.updateUserId)
        .subscribe({ next: this.onEditSuccess, error: this.onError });

    });

  }

  async delete(item: Product) {
    const modalRef = this.modalService.open(DeleteAsModalComponent);
    modalRef.result.then((userId: number) => {
      this.productService.delete(item.id, userId)
        .subscribe({ next: this.onDeleteSuccess, error: this.onError });
    });

  }

  onEditSuccess = () => {
    this.alertService.success('Producto modificado con exito');
    this.searchProducts(this.querySearch, this._page);
  }

  onDeleteSuccess = () => {
    this.alertService.success('Producto eliminado con exito');
    this.searchProducts(this.querySearch);
  }

  onCreateSuccess = () => {
    this.alertService.success('Producto registrado con exito');
    this.searchProducts(this.querySearch, this._page);
  }

  onError = (error: HttpErrorResponse) => {
    const message = error.error?.message || 'Ocurrió un error al realizar la solucitud';
    this.alertService.error(message);
  }

}
