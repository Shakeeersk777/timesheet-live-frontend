import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditTasksComponent } from './create-edit-tasks.component';

describe('CreateEditTasksComponent', () => {
  let component: CreateEditTasksComponent;
  let fixture: ComponentFixture<CreateEditTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateEditTasksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEditTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
