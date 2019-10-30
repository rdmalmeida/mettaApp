import { Platform } from '@ionic/angular';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { ImgControllerService } from './../img-controller.service';
import { Subscription} from 'rxjs';

@Component({
  selector: 'app-img-util',
  templateUrl: './img-util.component.html',
  styleUrls: ['./img-util.component.scss']
})
export class ImgUtilComponent implements OnInit, OnDestroy {

  arquivosLocaisListener: Subscription;
  imagesSrcs: Array<string>;

  constructor(private controller: ImgControllerService,
              private platform: Platform) {

                this.platform.ready().then(() => {
                  console.log('ImgUtilComponent carregado.');
                });
              }

  ngOnInit() {

    this.imagesSrcs = new Array<string>();

    // this.us.limparDirApp();

    this.platform.ready().then( resp => {
      console.log('vou chamar o listar...');
      /** Carrega os avatares das imagens locais */
      this.arquivosLocaisListener = this.controller.listaImagensLocaisAppParaRenderizar()
      .subscribe(urls => {
        // console.log(urls);
        this.imagesSrcs = urls;
      });
    });

    /** Carrega a imagem principal */ /*
    this.sub = this.us.getUrl().subscribe(novaUrl => {
      this.imageSrc = novaUrl;
      console.log(this.imageSrc);
    });

     */

  }

  ngOnDestroy(): void {
    this.arquivosLocaisListener.unsubscribe();
  }

  pegaImagem() {
    this.controller.capturaImagem();
  }
}
