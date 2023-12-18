import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KycService {

  constructor(
    private http:HttpClient
  ) { }

  headers = new HttpHeaders({
    'Client': 'Tierno Commando',
    });
    
 options = { 
  // headers: this.headers
};

  getKycLevelDocuments(level: number, country: string): Observable<any[]> {
    // level = level + 1;
    return this.http.get<any>('/kyc-levels').pipe(
      map((response: any) => {
        const documentTypes = response.data.find(
          (data: any) => data.kycLevel == level && data.country == country
        );
        console.log(documentTypes);
        return documentTypes?.kycLevelDocuments;
      })
    );
  }
  submitAgent(payload: any) {
    return this.http.post('/agent/manual-kyc-requests', payload, this.options);
  }
}
