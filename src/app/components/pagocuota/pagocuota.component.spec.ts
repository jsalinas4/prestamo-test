import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagocuotaComponent } from './pagocuota.component';

describe('PagocuotaComponent', () => {
  let component: PagocuotaComponent;
  let fixture: ComponentFixture<PagocuotaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PagocuotaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagocuotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
