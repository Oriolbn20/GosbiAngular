import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url = 'https://itunes.apple.com/';
  constructor(private http: HttpClient) {
  }

  get100Popular() {
    const reqOptions = this.createHeader();
    return this.http.get(`${this.url}us/rss/toppodcasts/limit=100/genre=1310/json`)
  }

  private createHeader() {
    const header = {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Accept-Control-Allow-Headers': 'Origin,Content-Type,Accept,Authorization',
    }
    return { headers: new HttpHeaders(header) }
  }
}
