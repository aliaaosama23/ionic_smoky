import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GuestContinuePage } from './guest-continue.page';

describe('GuestContinuePage', () => {
  let component: GuestContinuePage;
  let fixture: ComponentFixture<GuestContinuePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuestContinuePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GuestContinuePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
