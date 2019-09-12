import { FileUtilService } from '../util/file-util.service';

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
//  dirList: Entry[];
  // arquivo: File;

  /*private camera: Camera,
              private sanitizer: DomSanitizer,*/
  constructor(/*
              private file: File,
              private webview: WebView,
              private fileChooser: FileChooser,
              private filePath: FilePath*/
              ) {}


  /*teste(event) {
    this.arquivo = event.srcElement.files[0] as File;
    this.arquivo.
    console.log('this.arquivo:: ' + this.arquivo);
  }*/

/*


      exibeImg(fileName: string) {
        // this.imageSrc = this.utilService.convertLocalFile2Url(fileName);

      }

      fakExibeImg(ant: string) {
        let fileName = this.anterior;
        if (ant !== 'anterior') {
          fileName = this.anteriorHD;
        }
        this.exibeImg(fileName);
      }

*//*
  convertLocalFile2Url(fileName: string): string {
    console.log('this.file.dataDirectory + fileName->>' + fileName);
    return this.webview.convertFileSrc(fileName);
  }

  private escolherArquivo(): Promise<string> {

    return this.fileChooser.open();
  }

  private convertURLparaPathNativo(uriEscolhido: string): Promise<string> {
    return this.filePath.resolveNativePath(uriEscolhido);
  }

  parsePath(path) {
    const array = path.split('/');
    const charSeparator = '/';
    let newPath = '';
    let fileName = '';
    for (let index = 3; index < array.length - 1; index++) {
      const element = array[index];
      newPath = newPath + charSeparator + element;
    }
    fileName = array[array.length - 1];
    return { newPath, fileName };
  }

  copiarArquivo(
    pathOrigem: string,
    fileOrigem: string,
    pathDestino: string,
    fileDestino: string
  ): Promise<Entry> {
    // this.file.copyFile('file:///' + array.newPath, array.fileName, this.file.dataDirectory, fileNameHD)
    return this.file.copyFile(pathOrigem, fileOrigem, pathDestino, fileDestino);
  }*/

    teste() {





       /* this.escolherArquivo()
        .then( uri => {
          console.log(uri);
          this.convertURLparaPathNativo(uri)
          .then((nativePath) => {
            console.log( nativePath );
            const result = this.parsePath(nativePath);
            console.log(result);
            this.copiarArquivo('file:///' + result.newPath, result.fileName, this.file.dataDirectory, 'novoNome.jpg')
            .then(s => {
              console.log(s);
              this.imageSrc = this.convertLocalFile2Url(s.nativeURL);
            });

          });
      });*/

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
