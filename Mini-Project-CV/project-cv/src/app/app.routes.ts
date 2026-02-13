import { Routes } from '@angular/router';
import { CVFormComponent } from './components/cv-form/cv-form.component';



export const routes: Routes = [
  { path: '', component: CVFormComponent },
  {
  path: 'cv-preview',
  loadComponent: () =>
    import('./cv-preview/cv-preview').then(m => m.CvPreviewComponent)
}

];
