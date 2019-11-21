import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { AudioUtilService } from '../audio-util.service';
import { NavParams } from '@ionic/angular';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit, OnDestroy {
  
  @Input() url2Show: string;

  constructor(private audioService: AudioUtilService,
    private navParams: NavParams,
    private platform: Platform) { 

    console.log('modalpage constructor');
    
    this.url2Show = navParams.get('localUrl2Show');
    console.log(this.url2Show);
  }

  ngOnInit() {
    this.platform.ready().then(() => {
      console.log('devia iniciar audio...');
      this.audioService.play();
    });
  }

  ngOnDestroy(): void {
    console.log('devia parar audio...');
    this.audioService.stop();
  }

}
