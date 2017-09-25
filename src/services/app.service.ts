import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class AppService {

  constructor( private http: Http) {
  }
  private baseUrl = 'http://agl-developer-test.azurewebsites.net/people.json';

  extractData(res: any) {
    const response = res.json();
    return response;
  }
  // call the api to consume people.json
  fetchPeopleJSON(): Observable<any> {
    // ...using get request
    return this.http.get(this.baseUrl)
    // ...and calling .json() on the response to return data
      .map(this.extractData)
      .catch(
        error => {
          throw error ;
        });
  }
}
