import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UsseraddressesAddEditPage } from './usseraddresses-add-edit.page';

describe('UsseraddressesAddEditPage', () => {
  let component: UsseraddressesAddEditPage;
  let fixture: ComponentFixture<UsseraddressesAddEditPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsseraddressesAddEditPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UsseraddressesAddEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
