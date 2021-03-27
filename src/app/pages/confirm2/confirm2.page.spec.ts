import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Confirm2Page } from './confirm2.page';

describe('Confirm2Page', () => {
  let component: Confirm2Page;
  let fixture: ComponentFixture<Confirm2Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Confirm2Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Confirm2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
