import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ServiceUtil } from '../utils/service-util'
import 'rxjs/Rx';
import 'rxjs/add/observable/throw';

@Injectable()
export class LambdaService {
    headers: Headers = new Headers({
        'Content-Type': 'application/json',
        Accept: 'application/json'
    });
    api_url: string = 'https://ske7g6ydt9.execute-api.us-east-1.amazonaws.com/dev';

    constructor(private http: Http) {}

    get(path: string): Observable<any> {
        return this.http.get(`${this.api_url}${path}`, { headers: this.headers })
        .map(ServiceUtil.checkForError)
        .catch(err => Observable.throw(err))
        .map(ServiceUtil.getJson)
    }

    post(path: string, body): Observable<any> {
        return this.http.post(
        `${this.api_url}${path}`,
        JSON.stringify(body),
        { headers: this.headers }
        )
        .map(ServiceUtil.checkForError)
        .catch(err => Observable.throw(err))
        .map(ServiceUtil.getJson)
    }

    delete(path: string): Observable<any> {
        return this.http.delete(
        `${this.api_url}${path}`,
        { headers: this.headers }
        )
        .map(ServiceUtil.checkForError)
        .catch(err => Observable.throw(err))
        .map(ServiceUtil.getJson)
    }    
}