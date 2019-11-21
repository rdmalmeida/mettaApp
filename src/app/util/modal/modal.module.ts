import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ModalPage } from './modal.page';
import { ModalService } from './modal.service';

const routes: Routes = [
  {
    path: 'modal',
    component: ModalPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ModalPage],
  providers: [
    { provide: ModalService, useClass:    ModalService }
  ]
  //entryComponents: [ModalPage]
})
export class ModalPageModule {}
