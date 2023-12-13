import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { RouteReuseStrategy } from '@angular/router'
import { FormsModule } from '@angular/forms'

import { IonicModule, IonicRouteStrategy } from '@ionic/angular'
import { IonicStorageModule } from '@ionic/storage-angular';

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { LoginModalComponent } from './login-modal/login-modal.component'
import { HttpClientModule } from '@angular/common/http'
import { UserService } from './services/user.service'
import { StorageService } from './services/storage.service';
import { userReducer } from './store/user.reducer'
import { StoreModule } from '@ngrx/store'

@NgModule({
  declarations: [AppComponent, LoginModalComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    StoreModule.forRoot({ user: userReducer }),
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, UserService, StorageService],
  bootstrap: [AppComponent],
})
export class AppModule { }
