import { Injectable } from '@angular/core';

import { ModalController } from '@ionic/angular';

import { SimpleTextModalComponent } from './simple-text-modal/simple-text-modal.component';
import { ImgModalComponent } from './modal-Img/img-modal.component';


@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(public modalController: ModalController) {
    console.log('modalController::constructor');
  }

  async presentModal(item) {
      const modal = await this.modalController.create({
        component: ImgModalComponent,
        componentProps: {'item': item}
      });

      return await modal.present();
  }

  async presentModalAbout(text) { 
    const modal = await this.modalController.create({
      component: SimpleTextModalComponent,
      componentProps: {'text': text}
    });

    return await modal.present();
  }
  
}
