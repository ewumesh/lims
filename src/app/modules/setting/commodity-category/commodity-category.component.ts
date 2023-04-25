import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { delay } from 'rxjs';
import { SettingsService } from 'src/app/services/settings/settings.service';
import { DeleteConfirmComponent } from 'src/app/shared/delete-confirm/delete-confirm.component';
import { AddOrUpdateCommodityCategoryComponent } from './components/add-or-update-commodity-category.component';

@Component({
  templateUrl: './commodity-category.component.html',
  styleUrls: ['./commodity-category.scss']
})
export class CommodityCategoriesComponent implements OnInit {

  displayedColumns: string[] = ['sn', 'name', 'address', 'regNo','action'];
  dataSource = new MatTableDataSource<any>([]);
  isWorking = true;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    public dialog: MatDialog,
    private sService: SettingsService
    ) {}

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.sService.getCategories().subscribe(res => {
      this.dataSource.data = res;
    })
  }

  openDialog(data) {
    console.log(data, 'data..')
    let instance: MatDialogRef<AddOrUpdateCommodityCategoryComponent, any>;
    instance = this.dialog.open(AddOrUpdateCommodityCategoryComponent, {
      width:'500px',
      data: data ? data : {},
      autoFocus: false,
    });

    instance.afterClosed().subscribe(result => {
      this.getCategories();
    });
  }

  deleteCategory(id: number) {
    this.dialog.open(DeleteConfirmComponent).afterClosed().subscribe(_ => {
      if (_) {
        this.sService.deleteCategory(id).pipe(delay(400)).subscribe(_ => {
          this.getCategories();
        })
      }
    })
}

applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
}

}
