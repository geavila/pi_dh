import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; //imports aqui
import { Observable, ObservedValueOf } from 'rxjs';
import { Tutorial } from '../models/tutorial.model';

const baseUrl = 'http://localhost:8080/api/tutorials'; // aqui estou "linkando" o front com o back

@Injectable({
  providedIn: 'root'
})
export class TutorialService {

  constructor(private http: HttpClient) { }

  //service == "equivale a controller no backend"
  getAll(): Observable<Tutorial[]> {

    return this.http.get<Tutorial[]>(baseUrl);

  } //observando uma lista de tutoriais


  get(id: any): Observable<Tutorial> {
    return this.http.get(`${baseUrl}/${id}`);
  }


  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  findByTitle(title: any): Observable<Tutorial[]> {
    return this.http.get<Tutorial[]>(`${baseUrl}?title=${title}`);
  }
}
