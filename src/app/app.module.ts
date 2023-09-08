import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbDropdownModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbdSortableHeaderDirective } from './ngbd-sortable-header.directive';
import { DecimalPipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductService } from './service/api/product.service';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { ProductFormModalComponent } from './components/product-form-modal/product-form-modal.component';
import { ProductsComponent } from './pages/products/products.component';
import { HomeComponent } from './pages/home/home.component';
import { ToolbarService } from './service/toolbar.service';
import { AlertService } from './service/alert.service';
import { NgxSelectModule } from 'ngx-select-ex';
import { DeleteAsModalComponent } from './components/delete-as-modal/delete-as-modal.component';
import { UsersComponent } from './pages/users/users.component';
import { RolesComponent } from './pages/roles/roles.component';
import { TableComponent } from './components/table/table.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductFormModalComponent,
    ProductsComponent,
    HomeComponent,
    DeleteAsModalComponent,
    UsersComponent,
    RolesComponent,
    TableComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    NgbDropdownModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule,
    NgxSelectModule
  ],
  providers: [DecimalPipe, ProductService, ToolbarService, AlertService],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas);
  }

}
