import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UserReturnsPage } from './user-returns.page';

describe('UserReturnsPage', () => {
  let component: UserReturnsPage;
  let fixture: ComponentFixture<UserReturnsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserReturnsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UserReturnsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
