import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './appRouting.module';
import { AppComponent } from './app.component';
import { InMemOwnerService } from './services/inMemoryApi/in-memory-api.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OwnersTableComponent } from './owners-table/owners-table.component';
import { OwnerDataComponent } from './owner-data/owner-data.component';

@NgModule({
  declarations: [
    AppComponent,
    OwnersTableComponent,
    OwnerDataComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemOwnerService, { delay: 0 }),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
