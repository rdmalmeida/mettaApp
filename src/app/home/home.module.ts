import { ImgUtilComponent } from './../util/img-util/img-util.component';
import { UtilModule } from './../util/util.module';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { ModalPageModule } from '../util/modal/modal.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule, 
    UtilModule,
    ModalPageModule,

    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ])
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
