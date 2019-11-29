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
      //this.updateRelacao(new Relacao('a', 'b', '', '', ''));
      //this.clearAll();
      
    }
  }

  private ST_ID_RELACOES = 'relacoes';  


  async readRelacoes(): Promise<Map<String, Relacao>> {
    
    let result = await this.storage.get(this.ST_ID_RELACOES);
    if(result ==null){
      result = new Map<String, Relacao>();
    }
    return result;
  } 

  async readRelacoesAsArray(): Promise<Array<Relacao>> {
    let retorno = new Array();
    await this.readRelacoes().then(map => { retorno = Array.from(map.values) } );
    return retorno;
  } 

  async addRelacao(relacao: Relacao): Promise<boolean> {

    this.readRelacoes().then( (myMap) => {      
      myMap.set(relacao.uriImagem, relacao);
      this.storage.set(this.ST_ID_RELACOES, myMap);      
      return true;
    });

    return false;
     
  }

  async updateRelacao(novaRelacao: Relacao): Promise<boolean> {

    this.readRelacoes().then( (relacoes) => {      
      relacoes.forEach(this.logArrayElements);            
      return true;
    });

    return false;
  }

  logArrayElements(element:Relacao, index, array) {
    console.log("a[" + index + "] = " + element.uriImagem);
    //result.push(jsonStr);
    //  this.storage.set(this.ST_ID_RELACOES, result);      
  }

  clearAll(): Promise<void> {
    return this.storage.clear();
  }

}