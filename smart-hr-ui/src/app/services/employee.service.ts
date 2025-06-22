import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private url = 'http://localhost:8082/api/v2/emp/employee';

  constructor(private http: HttpClient) {}

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}`);
  }  

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post<any>(`${this.url}/create`, data);
  }

  update(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.url}/${id}`, data);
  }

  getAllManagers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}/getAllManager`);
  }  

  uploadReport(employeeId: number, formData: FormData): Observable<any> {
    return this.http.post(`http://localhost:8082/api/v2/emp/file/upload/${employeeId}`, formData);
  }  
  

}
