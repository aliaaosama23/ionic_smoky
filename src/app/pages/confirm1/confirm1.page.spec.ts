import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Confirm1Page } from './confirm1.page';

describe('Confirm1Page', () => {
  let component: Confirm1Page;
  let fixture: ComponentFixture<Confirm1Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Confirm1Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Confirm1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
