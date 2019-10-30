import { Platform } from '@ionic/angular';
import { Injectable, OnInit, OnDestroy } from '@angular/core';

import { FilePath } from '@ionic-native/file-path/ngx';
import { File, Entry, RemoveResult } from '@ionic-native/file/ngx';
import { FileChooser, FileChooserOptions } from '@ionic-native/file-chooser/ngx';


@Injectable({
  providedIn: 'root'
})
export class FileUtilService {

  private APP_ROOT_DIR: string; // 'files';
  private BASE_FILE_SYSTEM: string; // 'file:///data/user/0/io.ionic.starter';

  constructor(
    private file: File,
    private fileChooser: FileChooser,
    private filePath: FilePath,
    private platform: Platform) {

      this.platform.ready().then(() => {
        console.log('FileUtilService carregado.');
        this.APP_ROOT_DIR = this.getAppDir();
        this.BASE_FILE_SYSTEM = this.getAppPath();
      });

    }


  /**
   * Obtem o diretorio do aplicativo
   *
   * @todo poderia usar expressão regular..
   * @testedOn Android
   * @returns diretorio local. exemplo: 'files'
   */
  public getAppDir(): string {

    let appPath;
    let ultimaPos = this.file.dataDirectory.lastIndexOf('/');
    if (this.file.dataDirectory.endsWith('/')) {
      appPath = this.file.dataDirectory.substr(0, ultimaPos);
      ultimaPos = appPath.lastIndexOf('/');
    }
    const dir = appPath.substr(ultimaPos + 1);
    // console.log('appDir :: ' + dir);
    return dir;
  }

  /**
   * @returns path do diretorio local. exemplo: 'file:///data/user/0/io.ionic.starter'
   */
  public getAppPath(): string {

    const posicaoDir = this.file.dataDirectory.indexOf(this.APP_ROOT_DIR);
    const path = this.file.dataDirectory.substr(0, posicaoDir - 1);
    // console.log('appPath :: ' + path);
    return path;
  }

  public escolherArquivo(): Promise<string> {
    return this.fileChooser.open();
  }

  public convertURLparaPathNativo(uriEscolhido: string): Promise<string> {
    return this.filePath.resolveNativePath(uriEscolhido);
  }

  public deletaLocalFile(file: string): Promise<RemoveResult> {
    return this.file.removeFile(this.file.dataDirectory, file);
  }

  public getUltimoArquivo(): any {
    this.file.listDir(this.BASE_FILE_SYSTEM, this.APP_ROOT_DIR)
     .then(arquivos => {
        const resp = arquivos[arquivos.length - 1].name;
        console.log('resp' + resp);
        return arquivos[arquivos.length - 1];
      })
     .catch(e => console.log('erro'));
  }

  public logaEspacoLivreHD(): Promise<number> {
    return this.file.getFreeDiskSpace();
  }

  public listaArquivosEDiretoriosLocaisApp(): Promise<Entry[]> {
    return this.file.listDir(
      this.BASE_FILE_SYSTEM,
      this.APP_ROOT_DIR
    );
  }

  public opiarArquivo(
      pathOrigem: string,
      fileOrigem: string,
      pathDestino: string,
      fileDestino: string
    ): Promise<Entry> {
      return this.file.copyFile(pathOrigem, fileOrigem, pathDestino, fileDestino);
  }

}
