import { Component, Renderer2 } from '@angular/core';
import { DatadomeIntegrationService } from './vendor/datadome/datadome-integration.service';
import { RiskifiedBeaconServiceLegacyService } from './vendor/riskified/riskified-beacon.service';

const SCRIPT_PATH = '/src/app/vendor/datadome/datadome-tag.js';
declare let gapi: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'third-pary-integrations';
 
  constructor(
    private riskifiedLegacyService: RiskifiedBeaconServiceLegacyService,
    private datadomeService: DatadomeIntegrationService,
    private renderer: Renderer2,
  ){

  }

  ngOnInit(): void {
    const scriptElement = this.datadomeService.loadJsScript(this.renderer, SCRIPT_PATH);
    scriptElement.onload = () => {
     console.log('Datdome script loaded');
      console.log(gapi);

      // Load the JavaScript client library.
      // (the init() method has been omitted for brevity)
      gapi.load('client', this.init);
    }
    scriptElement.onerror = () => {
      console.log('Could not load the Google API Script!');
    }

   
  }
  init(arg0: string, init: any) {
    throw new Error('Method not implemented.');
  }
}
