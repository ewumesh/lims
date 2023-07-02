import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  language: "en" | "np";

  constructor(
    public translateService: TranslateService,
    private location: Location,
  ) {
    let currentLang = localStorage.getItem('lang');
    if(currentLang) {
      this.changeLanguage(currentLang.toString());
    }
  }

  initLanguage(){
    this.translateService.addLangs(["en", "np"])
    let language = navigator.language || (navigator as any).userLanguage;
    // language = language.split("-").includes("es") ? "es" : "en"

    if(language.split("-").includes("np")) {
      language = 'np';
    } else if(language.split("-").includes("en")) {
      language = 'en';
    }
    // console.log(language, "LANG")
    this.translateService.setDefaultLang(language)

    // Change the URL without navigate:
    // this.location.go(language)

    this.language=language
  }

  changeLanguage(language){
    localStorage.setItem('lang', language);
    this.translateService.setDefaultLang(language);
    // this.location.go(language)
    this.language=language
  }
}