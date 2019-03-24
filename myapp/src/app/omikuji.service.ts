import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class OmikujiService {

  box: string[] = [
    '大吉',
    '中吉',
    '吉',
    '小吉'
  ];

  constructor(private http: HttpClient) {
  }

  draw(): string {
    return this.box[Math.floor(Math.random() * this.box.length)];
  }

  getDatas (): Observable<string[]> {
    return this.http.get<string[]>('http://localhost:3000/api/v1/user/');
  }

}
