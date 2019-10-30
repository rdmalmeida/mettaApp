import { Injectable } from '@angular/core';

import { ImageResizer, ImageResizerOptions } from '@ionic-native/image-resizer/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';

@Injectable({
  providedIn: 'root'
})
export class ImgUtilService {

  constructor(private imageResizer: ImageResizer,
              private webview: WebView) {}


  /**
   * Converte todo path local do SO para uma URL, de modo que possa ser
   * exibida no APP
   *
   * @param fileName o path completo e o nome do arquivo
   */
  public convertLocalFile2Url(fileName: string): string {
    return this.webview.convertFileSrc(fileName);
  }

  /**
   * Redimensiona o arquivo para uma qualidade inferior
   *
   * O plugin nativo foi descontinuado, apesar de funcionar no android
   *
   * @param uriEscolhido caminho onde encontra-se o arquivo a ser manipulado (path nativo)
   * @param dataDirectory diretorio onde sera gravado o novo arquivo
   */
  public resizeFile(uriEscolhido: string, dataDirectory: string): Promise<any> {
    const options = {
      uri: uriEscolhido,
      folderName: dataDirectory,
      quality: 35,
      width: 1000,
      height: 1000
    } as ImageResizerOptions;

    return this.imageResizer.resize(options);

  }

}
