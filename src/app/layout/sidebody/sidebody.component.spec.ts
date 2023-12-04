import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebodyComponent } from './sidebody.component';

describe('SidebodyComponent', () => {
  let component: SidebodyComponent;
  let fixture: ComponentFixture<SidebodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebodyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SidebodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
