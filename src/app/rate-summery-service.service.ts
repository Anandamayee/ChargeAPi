import { Injectable } from '@angular/core';
import { Observable } from '../../node_modules/rxjs';
import { HttpClient } from '../../node_modules/@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RateSummeryServiceService {

  constructor(private http:HttpClient) { }

  getLegDetails() :Observable<{}>{
    let url="https://api.myjson.com/bins/1glgyd";
    return this.http.get(url);
  }
}
