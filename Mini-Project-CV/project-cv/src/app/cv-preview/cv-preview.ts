import { CommonModule } from '@angular/common';
import { Component, OnInit, NgZone } from '@angular/core';
import html2pdf from 'html2pdf.js';

@Component({
  selector: 'app-cv-preview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cv-preview.html',
  styleUrls: ['./cv-preview.css']
})
export class CvPreviewComponent implements OnInit {

  cv: any;

  constructor(private zone: NgZone) {}

  ngOnInit(): void {
    const data = localStorage.getItem('cv-data');
    if (!data) return;

    this.cv = JSON.parse(data);

    // Attendre que Angular soit stable
    this.zone.onStable.subscribe(() => {
      // 🔹 Générer ET télécharger le PDF
      this.generatePDF();
    });
  }

  generatePDF() {
    const element = document.getElementById('cv-pdf');
    if (!element) return;

    html2pdf()
      .from(element)
      .set({
        margin: 0.5,
        filename: 'mon-cv.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'cm', format: 'a4', orientation: 'portrait' }
      })
      .save()
      .then(() => {
        // 🔹 Optionnel : nettoyer localStorage après téléchargement
        localStorage.removeItem('cv-data');
      });
  }
  downloadPDF() {
  const element = document.getElementById('cv-pdf');
  if (!element) return;

  html2pdf()
    .from(element)
    .set({
      margin: 0.5,
      filename: 'mon-cv.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'cm', format: 'a4', orientation: 'portrait' }
    })
    .save();
}


}
