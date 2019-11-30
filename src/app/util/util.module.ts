import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';
import { IonicStorageModule, Storage } from '@ionic/storage';

import { ImageResizer } from '@ionic-native/image-resizer/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { NativeAudio } from '@ionic-native/native-audio/ngx';
import { File } from '@ionic-native/file/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';

import { ImgControllerService } from './img-controller.service';
import { ImgUtilService } from './img-util.service';
import { FileUtilService } from './file-util.service';
import { StorageUtilService } from './storage-util.service';

import { ImgUtilComponent } from './img-util/img-util.component';
import { ScoreCounterComponent } from './img-util/score-counter/score-counter.component';


@NgModule({
  declarations: [ImgUtilComponent, ScoreCounterComponent],
  imports: [
    CommonModule,
    IonicModule,
    IonicStorageModule.forRoot()
  ],
  providers: [

    ImgControllerService,
    StorageUtilService,
    FileUtilService,
    ImgUtilService,    
    StorageUtilService,
    { provide: File, useClass:    File },
    { provide: WebView, useClass:    WebView },
    { provide: FileChooser, useClass:    FileChooser },
    { provide: FilePath, useClass:    FilePath },
    { provide: NativeAudio, useClass:    NativeAudio },
    { provide: ImageResizer, useClass:    ImageResizer }

],
  exports: [ImgUtilComponent],
})
export class UtilModule { }
