import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CvPreviewComponent } from './cv-preview';

describe('CvPreview', () => {
  let component: CvPreviewComponent;
  let fixture: ComponentFixture<CvPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CvPreviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CvPreviewComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
