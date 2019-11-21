import { Platform } from '@ionic/angular';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { ImgControllerService } from './../img-controller.service';
import { Subscription} from 'rxjs';
import { ModalService } from '../modal/modal.service';
import { Relacao } from 'src/app/vos/Relacao';


@Component({
  selector: 'app-img-util',
  templateUrl: './img-util.component.html',
  styleUrls: ['./img-util.component.scss']
})
export class ImgUtilComponent implements OnInit, OnDestroy {

  arquivosLocaisListener: Subscription;
  imagesVOs: Array<Relacao> = new Array<Relacao>();

  constructor(private controller: ImgControllerService,
              private platform: Platform,
              private modalService: ModalService) {

                this.platform.ready().then(() => {
                  console.debug('ImgUtilComponent carregado.');
                });
              }

  ngOnInit() {

    this.platform.ready().then( resp => {
      console.debug('vou chamar o listar...');
      // Carrega os avatares das imagens locais 
      this.arquivosLocaisListener = this.controller.getRelacoes()
        .subscribe(itensRelacoes => {
          console.log('itensRelacoes::' + itensRelacoes);
          this.imagesVOs = itensRelacoes;
        });
    });
  }

 
  ngOnDestroy(): void {
    this.arquivosLocaisListener.unsubscribe();
  }

  play(item){
    console.log('vou abrir modal...');
    this.modalService.presentModal(item.localUrl2Show);   
  }

}
