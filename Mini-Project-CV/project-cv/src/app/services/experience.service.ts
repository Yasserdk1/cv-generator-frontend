import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class ExperienceService {

  private api = 'http://localhost:8080/api/experiences';

  constructor(private http: HttpClient) {}

  add(exp: any) {
    return this.http.post(this.api, exp);
  }

  getByCv(cvId: number) {
    return this.http.get(`${this.api}/cv/${cvId}`);
  }
}
