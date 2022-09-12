import { Injectable, Inject } from "@angular/core";
import { DOCUMENT, Location } from "@angular/common";
import { CookieService } from "ngx-cookie-service";



@Injectable({
  providedIn: "root"
})
export class RiskifiedBeaconServiceLegacyService {
  private arrPageViews: string[];
  constructor(
    // @Inject("$rootScope") private $rootScope: angular.IRootScopeService,
    @Inject(DOCUMENT) private document: Document,
    private cookieService: CookieService,
    private location: Location,
    
  ) {
    /*
     * Array containing pages for which data needs to be collected for Riskified Fraudcheck mechanism.
     */
    this.arrPageViews = [
      "HOME",
      "PLP",
      "PDP",
      "MY_ACCOUNT",
      "MY_ACCOUNT_PROFILE",
      "CART"
    ];
    /*
     * Flag to identify whether the "Riskified Storefront Beacon" has been loaded.
     * Values are as mentioned below.
     * no - Beacon has not yet started loading.
     * wait - Beacon has started loading, but not yet completed successfully.
     * done - Beacon has been loaded successfully.
     */
    window.riskifiedScriptLoaded = "no";

    this.init();
    // this.$rootScope.$on(
    //   "$routeChangeSuccess",
    //   this.routeChangeSuccessHandler.bind(this)
    // );
  }

  /**
   * Method to check Toggle, Cookie value and initialize loading of Riskified Storefront Beacon.
   */
  private checkToggleAndLoadBeacon() {
   
        this.init();
      
  }

  /**
   * Method to fetch Session ID from Cookie, update flag and load Riskified Storefront Beacon.
   */
  private init() {
    let session_id = this.cookieService.get("ris_cookie");
    if (!session_id) {
      // return console.error(
      //   "ris_cookie not set, aborting RiskifiedBeaconService.init"
      // );
      let riskifiedScriptElement = this.document.createElement("script");
    riskifiedScriptElement.type = "text/javascript";
    riskifiedScriptElement.async = true;
    riskifiedScriptElement.src = `https://beacon.riskified.com?shop=${this.document.domain}&sid=${session_id}`;
    riskifiedScriptElement.onload = () => {
      window.riskifiedScriptLoaded = "done";
      console.debug("riskified beacon script loaded successfully");
    };
    }
    window.riskifiedScriptLoaded = "wait";
    let riskifiedScriptElement = this.document.createElement("script");
    riskifiedScriptElement.type = "text/javascript";
    riskifiedScriptElement.async = true;
    riskifiedScriptElement.src = `https://beacon.riskified.com?shop=${this.document.domain}&sid=${session_id}`;
    riskifiedScriptElement.onload = () => {
      window.riskifiedScriptLoaded = "done";
      console.debug("riskified beacon script loaded successfully");
    };
    let firstScriptElement = this.document.getElementsByTagName("script")[0];
    firstScriptElement.parentNode!.insertBefore(
      riskifiedScriptElement,
      firstScriptElement
    );
  }

  private routeChangeSuccessHandler(
    // _event: angular.IAngularEvent,
    current: any,
    previous: any
  ) {
    let isValidPagetype = this.arrPageViews.find(
      val => val === current.$$route.pageType
    );
    if (
      isValidPagetype &&
      window.riskifiedScriptLoaded === "no" &&
      !window.RISKX
    ) {
      this.init();
    } else if (
      isValidPagetype &&
      previous &&
      window.riskifiedScriptLoaded === "done" &&
      window.RISKX
    ) {
      console.debug(`RISKX.go("${this.location.path()}")`);
      window.RISKX.go(this.location.path());
    } else if (
      isValidPagetype &&
      previous &&
      window.riskifiedScriptLoaded === "done" &&
      !window.RISKX
    ) {
      console.warn(
        "riskifiedScriptLoaded === 'done' but RISKX.go still undefined, re-attempting RiskifiedBeaconService.init"
      );
      this.init();
    } else if (
      isValidPagetype &&
      previous &&
      window.riskifiedScriptLoaded === "wait"
    ) {
      console.debug("Riskified script still loading, skipping RISKX.go");
    } else if (isValidPagetype && previous && !window.riskifiedScriptLoaded) {
      console.warn(
        "riskifiedScriptLoaded is undefined, re-attempting RiskifiedBeaconService.init"
      );
      this.init();
    } else if (isValidPagetype && !previous) {
      console.debug("first page view, skipping RISKX.go");
    } else {
      console.debug(
        "page type not in {'HOME', 'PLP', 'PDP', 'My Account Dashboard','My Account Profile', 'CART'} - skipping RISKX.go"
      );
    }
  }
}
