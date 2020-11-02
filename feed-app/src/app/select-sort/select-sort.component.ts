import { Component, OnInit } from '@angular/core';
import { FetchService } from '../fetch.service';

@Component({
  selector: 'app-select-sort',
  templateUrl: './select-sort.component.html',
  styleUrls: ['./select-sort.component.scss']
})
export class SelectSortComponent implements OnInit {
  value = '';
  constructor(private fetch: FetchService) { }

  ngOnInit(): void {
    const storedValue = localStorage.getItem('sort');
    if (storedValue) {
      this.value = storedValue;
      this.fetch.getFeedSort(this.value);
    }
  }

  onChange(event): void {
    this.value = event.target.value;
    console.log('VALUE', this.value);
    this.fetch.getFeedSort(this.value);
    localStorage.setItem('sort', this.value);
  }

}
