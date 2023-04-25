import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {

  breadcrumbs = [];

  constructor(public router: Router) {

    this.router.events.subscribe(a => {
      this.breadcrumbs = this.splitTextFromUrl(this.router.url.split('?')[0]), 'SPLITTED';
    })
   }

   splitTextFromUrl(url: string): string[] {
    const splitUrl = url.split('/');
    const text = splitUrl.filter(segment => segment !== '');
    return text;
  }
}
