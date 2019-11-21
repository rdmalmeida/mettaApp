export class Relacao {
    
     uriImagem     : string;
     nativePath    : string;
     localFile     : string;
     localUrl2Show : string;
     counter       : number;

    constructor(uriImagem, nativePath, arq, localUrl2Show, counter) {
        this.uriImagem = uriImagem;
        this.nativePath = nativePath;
        this.localFile = arq;
        this.localUrl2Show= localUrl2Show; 
        this.counter = counter;
    }

   /* toString(){
        return 'uriImagem: ' + this.uriImagem + 
        'nativePath: ' + this.nativePath + 
        'localFile: ' + this.localFile +
        'localUrl2Show: ' + this.localUrl2Show +
        'counter: ' + this.counter;
    }*/


}