import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from '../../Services/api.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-podcast-list',
  templateUrl: './podcast-list.component.html',
  styleUrls: ['./podcast-list.component.scss']
})
export class PodcastListComponent implements OnInit, OnDestroy {

  podcasts: any;
  searchText: string = '';
  subscription!: Subscription;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    // Check if data is in localStorage and not expired
    const cachedData = localStorage.getItem('podcastData');
    const expiration = localStorage.getItem('podcastDataExpiration');

    if (cachedData && expiration && Date.now() < parseInt(expiration)) {
      // Data is in cache and not expired, use it
      this.podcasts = JSON.parse(cachedData);
      console.log("CACHE");
      console.log(this.podcasts);
    } else {
      // Data is not in cache or expired, get it from the api service to get the 100 popular podcasts and saves it into a variable
      this.subscription = this.apiService.get100Popular().subscribe((response: any) => {
        this.podcasts = response.feed.entry;
        console.log(this.podcasts);

        // Cache the data in localStorage for a day
        localStorage.setItem('podcastData', JSON.stringify(this.podcasts));
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + 1); // Set expiration to one day from now
        localStorage.setItem('podcastDataExpiration', expirationDate.getTime().toString());
      });
    }
  }

  get filteredPodcasts(): any[] {
    if (!this.searchText.trim()) {
      return this.podcasts;
    }

    const lowerCaseSearch = this.searchText.toLowerCase();
    return this.podcasts.filter((podcast: { [x: string]: { label: string; }; }) =>
      podcast['im:name'].label.toLowerCase().includes(lowerCaseSearch)
      || podcast['im:artist'].label.toLowerCase().includes(lowerCaseSearch))
  }

  ngOnDestroy(): void {
    // When the component is destroyed unsubscribes from the previous request
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
