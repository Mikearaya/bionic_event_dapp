import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { EventsListComponent } from "./events-list/events-list.component";
import { EventDetailComponent } from "./event-detail/event-detail.component";
import { EventFormComponent } from "./event-form/event-form.component";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { EthereumModule } from "./ethereum/ethereum.module";

@NgModule({
  declarations: [
    AppComponent,

    EventsListComponent,
    EventDetailComponent,
    EventFormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    EthereumModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
