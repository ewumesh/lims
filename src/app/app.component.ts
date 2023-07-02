import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LanguageService } from './services/language-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'lims-frontend';

  constructor(
    private router: Router,
    private languageService: LanguageService
    ) {

        /* 
    Retrieve the selected language if selected otherwise select the default language
    */
    let currentLang = localStorage.getItem('lang');
    if (currentLang) {
      this.languageService.changeLanguage(currentLang.toString());
    } else {
      this.languageService.initLanguage();
    }
  }
}
