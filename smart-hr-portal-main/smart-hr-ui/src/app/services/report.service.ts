import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  private api = '/api/reports';

  constructor(private http: HttpClient) {}

  upload(fileData: FormData): Observable<any> {
    return this.http.post(this.api + '/upload', fileData);
  }

}
