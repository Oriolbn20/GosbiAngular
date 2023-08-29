import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from '../../Services/api.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-podcast-list',
  templateUrl: './podcast-list.component.html',
  styleUrls: ['./podcast-list.component.scss']
})
export class PodcastListComponent implements OnInit, OnDestroy  {

  podcasts: any;
  subscription!: Subscription;

  constructor(private apiService: ApiService) {}
  
  ngOnInit(): void {
    // Starts a subscription to the api service to get the 100 popular podcasts and saves it into a variable
    this.subscription = this.apiService.get100Popular().subscribe((response: any) => {
      this.podcasts = response.feed.entry;
      console.log(this.podcasts);
      console.log(this.podcasts[0])
    })
  }

  ngOnDestroy(): void {
    // When the component is destroyed unsubscribes from the previous request
    this.subscription.unsubscribe();
  }
}
