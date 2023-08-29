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
    this.subscription = this.apiService.get100Popular().subscribe((response) => {
      this.podcasts = response;
      console.log(response);
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
