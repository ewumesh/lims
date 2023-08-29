import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from '../layout.service';
import { LanguageService } from 'src/app/services/language-service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { NotificationComponent } from '../notification/notification.component';
import { MatSidenav } from '@angular/material/sidenav';
import { SidebarComponent } from '../sidebar/sidebar.component';

export interface Section {
  name: string;
  updated: Date;
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['../layout/layout.component.scss', './navbar.scss']
})
export class NavbarComponent implements OnInit, AfterViewInit {

  userDetails: any = {};

  roles: any[] = [];

  notifications: any[] = [];

  url: string;

  checked: boolean = false;
  disabled: boolean = false;

  breakpoints = Breakpoints;
  isMobileDevice = false;

  folders: Section[] = [
    {
      name: 'Photos',
      updated: new Date('1/1/16'),
    },
    {
      name: 'Recipes',
      updated: new Date('1/17/16'),
    },
    {
      name: 'Work',
      updated: new Date('1/28/16'),
    },
  ];

  notes: Section[] = [
    {
      name: 'Vacation Itinerary',
      updated: new Date('2/20/16'),
    },
    {
      name: 'Kitchen Remodel',
      updated: new Date('1/18/16'),
    },
  ];

  search = ''

  @ViewChild('darkModeSwitch', { read: ElementRef }) element: ElementRef | undefined;

  getRandomColor() {
    var color = Math.floor(0x1000000 * Math.random()).toString(16);
    return '#' + ('000000' + color).slice(-6);
  }

  switchLanguage(lang) {
    this.langService.changeLanguage(lang);
  }

  constructor(
    private router: Router,
    private layoutService: LayoutService,
    private langService: LanguageService,
    private renderer: Renderer2,
    private responsive: BreakpointObserver,
    private _bottomSheet: MatBottomSheet
    // private _bottomSheetRef: MatBottomSheetRef<NotificationComponent>
  ) {
    let userDetails = JSON.parse(localStorage.getItem('userDetails'));
    this.userDetails = userDetails;
    this.url = `https://ui-avatars.com/api/?name=${this.userDetails.first_name}+${this.userDetails.last_name}&rounded=true&background=FB802C&color=ffffff&size=28&bold=true`
  }

  openNotification(): void {
    this._bottomSheet.open(NotificationComponent);
  }

  openSideNav() {
    this._bottomSheet.open(SidebarComponent);
  }

  ngOnInit(): void {

    this.responsive.observe(Breakpoints.XSmall)
      .subscribe(result => {
        console.log(result.matches, 'DEVICE....')
        if (result.matches) {
          this.isMobileDevice = true;
        }

      });


    this.getRoles();
    this.getTokenStatus();
    this.getNotificationList();
  }

  getNotificationList() {
    this.layoutService.getNotification().subscribe(res => {
      this.notifications = res.results;
    })
  }

  getRoles() {
    this.layoutService.getRoles().subscribe(res => {
      this.roles = res.roles;
    })
  }

  getRoleName(id) {
    return this.roles.find(a => a.role_id === id)?.role_name;
  }

  navigateToProfile() {
    this.router.navigate(['/dashboard/my-account']);
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login'])
  }

  gotoDashboard() {
    this.router.navigate(['/dashboard']);
  }

  getTokenStatus() {
    this.layoutService.getTokenStatus().subscribe(res => {
      if (res.valid === true) {

      } else {
        this.logout();
      }
    }, (error) => {
      // console.log(error?.error, 'roo')

      if (error?.error?.valid === false) {
        this.logout();
      }
    })
  }


  ngAfterViewInit() {
    this.setIcon();
  }

  setIcon() {
    if (this.element) {
      const targetSpan: HTMLElement = this.element.nativeElement.querySelector('.mat-slide-toggle-thumb');
      while (targetSpan.firstChild) {
        targetSpan.firstChild.remove();
      }
      const elem = this.renderer.createElement('mat-icon');
      const icon = this.checked ? 'dark_mode' : 'light_mode';
      elem.setAttribute('class', 'mat-icon notranslate material-icons mat-icon-no-color light-mode-switch-icon');
      elem.textContent = icon
      targetSpan.appendChild(elem);
    }
  }

  changeTheme() {
    this.checked = !this.checked;
    // console.log('I am now ', this.checked);
    this.setIcon();
  }
}
