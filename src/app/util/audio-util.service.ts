import { Injectable, OnInit } from '@angular/core';

import { NativeAudio } from '@ionic-native/native-audio/ngx';


@Injectable({
  providedIn: 'root'
})
export class AudioUtilService implements OnInit{

  constructor(private nativeAudio: NativeAudio) {}

  ngOnInit(){
    console.log('construtor AudioUtilService');
  }

  public preload(){
    this.nativeAudio.preloadSimple('uniqueId1', 'assets/audio/meta_.mp3').then(this.onSuccess, this.onError);
    console.log('preloadeddd');
  }

  public play(){
    console.log('chamando tocar');
    this.nativeAudio.play('uniqueId1').then(this.onSuccess, this.onError)
    console.log('chamaei tocar');
  }

  public stop(){
    console.log('chamando parar');
    this.nativeAudio.stop('uniqueId1').then(this.onSuccess, this.onError);
    console.log('chamei parar');
  }

  public onSuccess(){
    console.debug('playing...');
  }

  public onError(){
    (e) => console.debug('deu ruim ' + e);
  }
}
