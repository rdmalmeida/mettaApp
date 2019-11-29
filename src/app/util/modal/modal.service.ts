import { Injectable } from '@angular/core';

import { ModalController } from '@ionic/angular';
import { ModalPage } from '../modal/modal.page';


@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(public modalController: ModalController) {
    console.log('modalController::constructor');
  }

  async presentModal(item) {
      const modal = await this.modalController.create({
        component: ModalPage,
        componentProps: {'item': item}
      });

      return await modal.present();
  }
  
}
