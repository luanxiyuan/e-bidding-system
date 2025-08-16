import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { MainFrameComponent } from './main-frame.component';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { LeftMenuComponent } from '../left-menu/left-menu.component';

describe('MainFrameComponent', () => {
  let component: MainFrameComponent;
  let fixture: ComponentFixture<MainFrameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ 
        MainFrameComponent,
        NavBarComponent,
        LeftMenuComponent
      ],
      imports: [ RouterTestingModule, HttpClientTestingModule ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainFrameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
