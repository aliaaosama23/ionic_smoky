import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Confirm3Page } from './confirm3.page';

describe('Confirm3Page', () => {
  let component: Confirm3Page;
  let fixture: ComponentFixture<Confirm3Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Confirm3Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Confirm3Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
