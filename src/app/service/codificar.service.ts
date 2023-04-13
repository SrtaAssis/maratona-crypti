import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CodificarService {


constructor() { }

getCifraCesar(value:string,chave:string):string{
  return this.criptografarCesar(value.toUpperCase(),chave.toUpperCase());
}
getCifraVigenere(value:string,chave:string):string{
  return this.criptografarVigenere(value.toUpperCase(),chave.toUpperCase());
}
getCercaTrilho(value:string,chave:string):string{
  return this.criptografarCercaTrilho(value.toUpperCase(),chave.toUpperCase());
}

//alfabeto para fazer a troca de caracteres e a busca do index correspondente
alfabeto = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 ";
//tabela para a criptografia de vigenere
tabelaConversao = [  'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 ',  'BCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 A',  'CDEFGHIJKLMNOPQRSTUVWXYZ0123456789 AB',  'DEFGHIJKLMNOPQRSTUVWXYZ0123456789 ABC',  'EFGHIJKLMNOPQRSTUVWXYZ0123456789 ABCD',  'FGHIJKLMNOPQRSTUVWXYZ0123456789 ABCDE',  'GHIJKLMNOPQRSTUVWXYZ0123456789 ABCDEF',  'HIJKLMNOPQRSTUVWXYZ0123456789 ABCDEFG',  'IJKLMNOPQRSTUVWXYZ0123456789 ABCDEFGH',  'JKLMNOPQRSTUVWXYZ0123456789 ABCDEFGHI',  'KLMNOPQRSTUVWXYZ0123456789 ABCDEFGHIJ',  'LMNOPQRSTUVWXYZ0123456789 ABCDEFGHIJK',  'MNOPQRSTUVWXYZ0123456789 ABCDEFGHIJKL',  'NOPQRSTUVWXYZ0123456789 ABCDEFGHIJKLM',  'OPQRSTUVWXYZ0123456789 ABCDEFGHIJKLMN',  'PQRSTUVWXYZ0123456789 ABCDEFGHIJKLMNO',  'QRSTUVWXYZ0123456789 ABCDEFGHIJKLMNOP',  'RSTUVWXYZ0123456789 ABCDEFGHIJKLMNOPQ',  'STUVWXYZ0123456789 ABCDEFGHIJKLMNOPQR',  'TUVWXYZ0123456789 ABCDEFGHIJKLMNOPQRS',  'UVWXYZ0123456789 ABCDEFGHIJKLMNOPQRST',  'VWXYZ0123456789 ABCDEFGHIJKLMNOPQRSTU',  'WXYZ0123456789 ABCDEFGHIJKLMNOPQRSTUV',  'XYZ0123456789 ABCDEFGHIJKLMNOPQRSTUVW',  'YZ0123456789 ABCDEFGHIJKLMNOPQRSTUVWX',  'Z0123456789 ABCDEFGHIJKLMNOPQRSTUVWXY',  '0123456789 ABCDEFGHIJKLMNOPQRSTUVWXYZ',  '123456789 ABCDEFGHIJKLMNOPQRSTUVWXYZ0',  '23456789 ABCDEFGHIJKLMNOPQRSTUVWXYZ01',  '3456789 ABCDEFGHIJKLMNOPQRSTUVWXYZ012',  '456789 ABCDEFGHIJKLMNOPQRSTUVWXYZ0123',  '56789 ABCDEFGHIJKLMNOPQRSTUVWXYZ01234',  '6789 ABCDEFGHIJKLMNOPQRSTUVWXYZ012345',  '789 ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456',  '89 ABCDEFGHIJKLMNOPQRSTUVWXYZ01234567',  '9 ABCDEFGHIJKLMNOPQRSTUVWXYZ012345678',  ' ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789']


//funcao principal que criptografa a mensagem
criptografarVigenere(texto_para_criptografar, chave){
let texto_criptografado = '';

//loop para mudar todos os caracteres, um a um, com base na chave digitada
for(let i = 0; i < texto_para_criptografar.length; i = i + 1) {
    texto_criptografado += this.changeCaracterVigenere(texto_para_criptografar[i], chave[i])
}

return texto_criptografado;
}
//função para dividir o texto em linhas com base no tamanho da chave digitada
dividirTextoEmLinhas(texto_para_criptografar, chave){
/**
 * a quantidade de linhas vai ser igual a:
 * a quantidade de caracteres da mensagem
 * dividida pela quantidade de números da chave
 * arredondado para o número inteiro a cima, caso não seja uma divisão exata
 */
let tamanholinhas = Math.ceil(texto_para_criptografar.length / chave.length);
let textoDividido = [];

for(let i = 0; i < tamanholinhas; i = i + 1) {
    textoDividido.push(texto_para_criptografar.slice(i*chave.length, i*chave.length + chave.length));
}

return textoDividido;
}

//função principal que criptografa a mensagem
criptografarCercaTrilho(texto_para_criptografar, chave){
let texto_criptografado = '';
let texto_dividido = this.dividirTextoEmLinhas(texto_para_criptografar, chave);

/**
 * um loop para pegar as colunas de acordo com a sequência indicada na chave
 * e armazenar no novo texto criptografado
 */
for (let i = 0; i < chave.length; i = i + 1){
    for(let j = 0; j < texto_dividido.length; j = j + 1){
        let indexI = this.findIndex(chave, i+1);
        if(texto_dividido[j][indexI]){
            texto_criptografado += texto_dividido[j][indexI]
        }
        else{
            texto_criptografado += ' ';
        }
    }
}

return texto_criptografado;
}
changeCaracter(caracter, chave){
console.log(caracter);
console.log(chave);

let index = Number(this.findIndex(this.alfabeto, caracter)) + Number(chave);

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
console.log(caracter);
console.log(index);
return this.alfabeto[index];
}

//funcao principal que criptografa a mensagem
criptografarCesar(texto_para_criptografar, chave){
let texto_criptografado = '';

//loop para mudar todos os caracteres, um a um, com base na chave digitada
for(let i = 0; i < texto_para_criptografar.length; i = i + 1) {
    texto_criptografado += this.changeCaracter(texto_para_criptografar[i], chave)
}

return texto_criptografado;
}

//funcao para mudar o caracter de acordo com a coordenada dele e da chave
changeCaracterVigenere(caracterTexto, caracterChave){
  let indexL = this.findIndex(this.alfabeto, caracterTexto);
  let indexC = this.findIndex(this.alfabeto, caracterChave);
  
  return this.tabelaConversao[indexL][indexC];
  }
  //funcao para achar a posicao do caracter no array
  findIndex(arr, caracter) {
    for(let i = 0; i < arr.length; i = i + 1) {
        if(arr[i] == caracter){
           return i
        }
    }
  }
}
