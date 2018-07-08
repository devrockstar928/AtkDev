import { MAT_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.css']
})
export class DeleteModalComponent implements OnInit {

  typename: string;
  name: string;
  constructor(@Inject(MAT_DIALOG_DATA) data: any) {
    this.name = data.name;
    this.typename = data.typename;
  }

  ngOnInit() {
  }

}
