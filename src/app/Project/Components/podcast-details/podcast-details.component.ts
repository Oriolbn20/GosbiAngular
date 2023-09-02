import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { ApiService } from '../../Services/api.service';

@Component({
  selector: 'app-podcast-details',
  templateUrl: './podcast-details.component.html',
  styleUrls: ['./podcast-details.component.scss']
})
export class PodcastDetailsComponent {
  podcastId!: string | null;
  podcast: any;
  podcastDetails: any;
  podcastEpisodes: any;


  constructor(private route: ActivatedRoute, private apiService: ApiService) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
    switchMap(params => {
      this.podcastId = params.get('podcastId');
      const cachedData = localStorage.getItem('podcastData');
      if (cachedData) {
        this.podcast = JSON.parse(cachedData)
        .find((p: { id: { attributes: { [x: string]: string | null; }; }; }) => {
          return p.id.attributes['im:id'] === this.podcastId;
        });
      }
      return this.apiService.getPodcastDetails(this.podcastId as string);
      })
    ).subscribe({
      next: (details) => {
        this.podcastDetails = details;
        console.log(this.podcastDetails);
      },
      error: (error) => {
        console.error('Error fetching podcast details:', error);
      }
    });
  }
}
