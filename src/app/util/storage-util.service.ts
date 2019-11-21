import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Storage } from '@ionic/storage';
import { Relacao } from '../vos/Relacao';

@Injectable({
  providedIn: 'root'
})
export class StorageUtilService {

  constructor(private storage:Storage) { 

    if(storage.ready){
      console.log('storage ready');
    }
  }

  private ST_ID_RELACOES = 'relacoes';  


  async readRelacoes(): Promise<Array<Relacao>> {
    
    let result = await this.storage.get(this.ST_ID_RELACOES);
    if(result ==null){
      result = new Array<Relacao>();
    }
    return result;
  } 


  async addRelacao(jsonStr): Promise<boolean> {
    
    
    this.readRelacoes().then( (relacoes) => {      
      let result = relacoes;      
      result.push(jsonStr);
      this.storage.set(this.ST_ID_RELACOES, result);      
      return true;
    });

    return false;
     
  }

  clearAll(): Promise<void> {
    return this.storage.clear();
  }

}