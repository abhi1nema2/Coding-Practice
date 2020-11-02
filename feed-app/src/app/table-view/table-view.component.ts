import { Component, OnInit } from '@angular/core';
import { FetchService } from '../fetch.service';

@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.scss']
})
export class TableViewComponent implements OnInit {
  store: any;
  constructor(private fetch: FetchService) { }

  ngOnInit(): void {
    this.store = this.fetch.storeData;
  }

}
