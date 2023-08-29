import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PodcastListComponent } from './Project/Components/podcast-list/podcast-list.component';
import { PodcastDetailsComponent } from './Project/Components/podcast-details/podcast-details.component';
import { EpisodeDetailsComponent } from './Project/Components/episode-details/episode-details.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    PodcastListComponent,
    PodcastDetailsComponent,
    EpisodeDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
