import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageShapeComponent } from './message-shape.component';

describe('MessageShapeComponent', () => {
  let component: MessageShapeComponent;
  let fixture: ComponentFixture<MessageShapeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MessageShapeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MessageShapeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
