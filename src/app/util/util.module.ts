import { ImgControllerService } from './img-controller.service';
import { ImgUtilService } from './img-util.service';
import { ImageResizer } from '@ionic-native/image-resizer/ngx';
import { IonicModule } from '@ionic/angular';
import { ImgUtilComponent } from './img-util/img-util.component';
import { File } from '@ionic-native/file/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FileUtilService } from './file-util.service';
import { WebView } from '@ionic-native/ionic-webview/ngx';


@NgModule({
  declarations: [ImgUtilComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  providers: [

    ImgUtilComponent,
    { provide: ImgControllerService, useClass:    ImgControllerService },
    { provide: FileUtilService, useClass:    FileUtilService },
    { provide: ImgUtilService, useClass:    ImgUtilService },
    { provide: File, useClass:    File },
    { provide: WebView, useClass:    WebView },
    { provide: FileChooser, useClass:    FileChooser },
    { provide: FilePath, useClass:    FilePath },
    { provide: ImageResizer, useClass:    ImageResizer }

],
  exports: [ImgUtilComponent],
})
export class UtilModule { }
