import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CookieService } from 'ngx-cookie-service';
import { RiskifiedBeaconServiceLegacyService } from './vendor/riskified/riskified-beacon.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    [RiskifiedBeaconServiceLegacyService],
    [CookieService]
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
