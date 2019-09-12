import { FilePath } from '@ionic-native/file-path/ngx';
import { File, Entry, RemoveResult } from '@ionic-native/file/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { ImageResizer, ImageResizerOptions } from '@ionic-native/image-resizer/ngx';
import { Subject, Observable, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileUtilService implements OnInit, OnDestroy {

  private static BASE_FILE_SYSTEM = 'file:///data/user/0/io.ionic.starter';
  private static APP_ROOT_DIR = 'files';

  private static fileWorkerObserver$: Subscription;
  private static imgURLsEmissor$ = new Subject<Array<string>>();

  private static urlsParaExibicao = new Array<string>();

  constructor(
    private file: File,
    private webview: WebView,
    private fileChooser: FileChooser,
    private filePath: FilePath,
    private imageResizer: ImageResizer
  ) {}

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    if (FileUtilService.fileWorkerObserver$ != null
      && FileUtilService.fileWorkerObserver$ !== undefined) {
      FileUtilService.fileWorkerObserver$.unsubscribe();
    }

  }

  public convertLocalFile2Url(fileName: string): string {
    return this.webview.convertFileSrc(fileName);
  }

  private escolherArquivo(): Promise<string> {
    console.log('escolherArquivo():');
    return this.fileChooser.open();
  }

  private convertURLparaPathNativo(uriEscolhido: string): Promise<string> {
    return this.filePath.resolveNativePath(uriEscolhido);
  }

  public capturaImagem(): Observable<Array<string>> {

    let resp = '';
    this.escolherArquivo()

      .then( uriImagem => {

        console.log(uriImagem);
        this.convertURLparaPathNativo(uriImagem)

          .then( (nativePath) => {

            this.resizeFile(nativePath).then(arq => {
              // console.log(arq);
              resp = this.convertLocalFile2Url(arq);
              // console.log('resp' + resp);
              // FileUtilService.urlEmissor$.next(resp);
              FileUtilService.urlsParaExibicao.push(resp);
              // FileUtilService.urlEmissor$.next(resp);
              FileUtilService.imgURLsEmissor$.next(FileUtilService.urlsParaExibicao);
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

    return FileUtilService.imgURLsEmissor$.asObservable();
  }

  // essa merda vai dar erro em outros sistemas de arquivos!
  /*private parsePath(path: string) {

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
    }*/


  private deletaLocalFile(file: string): Promise<RemoveResult> {
    return this.file.removeFile(this.file.dataDirectory, file);
  }

  private getUltimoArquivo(): any {
    this.file.listDir(FileUtilService.BASE_FILE_SYSTEM, FileUtilService.APP_ROOT_DIR)
     .then(arquivos => {
        const resp = arquivos[arquivos.length - 1].name;
        console.log('resp' + resp);
        return arquivos[arquivos.length - 1];
      })
     .catch(e => console.log('erro'));
  }

  logaEspacoLivreHD(): Promise<number> {
    return this.file.getFreeDiskSpace();
  }

  listaArquivosEDiretoriosLocaisApp(): Promise<Entry[]> {
    return this.file.listDir(
      FileUtilService.BASE_FILE_SYSTEM,
      FileUtilService.APP_ROOT_DIR
    );
  }

  listaApenasArquivosLocaisApp(): Observable <Array<string>> {
    const resposta = new Array<string>();
    this.listaArquivosEDiretoriosLocaisApp()
      .then( entry => {
        entry.forEach(element => {
          // console.log('element::' + element);
          if (element.isFile) {
            resposta.push(element.nativeURL);
          }
        });
        FileUtilService.imgURLsEmissor$.next(resposta);
      });

    return FileUtilService.imgURLsEmissor$.asObservable();
  }

  listaImagensLocaisAppParaRenderizar(): Observable <Array<string>> {
    const resposta = new Array<string>();
    this.listaArquivosEDiretoriosLocaisApp()
      .then( entry => {
        entry.forEach( element => {
        // console.log('element::' + element);
        let fileName = element.nativeURL;
        if (element.isFile && fileName.endsWith('.jpg')) {
          fileName = this.convertLocalFile2Url(fileName);
          resposta.push(fileName);
        }
      });
        FileUtilService.urlsParaExibicao = resposta;
        FileUtilService.imgURLsEmissor$.next(resposta);
    });

    return FileUtilService.imgURLsEmissor$.asObservable();
  }

  copiarArquivo(
      pathOrigem: string,
      fileOrigem: string,
      pathDestino: string,
      fileDestino: string
    ): Promise<Entry> {
      return this.file.copyFile(pathOrigem, fileOrigem, pathDestino, fileDestino);
  }

  limparDirApp() {

     FileUtilService.fileWorkerObserver$ = this.listaApenasArquivosLocaisApp().subscribe(resp => {

        resp.forEach(element => {
          const fileName = element.substr(element.length - 17);
          // console.log('fileName::' + fileName);
          this.deletaLocalFile(fileName).then((msg) => console.log('deletado :: ' + msg));
        });

    });

  }

  private resizeFile(uriEscolhido: string): Promise<any> {
    const options = {
      uri: uriEscolhido,
      folderName: this.file.dataDirectory,
      quality: 35,
      width: 1000,
      height: 1000
    } as ImageResizerOptions;

    return this.imageResizer.resize(options);

  }

}
