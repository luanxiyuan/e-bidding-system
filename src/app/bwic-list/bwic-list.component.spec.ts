import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { BwicListComponent } from './bwic-list.component';
import { BwicListFilterComponent } from '../bwic-list-filter/bwic-list-filter.component';
import { BwicBidAddComponent } from '../bwic-bid-add/bwic-bid-add.component';
import { BwicBidViewComponent } from '../bwic-bid-view/bwic-bid-view.component';
import { BwicBidUpdateComponent } from '../bwic-bid-update/bwic-bid-update.component';
import { BwicBidCancelComponent } from '../bwic-bid-cancel/bwic-bid-cancel.component';

describe('BwicListComponent', () => {
  let component: BwicListComponent;
  let fixture: ComponentFixture<BwicListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ 
        BwicListComponent,
        BwicListFilterComponent,
        BwicBidAddComponent,
        BwicBidViewComponent,
        BwicBidUpdateComponent,
        BwicBidCancelComponent
      ],
      imports: [HttpClientTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BwicListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
