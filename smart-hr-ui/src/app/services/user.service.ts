import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private api = '/api/users/profile';

  constructor(private http: HttpClient) {}

  getProfile(): Observable<any> {
    return this.http.get<any>(this.api);
  }

  updateProfile(data: any): Observable<any> {
    return this.http.put<any>(this.api, data);
  }

}
