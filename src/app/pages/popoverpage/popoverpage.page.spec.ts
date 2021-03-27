import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PopoverpagePage } from './popoverpage.page';

describe('PopoverpagePage', () => {
  let component: PopoverpagePage;
  let fixture: ComponentFixture<PopoverpagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopoverpagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PopoverpagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
