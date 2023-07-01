import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-video-manual',
  templateUrl: './video-manual.component.html',
  styleUrls: ['./video-manual.component.css']
})
export class VideoManualComponent implements OnInit {
  constructor(private router: Router) { }


  goToHome() {
    this.router.navigate(['/login']);
  }

  gotoPricing() {
    this.router.navigate(['/commodity-pricing']);
  }

  gotoComplain() {
    this.router.navigate(['/complain']);
  }

  gotoFeedback() {
    this.router.navigate(['/feedback']);
  }

  gotoUserManual() {
    this.router.navigate(['/user-manual']);
  }

  gotoVideoManual() {
    this.router.navigate(['/video-manual']);
  }

  ngOnInit(): void {
    this.initForm();
  }


  private initForm() {

  }

  removeSpace(value) {
     return value.replace(/\s/g, '');
  }

}
