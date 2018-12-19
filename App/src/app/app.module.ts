import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutes } from './routes';
import { LoginComponent } from './components/login.component';
import { MainComponent, WalletDialog } from './components/main.component';
import { RegisterComponent } from './components/register.component';
import { UserDataService } from './services/userdata.service';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { AuthGuard } from './guards/auth.guard';
import { StoreModule } from '@ngrx/store';
import { DashboardComponent } from './components/dashboard.component';
import { WalletComponent, DeleteWalletDialog } from './components/wallet.component';
//material
import { Material } from './material.module';
//reducer
import { reducers } from './store/reducers';
//chart
import { ChartsModule } from 'ng2-charts';
import {CategoriesComponent} from "./components/categories.component";
import {MenuListItemComponent} from "./components/menu-list-item.component";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    MainComponent,
    CategoriesComponent,
    MenuListItemComponent,
    DashboardComponent,
    WalletDialog,
    WalletComponent,
    DeleteWalletDialog
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule,
    AppRoutes,
    ReactiveFormsModule,
    FormsModule,
    StoreModule.forRoot(reducers, {}),
    //material
    Material,
    //chart
    ChartsModule
  ],
  providers: [
    FormBuilder, 
    UserDataService, 
    AuthGuard,
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true}
  ],
  bootstrap: [AppComponent],
  entryComponents: [WalletDialog, DeleteWalletDialog]
})
export class AppModule { }
