import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class UsersService {
  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(private http: Http) {}

  getUsers(): Observable<any> {
    const url = 'http://localhost:4567/users';
    return this.http
      .get(url)
      .map(res => res.json());
  }

  addUser(user): Observable<any> {
    const url = 'http://localhost:4567/users';
    return this.http
      .post(url, JSON.stringify({ name: user }), { headers: this.headers })
      .retryWhen(error => {
        return error
           .flatMap((error: any) => {
              if (error.status  === 422) {
                return Observable.of(error.status).delay(5000)
              }
              return Observable.throw({error: 'No retry'});
           })
           .take(5)
           .concat(Observable.throw({error: 'Sorry, there was an error (after 5 retries)'}));
      })
      .map(res => res.json())
  }
}
