import { Component, OnInit } from '@angular/core';
import { FetchService } from '../fetch.service';

@Component({
  selector: 'app-input-search',
  templateUrl: './input-search.component.html',
  styleUrls: ['./input-search.component.scss']
})
export class InputSearchComponent implements OnInit {
  value = '';
  constructor(private fetch: FetchService) { }

  ngOnInit(): void {
    const storedValue = localStorage.getItem('search');
    if (storedValue) {
      this.value = storedValue;
      this.fetch.getFeedByString(this.value, 0);
    }
  }

  onChange(event): void {
    event.preventDefault();
    this.value = event.target.value;
    this.fetch.getFeedByString(this.value, 0);
    localStorage.setItem('search', this.value);
  }

}
