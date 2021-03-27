import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UserSubscribeNewsletterPage } from './user-subscribe-newsletter.page';

describe('UserSubscribeNewsletterPage', () => {
  let component: UserSubscribeNewsletterPage;
  let fixture: ComponentFixture<UserSubscribeNewsletterPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserSubscribeNewsletterPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UserSubscribeNewsletterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
