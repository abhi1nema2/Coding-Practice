import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FetchService {
  store: any;
  storeLoaded: Promise<boolean>;
  lastCall: string;
  acitvePage = 0;
  count = Promise.resolve(false);

  constructor(private http: HttpClient) { }

  get storeData(): any {
    return this.store;
  }

  get isStoreLoaded(): Promise<boolean> {
    return this.storeLoaded;
  }

  get isCountAvaliable(): Promise<boolean> {
    return this.count;
  }

  get getPage(): number {
    return this.acitvePage;
  }

  set setPage(page) {
    this.acitvePage = page;
  }

  setLocalStorage(): void {
    localStorage.setItem('url', this.lastCall);
  }

  getNextPage(): any {
    let previousCall: any;
    if (this.lastCall) {
      previousCall = this.lastCall;
    } else {
      previousCall = localStorage.getItem('url');
    }
    const newURL = this.lastCall.split('/');
    newURL[2] = this.acitvePage.toString();
    return this.http.get(newURL.join('/')).subscribe((data: any) => {
      this.store = data;
      this.storeLoaded = Promise.resolve(true);
      this.count = Promise.resolve(true);
    });
  }

  getAllFeed(page = 0): any {
    return this.http.get(`/api/${page}`).subscribe((data: any) => {
      this.store = data;
      this.lastCall = `/api/${page}`;
      this.setLocalStorage();
      this.storeLoaded = Promise.resolve(true);
      this.count = Promise.resolve(true);
    });
  }

  getFeedByString(stringValue, page = 0): any {
    return this.http.get(`/api/${page}/${stringValue}`).subscribe((data: any) => {
      this.store = data;
      this.lastCall = `/api/${page}/${stringValue}`;
      this.setLocalStorage();
      this.acitvePage = page;
      localStorage.setItem('activePage', page.toString());
      this.storeLoaded = Promise.resolve(true);
      this.count = Promise.resolve(true);
    });
  }

  getFeedSort(value): any {
    let previousCall: any;
    if (this.lastCall) {
      previousCall = this.lastCall;
      previousCall = previousCall.split('/');
      previousCall[2] = this.acitvePage.toString();
      previousCall = previousCall.join('/');
    } else {
      previousCall = localStorage.getItem('url');
    }

    return this.http.get(`/sort/${value}${previousCall}`).subscribe((data: any) => {
      this.store = data;
      this.storeLoaded = Promise.resolve(true);
      this.count = Promise.resolve(true);
    });
  }

  getCount(): any {
    return this.http.get(`/api-count`);
  }
}
