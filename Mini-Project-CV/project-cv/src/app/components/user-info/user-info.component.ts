import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-info',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
   <div *ngIf="userForm" [formGroup]="userForm" 
         style="display: flex; flex-direction: column; gap: 16px; padding: 24px; background: white; border-radius: 12px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08); border: 1px solid #e1e5e9; max-width: 420px;">

      <div style="display: flex; flex-direction: column; gap: 8px;">
        <label style="font-weight: 500; color: #2d3748; font-size: 14px;">Nom :</label>
        <input type="text" formControlName="nom" placeholder="Votre nom" 
               style="padding: 10px 12px; border-radius: 8px; border: 1px solid #cbd5e0; transition: border-color 0.2s, background-color 0.2s; background: #f8fafc; font-size: 14px; outline: none;"
               [style.border-color]="userForm.get('nom')?.invalid && userForm.get('nom')?.touched ? '#e53e3e' : '#cbd5e0'"
               (focus)="onInputFocus($event, 'nom')"
               (blur)="onInputBlur($event, 'nom')">
      </div>

      <div style="display: flex; flex-direction: column; gap: 8px;">
        <label style="font-weight: 500; color: #2d3748; font-size: 14px;">Prénom :</label>
        <input type="text" formControlName="prenom" placeholder="Votre prénom"
               style="padding: 10px 12px; border-radius: 8px; border: 1px solid #cbd5e0; transition: border-color 0.2s, background-color 0.2s; background: #f8fafc; font-size: 14px; outline: none;"
               [style.border-color]="userForm.get('prenom')?.invalid && userForm.get('prenom')?.touched ? '#e53e3e' : '#cbd5e0'"
               (focus)="onInputFocus($event, 'prenom')"
               (blur)="onInputBlur($event, 'prenom')">
      </div>

      <div style="display: flex; flex-direction: column; gap: 8px;">
        <label style="font-weight: 500; color: #2d3748; font-size: 14px;">Email :</label>
        <input type="email" formControlName="email" placeholder="exemple@email.com"
               style="padding: 10px 12px; border-radius: 8px; border: 1px solid #cbd5e0; transition: border-color 0.2s, background-color 0.2s; background: #f8fafc; font-size: 14px; outline: none;"
               [style.border-color]="userForm.get('email')?.invalid && userForm.get('email')?.touched ? '#e53e3e' : '#cbd5e0'"
               (focus)="onInputFocus($event, 'email')"
               (blur)="onInputBlur($event, 'email')">
      </div>
    </div>
  `
})
export class UserInfoComponent {
  @Input() parentForm!: FormGroup;

  // ✅ Getter sécurisé
  get userForm(): FormGroup | null {
    return this.parentForm.get('user') as FormGroup | null;
  } 
   onInputFocus(event: any, controlName: string) {
    event.target.style.borderColor = '#4299e1';
    event.target.style.backgroundColor = '#ffffff';
  }

  onInputBlur(event: any, controlName: string) {
    const userForm = this.userForm;
    if (userForm) {
      const control = userForm.get(controlName);
      event.target.style.borderColor = control?.invalid && control?.touched ? '#e53e3e' : '#cbd5e0';
      event.target.style.backgroundColor = '#f8fafc';
    }
  }
}
