import { Component, OnInit } from '@angular/core';
import { FetchService } from '../fetch.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  count = 0;
  pages = 0;
  pageButtons = [];
  constructor(private fetch: FetchService) { }

  ngOnInit(): void {
    this.fetch.getCount().subscribe((data: any) => {
      this.count = data[0]['FOUND_ROWS()'];
      this.pages = Math.floor(this.count / 6);
      for (let i = 0; i < this.pages; i++) {
        this.pageButtons.push(i);
      }
      console.log('COUNT', this.count);
    });

    const storedValue = localStorage.getItem('activePage');
    if (storedValue) {
      this.fetch.setPage = Number(storedValue);
    }
  }

  onClick(pageNo): void {
    this.fetch.setPage = pageNo;
    localStorage.setItem('activePage', pageNo);
    this.fetch.getNextPage();
  }

}
