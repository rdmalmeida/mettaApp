import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Relacao } from '../vos/Relacao';

@Injectable({
  providedIn: 'root'
})
export class StorageUtilService {

  constructor(private storage:Storage) { 

    if(storage.ready){
      console.log('storage ready');
      //this.clearAll();
    }
  }

  private ST_ID_RELACOES = 'relacoes';  


  async readRelacoes(): Promise<Map<String, Relacao>> {
    
    let result = await this.storage.get(this.ST_ID_RELACOES);
    console.log('result::'+result);

    if(result ==null){
      result = new Map<String, Relacao>();
    } else {
      result = new Map(JSON.parse(result));
      
    }
    
    return result;
  } 

  async readRelacoesAsArray(): Promise<Array<Relacao>> {
    let retorno = new Array();
    await this.readRelacoes().then(map => { 
      if(map.size>0)
        retorno = Array.from(map.values());
    });
    return retorno;
  } 

  async addRelacao(relacao: Relacao): Promise<boolean> {

    this.readRelacoes().then( (myMap) => {   
      //console.log('addRelacao::myMap::'+ myMap);   
      myMap.set(relacao.uriImagem, relacao);
      const convertido = JSON.stringify(Array.from(myMap));
      //console.log('addRelacao::convertido::'+convertido);
      this.storage.set(this.ST_ID_RELACOES, convertido);      
      return true;
    });

    return false;
     
  }

  async updateRelacao(novaRelacao: Relacao): Promise<boolean> {

    this.readRelacoes().then( (mapaRelacoes) => {
      //console.log('updateRelacao::mapaRelacoes::'+ mapaRelacoes);
      mapaRelacoes.set(novaRelacao.uriImagem, novaRelacao);
      const convertido = JSON.stringify(Array.from(mapaRelacoes));
      this.storage.set(this.ST_ID_RELACOES, convertido);      
      return true;
    });

    return false;
  }

  clearAll(): Promise<void> {
    return this.storage.clear();
  }

}