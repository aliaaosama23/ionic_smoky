import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UserprofileeditPage } from './userprofileedit.page';

describe('UserprofileeditPage', () => {
  let component: UserprofileeditPage;
  let fixture: ComponentFixture<UserprofileeditPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserprofileeditPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UserprofileeditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
