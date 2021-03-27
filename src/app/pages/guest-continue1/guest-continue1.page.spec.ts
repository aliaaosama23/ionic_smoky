import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GuestContinue1Page } from './guest-continue1.page';

describe('GuestContinue1Page', () => {
  let component: GuestContinue1Page;
  let fixture: ComponentFixture<GuestContinue1Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuestContinue1Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GuestContinue1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
