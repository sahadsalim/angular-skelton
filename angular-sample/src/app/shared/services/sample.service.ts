import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SampleService {

  constructor(private http: HttpClient) { }
    getApi(url: string, options?: any) {
      return this.http.get(url, options);
    }
    public deepCopy(data:any){
      try {
        return JSON.parse(JSON.stringify(data));
      } catch (error) {
        return null;
      }
    }
}
