import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UseraddressesPage } from './useraddresses.page';

describe('UseraddressesPage', () => {
  let component: UseraddressesPage;
  let fixture: ComponentFixture<UseraddressesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UseraddressesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UseraddressesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
