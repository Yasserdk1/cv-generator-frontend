import { HttpClient } from "@angular/common/http"; 
import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class CvService {

  private apiUrl = 'http://localhost:8080/api/cvs';

  constructor(private http: HttpClient) {}

  // Plus besoin de userId
  create(formData: FormData) {
    return this.http.post(`${this.apiUrl}/user`, formData);
  }

  getAll() {
    return this.http.get(this.apiUrl);
  }

  getByUser(userId: number) {
    return this.http.get(`${this.apiUrl}/user/${userId}`);
  }
}
