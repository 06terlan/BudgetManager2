import { Component } from '@angular/core';
import{ Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: ['']
})
export class AppComponent {

	constructor(private router:Router){}

  idLoggedIn():boolean{
  	return !!localStorage.getItem('token');
  }

  logout(){
  	localStorage.removeItem('token');
  	this.router.navigate(['login']);
  }
}
