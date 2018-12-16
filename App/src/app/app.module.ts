import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AppRoutes } from './routes';
import { LoginComponent } from './components/login.component';
import { ProtectedComponent } from './components/protected.component';
import { RegisterComponent } from './components/register.component';
import { UserDataServcie } from './services/userdata.service';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { AuthGuard } from './guards/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ProtectedComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule,
    AppRoutes,
    ReactiveFormsModule
  ],
  providers: [
    FormBuilder, 
    UserDataServcie, 
    AuthGuard,
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
