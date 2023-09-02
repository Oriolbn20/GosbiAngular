import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PodcastListComponent } from './Project/Components/podcast-list/podcast-list.component';
import { PodcastDetailsComponent } from './Project/Components/podcast-details/podcast-details.component';
import { EpisodeDetailsComponent } from './Project/Components/episode-details/episode-details.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { PodcastCardComponent } from './Project/Components/podcast-card/podcast-card.component';

@NgModule({
  declarations: [
    AppComponent,
    PodcastListComponent,
    PodcastDetailsComponent,
    EpisodeDetailsComponent,
    PodcastCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
