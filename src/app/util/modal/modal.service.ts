import { Injectable } from '@angular/core';

import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalPage } from '../modal/modal.page';



@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(public modalController: ModalController) {
}


  async presentModal(localUrl2Show) {
      const modal = await this.modalController.create({
        component: ModalPage,
        componentProps: {'localUrl2Show': localUrl2Show}
      });
      return await modal.present();
  }

  
}
