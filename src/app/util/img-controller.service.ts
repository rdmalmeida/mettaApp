import { Platform } from '@ionic/angular';
import { ImgUtilService } from './img-util.service';
import { FileUtilService } from './file-util.service';
import { Observable, Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImgControllerService {

  constructor(private fuService: FileUtilService,
              private iuService: ImgUtilService,
              private platform: Platform) {

                this.platform.ready().then(() => {
                  console.log('ImgControllerService carregado.');
                });
  }


  private static imgURLsEmissor$ = new Subject<Array<string>>();
  private static urlsParaExibicao = new Array<string>();


  public capturaImagem(): Observable<Array<string>> {

    let resp = '';
    this.fuService.escolherArquivo()

      .then( uriImagem => {

        console.log('uriImagem::' + uriImagem);
        this.fuService.convertURLparaPathNativo(uriImagem)

          .then( (nativePath) => {

            console.log('nativePath::' + nativePath + '\nthis.fuService.getAppDir()::' + this.fuService.getAppDir());
            this.iuService.resizeFile(nativePath, this.fuService.getAppPath() + '/' + this.fuService.getAppDir())
            .then(arq => {
              console.log(arq);
              resp = this.iuService.convertLocalFile2Url(arq);
              console.log('resp' + resp);
              // this.urlEmissor$.next(resp);
              ImgControllerService.urlsParaExibicao.push(resp);
              // this.urlEmissor$.next(resp);
              ImgControllerService.imgURLsEmissor$.next(ImgControllerService.urlsParaExibicao);
            });

            /*
            this.copiarArquivo('file:///' + result.newPath, result.fileName, this.file.dataDirectory, nomeDoArquivo)

              .then(s => {

                console.log(s);
                resp = this.convertLocalFile2Url(s.nativeURL);
                console.log('resp' + resp);

                UtilService.urlEmissor$.next(resp);

              }); */
          });
      });

    return ImgControllerService.imgURLsEmissor$.asObservable();
  }


  public listaApenasArquivosLocaisApp(): Observable <Array<string>> {
    const resposta = new Array<string>();
    this.fuService.listaArquivosEDiretoriosLocaisApp()
      .then( entry => {
        entry.forEach(element => {
          // console.log('element::' + element);
          if (element.isFile) {
            resposta.push(element.nativeURL);
          }
        });
        ImgControllerService.imgURLsEmissor$.next(resposta);
      });

    return ImgControllerService.imgURLsEmissor$.asObservable();
  }

  public listaImagensLocaisAppParaRenderizar(): Observable <Array<string>> {

     const resposta = new Array<string>();
     this.fuService.listaArquivosEDiretoriosLocaisApp()
       .then( entry => {
          entry.forEach( element => {
          // console.log('element::' + element);
          let fileName = element.nativeURL;
          if (element.isFile && fileName.endsWith('.jpg')) {
            fileName = this.iuService.convertLocalFile2Url(fileName);
            resposta.push(fileName);
          }
       });

          ImgControllerService.urlsParaExibicao = resposta;
          ImgControllerService.imgURLsEmissor$.next(ImgControllerService.urlsParaExibicao);
      });

     return ImgControllerService.imgURLsEmissor$.asObservable();
  }


  public limparDirApp(): Observable<Array<string>> {

     this.listaApenasArquivosLocaisApp().subscribe(resp => {

       resp.forEach(element => {
         const fileName = element.substr(element.length - 17);
         // console.log('fileName::' + fileName);
         this.fuService.deletaLocalFile(fileName)
         .then((msg) => {
           console.log('deletado :: ' + msg);
           ImgControllerService.urlsParaExibicao = new Array<string>();
           ImgControllerService.imgURLsEmissor$.next(ImgControllerService.urlsParaExibicao);
         });
       });
   });

     return ImgControllerService.imgURLsEmissor$.asObservable();
  }

}
