import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
	selector: '',
	templateUrl: './protected.component.html',
	styles: []
})
export class ProtectedComponent{
	public userData = {};

	constructor(private http:HttpClient, private router:Router){}

	ngOnInit(){
		this.http.get('http://127.0.0.1:4000/api/protected').toPromise()
			.then((d:any)=>{
				this.userData = d.data;
			})
			.catch(e=>{
			console.log(e);
				this.router.navigate(['login']);
			});
	}
}