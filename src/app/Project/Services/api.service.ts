import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url = `https://api.allorigins.win/get?url=https://itunes.apple.com/`;
  constructor(private http: HttpClient) {
  }

  get100Popular() {
    return this.http.get(`${this.url}us/rss/toppodcasts/limit=100/genre=1310/json`);
  }

  getPodcastDetails(podcastId: string) {
    return this.http.get(`${this.url}lookup?id=${podcastId}&media=podcast&entity=podcastEpisode&limit=20`);
  }
}
