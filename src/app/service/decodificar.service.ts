import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DecodificarService {
  //alfabeto para fazer a troca de caracteres e a busca do index correspondente
  alfabeto = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 ";
  //tabela para a criptografia de vigenere
  tabelaConversao = [  'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 ',  'BCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 A',  'CDEFGHIJKLMNOPQRSTUVWXYZ0123456789 AB',  'DEFGHIJKLMNOPQRSTUVWXYZ0123456789 ABC',  'EFGHIJKLMNOPQRSTUVWXYZ0123456789 ABCD',  'FGHIJKLMNOPQRSTUVWXYZ0123456789 ABCDE',  'GHIJKLMNOPQRSTUVWXYZ0123456789 ABCDEF',  'HIJKLMNOPQRSTUVWXYZ0123456789 ABCDEFG',  'IJKLMNOPQRSTUVWXYZ0123456789 ABCDEFGH',  'JKLMNOPQRSTUVWXYZ0123456789 ABCDEFGHI',  'KLMNOPQRSTUVWXYZ0123456789 ABCDEFGHIJ',  'LMNOPQRSTUVWXYZ0123456789 ABCDEFGHIJK',  'MNOPQRSTUVWXYZ0123456789 ABCDEFGHIJKL',  'NOPQRSTUVWXYZ0123456789 ABCDEFGHIJKLM',  'OPQRSTUVWXYZ0123456789 ABCDEFGHIJKLMN',  'PQRSTUVWXYZ0123456789 ABCDEFGHIJKLMNO',  'QRSTUVWXYZ0123456789 ABCDEFGHIJKLMNOP',  'RSTUVWXYZ0123456789 ABCDEFGHIJKLMNOPQ',  'STUVWXYZ0123456789 ABCDEFGHIJKLMNOPQR',  'TUVWXYZ0123456789 ABCDEFGHIJKLMNOPQRS',  'UVWXYZ0123456789 ABCDEFGHIJKLMNOPQRST',  'VWXYZ0123456789 ABCDEFGHIJKLMNOPQRSTU',  'WXYZ0123456789 ABCDEFGHIJKLMNOPQRSTUV',  'XYZ0123456789 ABCDEFGHIJKLMNOPQRSTUVW',  'YZ0123456789 ABCDEFGHIJKLMNOPQRSTUVWX',  'Z0123456789 ABCDEFGHIJKLMNOPQRSTUVWXY',  '0123456789 ABCDEFGHIJKLMNOPQRSTUVWXYZ',  '123456789 ABCDEFGHIJKLMNOPQRSTUVWXYZ0',  '23456789 ABCDEFGHIJKLMNOPQRSTUVWXYZ01',  '3456789 ABCDEFGHIJKLMNOPQRSTUVWXYZ012',  '456789 ABCDEFGHIJKLMNOPQRSTUVWXYZ0123',  '56789 ABCDEFGHIJKLMNOPQRSTUVWXYZ01234',  '6789 ABCDEFGHIJKLMNOPQRSTUVWXYZ012345',  '789 ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456',  '89 ABCDEFGHIJKLMNOPQRSTUVWXYZ01234567',  '9 ABCDEFGHIJKLMNOPQRSTUVWXYZ012345678',  ' ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789']

  constructor() { }

  getCifraCesar(value:string,chave:string):string{
    
    return null;
  }
  getCifraVigenere(value:string,chave:string):string{

    return  this.decriptografarVigenere(value.toUpperCase(),chave.toUpperCase());
  }
  getCercaTrilho(value:string,chave:string):string{
    return null;
  }

  //funcao para achar a posicao do caracter no array
 findIndex(arr, caracter) {
  for(let i = 0; i < arr.length; i = i + 1) {
      if(arr[i] == caracter){
         return i
      }
  }
}
//funcao que retorna o caracter original com base na chave e o caracter criptografado
 backCaracterVigenere(caracterTexto, caracterChave){
  let indexL = this.findIndex(this.alfabeto, caracterChave);
  let index = this.findIndex(this.tabelaConversao[indexL], caracterTexto);
  
  return this.alfabeto[index];
}

//funcao principal que decriptografa a mensagem
 decriptografarVigenere(texto_para_descriptografar,chave){
  let texto_decriptografado = '';
  for(let i = 0; i < texto_para_descriptografar.length; i = i + 1) {
      texto_decriptografado += this.backCaracterVigenere(texto_para_descriptografar[i], chave[i])
  }
  
  return texto_decriptografado;
}
}
