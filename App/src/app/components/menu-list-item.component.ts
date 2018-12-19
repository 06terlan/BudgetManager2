import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-menu-list-item',
  templateUrl: './menu-list-item.component.html',
  styleUrls: []
})
export class MenuListItemComponent implements OnInit {

  @Input() item;

  constructor() {}

  ngOnInit() {

  }

  onItemSelected(item) {

  }
}
