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
    return this.http.get(`${this.url}us/rss/toppodcasts/limit=100/genre=1310/json`)
  }
}
