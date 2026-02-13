import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-personal-info',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="personal-info-container" [formGroup]="parentForm"
         style="display: flex; flex-direction: column; gap: 20px; padding: 24px; background: white; border-radius: 12px; 
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08); border: 1px solid #e1e5e9; max-width: 420px; font-family: Arial, sans-serif;">

      <!-- Adresse -->
      <div class="form-group" style="display: flex; flex-direction: column; gap: 8px;">
        <label style="font-weight: 500; color: #2d3748; font-size: 14px;">Adresse</label>
        <input type="text" formControlName="adresse" class="form-control"
               placeholder="Entrez votre adresse complète"
               style="padding: 10px 12px; border-radius: 8px; border: 1px solid #cbd5e0; background: #f8fafc; font-size: 14px; outline: none;
                      transition: border-color 0.2s ease, background-color 0.2s ease, box-shadow 0.2s ease; color: #2d3748;"
               [style.border-color]="parentForm.get('adresse')?.invalid && parentForm.get('adresse')?.touched ? '#e53e3e' : '#cbd5e0'"
               (focus)="onInputFocus($event)"
               (blur)="onInputBlur($event)">
      </div>

     
     <!-- Date de naissance -->
<div class="date-wrapper" style="position: relative; width: 100%;">
  <input type="date" formControlName="dateNaissance"
         style="width: 100%; box-sizing: border-box; padding: 10px 36px 10px 12px; border-radius: 8px; border: 1px solid #cbd5e0; background: #f8fafc; font-size: 14px; color: #2d3748; outline: none;"
         [style.border-color]="parentForm.get('dateNaissance')?.invalid && parentForm.get('dateNaissance')?.touched ? '#e53e3e' : '#cbd5e0'"
         (focus)="onInputFocus($event)" 
         (blur)="onInputBlur($event)">
  <i class="fas fa-calendar-alt"
     style="position: absolute; right: 12px; top: 50%; transform: translateY(-50%); color: #718096; pointer-events: none;"></i>
</div>



      <!-- Photo -->
      <div class="form-group photo-wrapper" style="display: flex; flex-direction: column; gap: 12px;">
        <label class="photo-label" 
               #photoLabel
               style="cursor: pointer; font-weight: 500; color: #2d3748; display: flex; align-items: center; gap: 8px; padding: 10px 16px;
                      background: #edf2f7; border-radius: 8px; border: 1px dashed #a0aec0; transition: all 0.2s;"
               (mouseenter)="photoLabel.style.background='#e2e8f0'; photoLabel.style.borderColor='#4299e1'" 
               (mouseleave)="photoLabel.style.background='#edf2f7'; photoLabel.style.borderColor='#a0aec0'">
          <span style="font-size: 18px;">📷</span>
          <span style="font-size: 14px;">Choisir une photo</span>
          <input type="file" (change)="onFileSelected($event)" accept="image/*" style="display: none;">
        </label>
        
        <div *ngIf="photoPreview" class="photo-preview-wrapper" 
             style="width: 120px; height: 120px; position: relative; margin-top: 8px;">
          <img [src]="photoPreview" alt="Aperçu de la photo" class="photo-preview"
               style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%; border: 3px solid #4299e1; 
                      box-shadow: 0 2px 6px rgba(66, 153, 225, 0.3); transition: transform 0.2s;">
          <span class="photo-badge" 
                style="position: absolute; bottom: 4px; right: 4px; background: #4299e1; color: white; font-size: 11px; 
                       font-weight: 500; padding: 3px 8px; border-radius: 12px; letter-spacing: 0.3px;">Aperçu</span>
        </div>
      </div>
    </div>
  `,
})
export class PersonalInfoComponent {
  @Input() parentForm!: FormGroup;

  photoFile!: File;
  photoPreview: string | null = null;

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.photoFile = file;
      const reader = new FileReader();
      reader.onload = () => this.photoPreview = reader.result as string;
      reader.readAsDataURL(file);
    }
  }

  onInputFocus(event: any) {
    event.target.style.borderColor = '#4299e1';
    event.target.style.backgroundColor = '#ffffff';
    event.target.style.boxShadow = '0 0 5px rgba(66, 153, 225, 0.4)';
  }

  onInputBlur(event: any) {
    const controlName = event.target.getAttribute('formControlName');
    const control = this.parentForm.get(controlName);
    event.target.style.borderColor = control?.invalid && control?.touched ? '#e53e3e' : '#cbd5e0';
    event.target.style.backgroundColor = '#f8fafc';
    event.target.style.boxShadow = 'none';
  }
}
