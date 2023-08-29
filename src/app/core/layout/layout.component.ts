import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  //** Variable for store splited text from URL */
  breadcrumbs = [];

  loggedUserDetails;

  breakpoints = Breakpoints;
  isMobileDevice = false;

  constructor(
    public router: Router,
    private _location: Location,
    private responsive: BreakpointObserver
  ) {

    this.loggedUserDetails = JSON.parse(localStorage.getItem('userDetails'));

    // if(!this.loggedUserDetails.is_email_verified && this.loggedUserDetails.role === 5) {
    //   this.router.navigate(['/user-verification']);
    // }

    //** After Route change split url text and assign to breadcrumbs variable */
    this.router.events.subscribe(a => {
      this.breadcrumbs = this.splitTextFromUrl(this.router.url.split('?')[0]), 'SPLITTED';
    });
  }

  //** Function for navigate previous route */
  backClicked() {
    this._location.back();
  }

  //** Function for remove '/' and split the url */
  splitTextFromUrl(url: string): string[] {
    const splitUrl = url.split('/');
    const text = splitUrl.filter(segment => segment !== '');
    return text;
  }

  //** Function for remove '-' from the text */
  removeHyphen(input: string): string {
    return input.replace(/-/g, ' ');
  }

  ngOnInit(): void {
    this.responsive.observe(Breakpoints.XSmall)
      .subscribe(result => {
        console.log(result.matches, 'DEVICE....')
        if (result.matches) {
          this.isMobileDevice = true;
        }

      });
  }
}