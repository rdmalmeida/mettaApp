import { Component, OnInit, OnDestroy } from '@angular/core';
import { FileUtilService } from '../file-util.service';
import { Subscription} from 'rxjs';
import { stringify } from '@angular/compiler/src/util';

@Component({
  selector: 'app-img-util',
  templateUrl: './img-util.component.html',
  styleUrls: ['./img-util.component.scss']
})
export class ImgUtilComponent implements OnInit, OnDestroy {

  arquivosLocaisEmissor$: Subscription;
  imagesSrcs: Array<string>;

  constructor(private us: FileUtilService) {}

  ngOnInit() {

    this.imagesSrcs = new Array<string>();

    // this.us.limparDirApp();

    /** Carrega os avatares das imagens locais */
    this.arquivosLocaisEmissor$ = this.us.listaImagensLocaisAppParaRenderizar()
    .subscribe(urls => {
      console.log(urls);
      this.imagesSrcs = urls;
    });

    /** Carrega a imagem principal */ /*
    this.sub = this.us.getUrl().subscribe(novaUrl => {
      this.imageSrc = novaUrl;
      console.log(this.imageSrc);
    });

     */

  }

  ngOnDestroy(): void {
    this.arquivosLocaisEmissor$.unsubscribe();
  }

  pegaImagem() {
    this.us.capturaImagem();
  }
}
