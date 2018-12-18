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
  public categories = {};

	constructor(private http:HttpClient, private router:Router){}

	ngOnInit(){
		this.http.get('http://127.0.0.1:4000/api/categories').toPromise()
			.then((d:any)=>{
				this.categories = d.data;
			})
			.catch(e=>{
			  console.log(e);
			});
	}
}
