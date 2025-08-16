import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { BwicBidUpdateComponent } from './bwic-bid-update.component';

describe('BwicBidUpdateComponent', () => {
  let component: BwicBidUpdateComponent;
  let fixture: ComponentFixture<BwicBidUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BwicBidUpdateComponent ],
      imports: [ FormsModule ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BwicBidUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
