import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DecodificarService {

 constructor() { }

 getCifraCesar(value:string,chave:string):string{
   
   return this.decriptografarCesar(value.toUpperCase(),chave.toUpperCase());
 }
 getCifraVigenere(value:string,chave:string):string{

   return  this.decriptografarVigenere(value.toUpperCase(),chave.toUpperCase());
 }
 getCercaTrilho(value:string,chave:string):string{
   return this.decriptografarCercaTrilho(value.toUpperCase(),chave.toUpperCase());
 }

 //alfabeto para fazer a troca de caracteres e a busca do index correspondente
 alfabeto = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 ";
 //tabela para a criptografia de vigenere
 tabelaConversao = [  'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 ',  'BCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 A',  'CDEFGHIJKLMNOPQRSTUVWXYZ0123456789 AB',  'DEFGHIJKLMNOPQRSTUVWXYZ0123456789 ABC',  'EFGHIJKLMNOPQRSTUVWXYZ0123456789 ABCD',  'FGHIJKLMNOPQRSTUVWXYZ0123456789 ABCDE',  'GHIJKLMNOPQRSTUVWXYZ0123456789 ABCDEF',  'HIJKLMNOPQRSTUVWXYZ0123456789 ABCDEFG',  'IJKLMNOPQRSTUVWXYZ0123456789 ABCDEFGH',  'JKLMNOPQRSTUVWXYZ0123456789 ABCDEFGHI',  'KLMNOPQRSTUVWXYZ0123456789 ABCDEFGHIJ',  'LMNOPQRSTUVWXYZ0123456789 ABCDEFGHIJK',  'MNOPQRSTUVWXYZ0123456789 ABCDEFGHIJKL',  'NOPQRSTUVWXYZ0123456789 ABCDEFGHIJKLM',  'OPQRSTUVWXYZ0123456789 ABCDEFGHIJKLMN',  'PQRSTUVWXYZ0123456789 ABCDEFGHIJKLMNO',  'QRSTUVWXYZ0123456789 ABCDEFGHIJKLMNOP',  'RSTUVWXYZ0123456789 ABCDEFGHIJKLMNOPQ',  'STUVWXYZ0123456789 ABCDEFGHIJKLMNOPQR',  'TUVWXYZ0123456789 ABCDEFGHIJKLMNOPQRS',  'UVWXYZ0123456789 ABCDEFGHIJKLMNOPQRST',  'VWXYZ0123456789 ABCDEFGHIJKLMNOPQRSTU',  'WXYZ0123456789 ABCDEFGHIJKLMNOPQRSTUV',  'XYZ0123456789 ABCDEFGHIJKLMNOPQRSTUVW',  'YZ0123456789 ABCDEFGHIJKLMNOPQRSTUVWX',  'Z0123456789 ABCDEFGHIJKLMNOPQRSTUVWXY',  '0123456789 ABCDEFGHIJKLMNOPQRSTUVWXYZ',  '123456789 ABCDEFGHIJKLMNOPQRSTUVWXYZ0',  '23456789 ABCDEFGHIJKLMNOPQRSTUVWXYZ01',  '3456789 ABCDEFGHIJKLMNOPQRSTUVWXYZ012',  '456789 ABCDEFGHIJKLMNOPQRSTUVWXYZ0123',  '56789 ABCDEFGHIJKLMNOPQRSTUVWXYZ01234',  '6789 ABCDEFGHIJKLMNOPQRSTUVWXYZ012345',  '789 ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456',  '89 ABCDEFGHIJKLMNOPQRSTUVWXYZ01234567',  '9 ABCDEFGHIJKLMNOPQRSTUVWXYZ012345678',  ' ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789']


//funcao principal que decriptografa a mensagem
decriptografarVigenere(texto_para_descriptografar,chave){
 let texto_decriptografado = '';
 for(let i = 0; i < texto_para_descriptografar.length; i = i + 1) {
     texto_decriptografado += this.backCaracterVigenere(texto_para_descriptografar[i], chave[i])
 }
 
 return texto_decriptografado;
}

dividirTextoEmColunas(texto,chave){
 /**
  * a quantidade de colunas vai ser igual a:
  * a quantidade de caracteres da mensagem
  * dividida pela quantidade de números da chave
  * arredondado para o numero inteiro a cima, caso não seja uma divisão exata
  */
 let tamanhoColunas = Math.ceil(texto.length / chave.length);
 let textoDividido = [];
 
 for(let i = 0; i < chave.length; i = i + 1) {
     textoDividido.push(texto.slice(i*tamanhoColunas, i*tamanhoColunas+tamanhoColunas));
 }

 return textoDividido;
}

//função principal que descriptografa a mensagem
decriptografarCercaTrilho(texto_para_descriptografar, chave){
 let texto_dividido = this.dividirTextoEmColunas(texto_para_descriptografar, chave);
 let texto_decriptografado = '';

 /**
  * um loop para pegar os caracteres seguindo a ordem da chave
  */
 for (let i = 0; i < texto_dividido[0].length; i = i + 1){
     for(let j = 0; j < chave.length; j = j + 1){
         if(texto_dividido[chave[j]-1][i]){
             texto_decriptografado += texto_dividido[chave[j]-1][i]
         }
         else{
             texto_para_descriptografar += ' ';
         }
     }
 }

 return texto_decriptografado;
}
changeCaracter(caracter, chave){
 let index = this.findIndex(this.alfabeto, caracter) + chave;

 /**
  * se na subtracao, que e quando faz a decodificacao do texto, der um valor menor que 37,
  * fazer o modulo por 37 e somar com 37 para dar o correspondente a ele no valor positivo
  * e que pertanca ao array base do alfabeto
  */
 if (index < 0){
     index = index % 37 + 37;
 }

 /**
  * se na soma, que normalmente é quando faz a codificacao do texto, der um valor maior que 37,
  * fazer o modulo por 37 que vai dar o valor correspondente dentro dos limites do array base
  */
 if (index > 36){
     index = index % 37;
 }
 
 return this.alfabeto[index];
}

//funcao principal que decriptografa a mensagem
decriptografarCesar(texto_para_descriptografar, chave){
 let texto_decriptografado = '';
 //loop para mudar todos os caracteres, um a um, com base na chave digitada
 for(let i = 0; i < texto_para_descriptografar.length; i = i + 1) {
     texto_decriptografado += this.changeCaracter(texto_para_descriptografar[i], -chave)
 }
 
 return texto_decriptografado;
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
}
