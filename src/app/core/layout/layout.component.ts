import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {

  //** Variable for store splited text from URL */
  breadcrumbs = [];

  constructor(
    public router: Router,
    private _location: Location
  ) {

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
}