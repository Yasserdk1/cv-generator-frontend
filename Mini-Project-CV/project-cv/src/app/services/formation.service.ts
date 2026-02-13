import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Formation } from '../models/formation.model';

@Injectable({ providedIn: 'root' })
export class FormationService {

  private apiUrl = 'http://localhost:8080/api/formations';

  constructor(private http: HttpClient) {}

  create(cvId: number, formation: Formation): Observable<Formation> {
    return this.http.post<Formation>(
      `${this.apiUrl}/cv/${cvId}`,
      formation
    );
  }

  getByCv(cvId: number): Observable<Formation[]> {
    return this.http.get<Formation[]>(`${this.apiUrl}/cv/${cvId}`);
  }
}
