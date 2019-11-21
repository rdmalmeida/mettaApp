import { ImgControllerService } from './../util/img-controller.service';

import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { StorageUtilService } from '../util/storage-util.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {


  constructor(private controller: ImgControllerService,
    private storageService: StorageUtilService ) {}

             
    private subscription: Subscription;

    teste() {

      //this.storageService.clearAll().then( () => console.log('clear') );
      
      this.controller.capturaImagem().then(
          ()=> console.log('next')
         );

      //this.subscription.unsubscribe();
      
      //this.controller.limparDirApp().subscribe();
    }

}
