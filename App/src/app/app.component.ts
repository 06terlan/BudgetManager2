import { Component } from '@angular/core';
import{ Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { UserDataService } from './services/userdata.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: ['']
})
export class AppComponent {
  private loading:boolean = false;
  private loggedIn:boolean = false;

  constructor(private router:Router, private store:Store<any>, private userDateService:UserDataService)
  {
    
  }

  ngOnInit(){
    this.store.select('loadingReducer').subscribe(state=>{
      this.loading = state.loading;
    });
    this.store.select('loginReducer').subscribe(state=>{
      this.loggedIn = state.loggedIn;
    });
  }

  logout(){
  	this.userDateService.logout();
  	this.router.navigate(['login']);
  }
}
