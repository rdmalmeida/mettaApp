import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AudioUtilService } from './util/audio-util.service';
import { NativeAudio } from '@ionic-native/native-audio/ngx';
import { StorageUtilService } from './util/storage-util.service';
import { Storage, IonicStorageModule } from '@ionic/storage';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, IonicStorageModule.forRoot()],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: NativeAudio, useClass:    NativeAudio },
    { provide: AudioUtilService, useClass:    AudioUtilService },
    { provide: StorageUtilService, useClass:    StorageUtilService }
  ],
  bootstrap: [AppComponent]

})
export class AppModule {}
