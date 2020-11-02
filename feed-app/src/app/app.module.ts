import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { InputSearchComponent } from './input-search/input-search.component';
import { SelectSortComponent } from './select-sort/select-sort.component';
import { FeedCardComponent } from './feed-card/feed-card.component';
import { TableViewComponent } from './table-view/table-view.component';
import { PaginationComponent } from './pagination/pagination.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    InputSearchComponent,
    SelectSortComponent,
    FeedCardComponent,
    TableViewComponent,
    PaginationComponent
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
