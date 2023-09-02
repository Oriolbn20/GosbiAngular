import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, of, switchMap } from 'rxjs';
import { ApiService } from '../../Services/api.service';

@Component({
  selector: 'app-podcast-details',
  templateUrl: './podcast-details.component.html',
  styleUrls: ['./podcast-details.component.scss']
})
export class PodcastDetailsComponent {
  podcastId: string | null = '';
  podcast: any;
  podcastDetails: any;
  podcastEpisodes: any;
  subscription!: Subscription;


  constructor(private route: ActivatedRoute, private apiService: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.subscription = this.route.paramMap.pipe(
      switchMap(params => {
        this.podcastId = params.get('podcastId');

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
          const cachedPodcastDetails = storedPodcastDetails[this.podcastId as string]
          if (cachedPodcastDetails) {
            // If found in the cache, use it
            this.podcastDetails = cachedPodcastDetails;
            return of(cachedPodcastDetails); // Return an observable with the cached data
          }
        } // If not found in the cache or no cached data available, fetch from the API
        return this.apiService.getPodcastDetails(this.podcastId as string);
      })
    ).subscribe({
      next: (details) => {
        this.podcastDetails = details;
        // Update or create the object that contains all of podcast details in localStorage
        const podcastDetailsData = localStorage.getItem('podcastDetailsData');
        let storedPodcastDetails;
        if (podcastDetailsData) {
          storedPodcastDetails = JSON.parse(podcastDetailsData)
        } else {
          storedPodcastDetails = {}
        }

        // Replace the existing entry in the object
        storedPodcastDetails[this.podcastId as string] = this.podcastDetails;

        // Cache the updated object in localStorage
        const jsonString = JSON.stringify(storedPodcastDetails);
        localStorage.setItem('podcastDetailsData', jsonString);
      },
      error: (error) => {
        console.error('Error fetching podcast details:', error);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
