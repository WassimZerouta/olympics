import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfosViewComponent } from './infos-view.component';

describe('DetailsComponentComponent', () => {
  let component: InfosViewComponent;
  let fixture: ComponentFixture<InfosViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfosViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfosViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
