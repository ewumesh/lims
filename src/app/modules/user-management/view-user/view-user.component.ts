import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ViewUserDetailsService } from 'src/app/services/user-management/view-user/view-user.service';

@Component({
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.scss']
})
export class ViewUserDetailsComponent implements OnInit {

  userId:any;

  userDetails: any = {};
  categories:any[] = [];

  constructor(
    private service:ViewUserDetailsService,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id');
    this.getUserDetails();
    this.gerCategories();
  }

  getUserDetails() {
    this.service.getUserDetails(this.userId).subscribe(response => {
      this.userDetails = response;
    })
  }

  gerCategories() {
    this.service.getCategories().subscribe(response => {
      this.categories = response.results;
    })
  }

  getClientName(clientId) {
    return this.categories.find(c => c.id === clientId)?.name;
  }
}
