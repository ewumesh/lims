import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './raw-data.component.html',
  styleUrls: ['./raw-data.scss']
})
export class RawDataComponent implements OnInit {
  reportDetails:any = {}
  constructor() { }

  ngOnInit(): void { }
}
