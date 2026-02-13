import { Component,ViewChild } from '@angular/core';
import { FormBuilder, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CvService } from '../../services/cv.service';
import { PersonalInfoComponent } from '../personal-info/personal-info.component';
import { UserInfoComponent } from '../user-info/user-info.component';

@Component({
  selector: 'app-cv-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,PersonalInfoComponent,UserInfoComponent],
  templateUrl: './cv-form.component.html',
  styleUrls: ['./cv-form.component.css']
})
export class CVFormComponent {

  cvForm: any;
  cv:any;

  constructor(private fb: FormBuilder, private cvService: CvService) {

    
    this.cvForm = this.fb.group({

      user: this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
       }),  
      adresse: ['', Validators.required],
      dateNaissance: ['', Validators.required],
      photo: [''],

      formations: this.fb.array([]),
      experiences: this.fb.array([]),
      competences: this.fb.array([]),
      langues: this.fb.array([])
    });
  }

  get formations() { return this.cvForm.get('formations') as FormArray; }
  get experiences() { return this.cvForm.get('experiences') as FormArray; }
  get competences() { return this.cvForm.get('competences') as FormArray; }
  get langues() { return this.cvForm.get('langues') as FormArray; }

  addFormation() {
    this.formations.push(this.fb.group({
      diplome: ['', Validators.required],
      etablissement: ['', Validators.required],
      dateDebut: [''],
      dateFin: [''],
      description: ['']
    }));
  }

  addExperience() {
    this.experiences.push(this.fb.group({
      poste: ['', Validators.required],
      entreprise: ['', Validators.required],
      dateDebut: [''],
      dateFin: [''],
      missions: ['']
    }));
  }

  addCompetence() {
    this.competences.push(this.fb.group({
      nom: ['', Validators.required],
      niveau: ['']
    }));
  }

  addLangue() {
    this.langues.push(this.fb.group({
      nom: ['', Validators.required],
      niveau: ['']
    }));
  }

  @ViewChild(PersonalInfoComponent) personalInfoComponent!: PersonalInfoComponent;

 submit() {
  if (this.cvForm.invalid) return;

  const formData = new FormData();

  // 1️⃣ JSON du CV
  formData.append(
    'cv',
    new Blob([JSON.stringify(this.cvForm.value)], { type: 'application/json' })
  );

  // 2️⃣ Photo
  if (this.personalInfoComponent?.photoFile) {
    formData.append('photo', this.personalInfoComponent.photoFile);

    // Convertir la photo en Base64 pour l'aperçu PDF
    const reader = new FileReader();
    reader.onload = () => {
      // Ajouter la photo en Base64 aux données CV pour PDF
      this.cv = { ...this.cvForm.value, photo: reader.result };
    };
    reader.readAsDataURL(this.personalInfoComponent.photoFile);
  } else {
    // Pas de photo
    this.cv = this.cvForm.value;
  }

  // 3️⃣ Envoi au backend
  this.cvService.create(formData).subscribe({
    next: () => alert('CV enregistré ✅'),
    error: err => console.error('Erreur CV', err)
  });
}

 // Méthode resetForm ajoutée ici
  resetForm() {
    if (confirm('Êtes-vous sûr de vouloir réinitialiser le formulaire ? Toutes les données seront perdues.')) {
      // Réinitialiser les FormArrays
      while (this.formations.length) {
        this.formations.removeAt(0);
      }
      while (this.experiences.length) {
        this.experiences.removeAt(0);
      }
      while (this.competences.length) {
        this.competences.removeAt(0);
      }
      while (this.langues.length) {
        this.langues.removeAt(0);
      }
      
      // Réinitialiser le formulaire principal
      this.cvForm.reset();
      
      // Réinitialiser les validators (optionnel)
      this.cvForm.get('user.nom')?.setValidators([Validators.required]);
      this.cvForm.get('user.prenom')?.setValidators([Validators.required]);
      this.cvForm.get('user.email')?.setValidators([Validators.required, Validators.email]);
      this.cvForm.get('adresse')?.setValidators([Validators.required]);
      this.cvForm.get('dateNaissance')?.setValidators([Validators.required]);
      
      // Mettre à jour la valeur et la validité
      this.cvForm.get('user.nom')?.updateValueAndValidity();
      this.cvForm.get('user.prenom')?.updateValueAndValidity();
      this.cvForm.get('user.email')?.updateValueAndValidity();
      this.cvForm.get('adresse')?.updateValueAndValidity();
      this.cvForm.get('dateNaissance')?.updateValueAndValidity();
      
      alert('Formulaire réinitialisé avec succès !');
    }
  }

  // Méthode pour générer un aperçu (optionnelle)
  preview() {
    if (this.cvForm.invalid) {
      alert('Veuillez remplir tous les champs obligatoires avant de prévisualiser.');
      return;
    }
    
    // Ouvrir une fenêtre d'aperçu ou afficher les données
    const cvData = this.cvForm.value;
    console.log('Aperçu du CV:', cvData);
    alert('Fonction d\'aperçu à implémenter - voir la console pour les données');
  }
  prepareCV() {
  // Vérifie si l'utilisateur a choisi une photo
   if (this.personalInfoComponent?.photoFile) {
    const reader = new FileReader();
    reader.onload = () => {
      this.cv = { ...this.cvForm.value, photo: reader.result };

      // Stocker dans localStorage
      localStorage.setItem('cv-data', JSON.stringify(this.cv));

      // Ouvrir la preview après un court délai
      setTimeout(() => {
        window.open('/cv-preview', '_blank');
      }, 100); // 100ms suffisent
    };
    reader.readAsDataURL(this.personalInfoComponent.photoFile);
  } else {
    this.cv = this.cvForm.value;
    localStorage.setItem('cv-data', JSON.stringify(this.cv));

    setTimeout(() => {
      window.open('/cv-preview', '_blank');
    }, 100);
  }
}
  exportPDF() {
  if (this.cvForm.invalid) {
    alert('Veuillez compléter le formulaire avant l’export PDF');
    return;
  }

  // Stockage temporaire
  localStorage.setItem('cv-data', JSON.stringify(this.cv));

  // Navigation vers aperçu ou ouverture modal
  window.open('/cv-preview', '_blank');
}


  // Méthode pour calculer la progression (optionnelle)
  calculateProgress(): number {
    // Calculez le pourcentage de complétion ici
    const totalFields = 15; // Exemple: nombre total de champs
    let filledFields = 0;
    
    // Vérifiez les champs de base
    const basicFields = ['user.nom', 'user.prenom', 'user.email', 'adresse', 'dateNaissance'];
    basicFields.forEach(field => {
      if (this.cvForm.get(field)?.value) {
        filledFields++;
      }
    });
    
    // Vérifiez les tableaux
    if (this.formations.length > 0) filledFields++;
    if (this.experiences.length > 0) filledFields++;
    if (this.competences.length > 0) filledFields++;
    if (this.langues.length > 0) filledFields++;
    
    return Math.round((filledFields / totalFields) * 100);
  }

  


}
