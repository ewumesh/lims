import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { SharedService } from "src/app/services/shared.service";
import { TOAST_STATE, ToastService } from "../toastr/toastr.service";



@Component({
    templateUrl: './user-activation.html',
    styleUrls: ['./user-activation.scss']
})

export class UserActivationComponent {
    status: boolean;

    constructor(
        private dialogRef: MatDialogRef<UserActivationComponent>,
        @Inject(MAT_DIALOG_DATA)
        public data: any,
        private service: SharedService,
        private toast: ToastService
    ) { 
        if(data.status) {
            this.status = true;
        } else {
            this.status = false;
        }
    }

    save() {
        let payload = {
            id: this.data.userId,
            is_active: this.status
        }

        if(this.status) {
            this.service.toggleUserActivation(payload).subscribe(res => {
                this.toast.showToast(TOAST_STATE.success, 'User Deactivated Successfully!');
                this.dismissMessage();
                this.dialogRef.close(true);
            })
        } else {
            this.service.toggleUserActivation(payload).subscribe(response => {
                this.toast.showToast(TOAST_STATE.success, 'User Activated Successfully!');
                this.dismissMessage();
                this.dialogRef.close(true);
            })
        }
    }

    dismissMessage() {
        setTimeout(() => {
            this.toast.dismissToast();
        }, 3000)
    }
}