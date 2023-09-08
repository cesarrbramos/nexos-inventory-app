import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/service/api/user.service';

@Component({
  selector: 'app-delete-as-modal',
  templateUrl: './delete-as-modal.component.html',
  styleUrls: ['./delete-as-modal.component.scss']
})
export class DeleteAsModalComponent implements OnInit {

  items: User[] = [];
  selectedUser?: User;

  constructor(private userService: UserService, private activeModal: NgbActiveModal) {}
  
  ngOnInit(): void {
    this.search();
  }

  search(query: string = '') {
    this.userService.getUsers(query, 0, 15)
      .subscribe(res => this.items = res.content);
  }

  close() {
    if (!this.selectedUser) return;
    this.activeModal.close(this.selectedUser);
  }

  dismiss() {
    this.activeModal.dismiss();
  }

}
