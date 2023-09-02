import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PodcastListComponent } from './Project/Components/podcast-list/podcast-list.component';
import { PodcastDetailsComponent } from './Project/Components/podcast-details/podcast-details.component';
/* import { EpisodeDetailsComponent } from './Project/Components/episode-details/episode-details.component'; */

const routes: Routes = [
  {
    path: '',
    component: PodcastListComponent
  },
  {
    path: 'podcast/:podcastId',
    component: PodcastDetailsComponent /*,
    children: [
      {
        path: 'episode/:episodeid',
        component: EpisodeDetailsComponent
      }
    ]*/
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
