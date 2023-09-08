import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteAsModalComponent } from './delete-as-modal.component';

describe('DeleteAsModalComponent', () => {
  let component: DeleteAsModalComponent;
  let fixture: ComponentFixture<DeleteAsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteAsModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteAsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
