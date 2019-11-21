import { Platform } from '@ionic/angular';
import { ImgUtilService } from './img-util.service';
import { FileUtilService } from './file-util.service';
import { Observable, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { StorageUtilService } from './storage-util.service';
import { Relacao } from '../vos/Relacao';

@Injectable({
  providedIn: 'root'
})
export class ImgControllerService {

  private static imgURLsEmissor$ = new Subject<Array<any>>();
  private static relacoesListMemoria = new Array<Relacao>();

  private static appPath = '';
  private static appDir = '';
  

  constructor(private fuService: FileUtilService,
              private iuService: ImgUtilService,
              private platform: Platform,
              private storageService: StorageUtilService) {

                this.platform.ready().then( () => {                  
                  console.debug('ImgControllerService plataforma carregada.');
                });                

  }

  public async capturaImagem(): Promise<boolean> {

    this.fuService.escolherArquivo()

      .then( uriImagem => {

        console.log('uriImagem::' + uriImagem);
        this.fuService.convertURLparaPathNativo(uriImagem)

          .then( (nativePath) => {

            if(ImgControllerService.appDir===''){
              ImgControllerService.appPath = this.fuService.getAppPath();
              ImgControllerService.appDir = this.fuService.getAppDir();
            }//avaliar melhorar
            
            console.log('nativePath::' + nativePath + '\nthis.fuService.getAppDir()::' + this.fuService.getAppDir());
            this.iuService.resizeFile(nativePath, ImgControllerService.appPath + '/' + ImgControllerService.appDir)
            .then(arq => {
              console.log(arq);
              let localUrl2Show = this.iuService.convertLocalFile2Url(arq);
              console.log('localUrl2Show' + localUrl2Show);

              //monta json com os dados
              //const jsonStr = {"uriImagem":uriImagem, "nativePath":nativePath, "localFile":arq, "localUrl2Show":localUrl2Show, "counter":0};

              //persiste dados localmente e notifica observador
              let relacao: Relacao = new Relacao(uriImagem, nativePath, arq, localUrl2Show, 0);
              this.storageService.addRelacao(relacao).then(() => {

                ImgControllerService.relacoesListMemoria.push(relacao);
                ImgControllerService.imgURLsEmissor$.next(ImgControllerService.relacoesListMemoria);
                return true;
              })
             
            });
        
          });
      });

    return false;
  }

  //so deve ser chamado ao abrir o app para carregar em memoria  
  public getRelacoes(): Observable <Array<Relacao>> {
    
        //carrega lista do storage
        this.storageService.readRelacoes().then(
          
        (relacoes) => { 
          (ImgControllerService.relacoesListMemoria = relacoes);            
            ImgControllerService.imgURLsEmissor$.next(ImgControllerService.relacoesListMemoria);            
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

  /*public listaImagensLocaisAppParaRenderizar(): Observable <Array<string>> {

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

          ImgControllerService.relacoesListMemoria = resposta;
          ImgControllerService.imgURLsEmissor$.next(ImgControllerService.relacoesListMemoria);
      });

     return ImgControllerService.imgURLsEmissor$.asObservable();
  }*/


  public limparDirApp(): Observable<Array<string>> {

     this.listaApenasArquivosLocaisApp().subscribe(resp => {

       resp.forEach(element => {
         const fileName = element.substr(element.length - 17);
         // console.log('fileName::' + fileName);
         this.fuService.deletaLocalFile(fileName)
         .then((msg) => {
           console.log('deletado :: ' + msg);
           ImgControllerService.relacoesListMemoria = new Array<Relacao>();
           ImgControllerService.imgURLsEmissor$.next(ImgControllerService.relacoesListMemoria);
         });
       });
   });

     return ImgControllerService.imgURLsEmissor$.asObservable();
  }

}
