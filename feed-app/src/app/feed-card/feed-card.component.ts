import { Component, OnInit } from '@angular/core';
import { FetchService } from '../fetch.service';

@Component({
  selector: 'app-feed-card',
  templateUrl: './feed-card.component.html',
  styleUrls: ['./feed-card.component.scss']
})
export class FeedCardComponent implements OnInit {
  store: any;
  constructor(private fetch: FetchService) { }

  ngOnInit(): void {
    this.store = this.fetch.storeData;
  }

}
