import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService { 
  private url = 'http://localhost:8083/api/v3/dep/department';

  constructor(private http: HttpClient) {}

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}`);
  }  

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post<any>(`${this.url}`, data);
  }

  update(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.url}/${id}`, data);
  }
}
