import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';


import { ModalService } from './modal.service';

import { SimpleTextModalComponent } from './simple-text-modal/simple-text-modal.component';
import { ImgModalComponent } from './modal-Img/img-modal.component';

const routes: Routes = [

];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ImgModalComponent, SimpleTextModalComponent],
  providers: [
    { provide: ModalService, useClass:    ModalService }
  ],
  exports: [SimpleTextModalComponent],
  entryComponents: [SimpleTextModalComponent]
})
export class ModalPageModule {}
