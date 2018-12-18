import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
	selector: 'app-categories',
	templateUrl: './categories.component.html',
	styles: []
})
export class CategoriesComponent{
	@Input() userData = {};
  public categories = this.userData['categories'];

	constructor(private http:HttpClient, private router:Router){}
}
