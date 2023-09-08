import { Component } from '@angular/core';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { ToolbarService } from 'src/app/service/toolbar.service';

interface Menu {
  path: string
  icon: IconProp
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  menuOptions: Menu[] = [
    { path: '/home/products', icon: 'box' },
    { path: '/home/users', icon: 'users' },
    { path: '/home/roles', icon: 'user-tag' },
  ];

  constructor(public toolbar: ToolbarService) {
    
  }

  onNew() {
    this.toolbar.onNew.emit();
  }

  

}
