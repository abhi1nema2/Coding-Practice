import { Component, OnInit } from '@angular/core';
import { FetchService } from './fetch.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'feed-app';

  constructor(public fetch: FetchService) {}

  onSubmit(event): boolean {
    event.preventDefault();
    console.log('event submit');
    return false;
  }

  ngOnInit(): void {
    if (typeof localStorage.getItem('url') === 'undefined') {
      this.fetch.getAllFeed();
    }
  }
}
