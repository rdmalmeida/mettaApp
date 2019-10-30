import { ImgControllerService } from './../util/img-controller.service';

import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  imageSrc: any;
  anterior = '';
  anteriorHD = '';

  /*private camera: Camera,
              private sanitizer: DomSanitizer,*/
  constructor(
              private controller: ImgControllerService) {}


    teste() {

        this.controller.capturaImagem().subscribe((value) => console.log('ok' + value));

      }
    }


/*
  private openGallery() {

    const options: CameraOptions = {
      quality: 10,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE
    };

    this.camera.getPicture(options).then(
      (imageData) => {
        // imageData is either a base64 encoded string or a file URI
        // If it's base64 (DATA_URL):

        // console.log('imageData:[' + imageData + ']');

        // funciona
        const base64Image = 'data:image/jpeg;base64,' + imageData;
        this.imageSrc = this.sanitizer.bypassSecurityTrustUrl(base64Image);


        // console.log('this.imageSrc:[' + this.imageSrc + ']');

      }, (err) => {
        // Handle error
        console.log(err);
    });
  }
*/
