import { Injectable } from '@angular/core';

import { NativeAudio } from '@ionic-native/native-audio/ngx';
import { ModalController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class AudioUtilService {

  private readonly idAudioMetta = 'metta';

  private readonly mettaAudioUri = 'assets/audio/meta_.mp3';
  //private readonly mettaAudioUri = 'assets/audio/bass.mp3';
  //private readonly mettaAudioUri = 'assets/audio/baruio.mp3';
  
  constructor(private nativeAudio: NativeAudio,
    private modalController: ModalController) {
    console.log('construtor AudioUtilService');
  }
  
  public async preload(){
    this.nativeAudio.preloadSimple(this.idAudioMetta, this.mettaAudioUri).then(this.onSuccess, this.onError);
    console.log('preloadeddd');
  }

  public play(callback: Function){
    console.log('chamando tocar');
    this.nativeAudio.play(this.idAudioMetta, callback).then(this.onSuccess, this.onError);
    console.log('chamaei tocar');
  }

  public stop(){
    console.log('chamando parar');
    this.nativeAudio.stop(this.idAudioMetta).then(this.onSuccess, this.onError);
    console.log('chamei parar');
  }

  public onSuccess(){
    console.debug('onSuccess...');
  }

  public onError(){
    (e) => console.debug('on deu ruim ' + e);
  }
}
