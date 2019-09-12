import { ImageResizer } from '@ionic-native/image-resizer/ngx';
import { FormsModule } from '@angular/forms';
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
    { provide: FileUtilService, useClass:    FileUtilService },
    { provide: File, useClass:    File },
    { provide: WebView, useClass:    WebView },
    { provide: FileChooser, useClass:    FileChooser },
    { provide: FilePath, useClass:    FilePath },
    { provide: ImageResizer, useClass:    ImageResizer }

],
  exports: [ImgUtilComponent],
})
export class UtilModule { }
