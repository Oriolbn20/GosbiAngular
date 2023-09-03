import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../Services/api.service';
import { Subscription, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-episode-details',
  templateUrl: './episode-details.component.html',
  styleUrls: ['./episode-details.component.scss']
})
export class EpisodeDetailsComponent {
  podcastId!: string | null;
  episodeId!: string | null;
  podcast: any;
  episode: any;
  subscription!: Subscription;

  constructor(private route: ActivatedRoute, private apiService: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.subscription = this.route.paramMap.pipe(
      switchMap(params => {
        this.podcastId = params.get('podcastId');
        this.episodeId = params.get('episodeId');

        // Check if there is the podcast in the localStorage
        const podcastData = localStorage.getItem('podcastData');
        const expiration = localStorage.getItem('podcastDataExpiration');

        if (podcastData && expiration && Date.now() < parseInt(expiration)) {
          const cachedPodcastData = JSON.parse(podcastData);
          this.podcast = cachedPodcastData.find((p: { id: { attributes: { [x: string]: string | null; }; }; }) => {
            return p.id.attributes['im:id'] === this.podcastId
          });
        } else {
          // Data is not in cache or is expired so return to PodcastList
          this.router.navigateByUrl('/');
        }

        // Check if there's a stored podcast details in localStorage
        const podcastDetailsData = localStorage.getItem('podcastDetailsData');
        
        if (podcastDetailsData) {
          const storedPodcastDetails = JSON.parse(podcastDetailsData);
          const cachedPodcastDetails = storedPodcastDetails[this.podcastId as string];
          if (cachedPodcastDetails) {
            // If found in the cache, use it
            const podcastDetails = cachedPodcastDetails;
            this.episode = podcastDetails;
            return of(cachedPodcastDetails); // Return an observable with the cached data
          }
        } // If not found in the cache or no cached data available, fetch from the API
        return this.apiService.getPodcastDetails(this.podcastId as string);
      })
    ).subscribe({
      next: (details) => {
        const podcastDetails = details;
        this.episode = podcastDetails.results.find((e: { trackId: string | null; }) => {
          return e.trackId == this.episodeId;
        });

        // Update or create the object that contains all of podcast details in localStorage
        const podcastDetailsData = localStorage.getItem('podcastDetailsData');
        let storedPodcastDetails = podcastDetailsData ? JSON.parse(podcastDetailsData) : {};

        // Replace the existing entry in the object
        storedPodcastDetails[this.podcastId as string] = podcastDetails;

        // Cache the updated object in localStorage
        localStorage.setItem('podcastDetailsData', JSON.stringify(storedPodcastDetails));
      },
      error: (error) => {
        console.error('Error fetching podcast details:', error);
      }
    })
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
