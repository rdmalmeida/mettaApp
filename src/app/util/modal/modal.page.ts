import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { AudioUtilService } from '../audio-util.service';
import { NavParams, ModalController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { Relacao } from 'src/app/vos/Relacao';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit, OnDestroy {
  
  @Input() item: Relacao;

  constructor(private audioService: AudioUtilService,
    private navParams: NavParams,
    private platform: Platform,
    private modalController: ModalController) { 

    console.log('modalpage constructor');
    
    this.item = navParams.get('item');
    
    console.log(this.item);
  }

  ngOnInit() {
    this.platform.ready().then(() => {
      console.log('devia iniciar audio...');
      this.audioService.play( ()=> { 
        
        this.modalController.dismiss();
        this.item.counter++;

      });
    });
  }

  ngOnDestroy(): void {
    console.log('devia parar audio...');
    this.audioService.stop();
  }

  
  close(){
    this.modalController.dismiss();
  }

}
