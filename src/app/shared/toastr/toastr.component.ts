import { Component, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ToastService } from './toastr.service';


@Component({
  selector: 'app-toast',
  templateUrl: './toastr.component.html',
  styleUrls: ['./toastr.component.scss'],
  animations: [
    trigger('toastTrigger', [
      state('open', style({ transform: 'translateY(0%)' })),
      state('close', style({ transform: 'translateY(-200%)' })),
      transition('open <=> close', [
        animate('300ms ease-in-out')
      ])
    ])
  ]
})
export class ToastComponent implements OnInit {
  toastClass!: string[];
  toastMessage!: string;
  showsToast!: boolean ;

  constructor(public toast: ToastService) { }

  ngOnInit(): void {
  }

  dismiss(): void {
    this.toast.dismissToast();
  }

  hideMessage() {
    this.toast.dismissToast();
    this.showsToast = false;
  }

}
