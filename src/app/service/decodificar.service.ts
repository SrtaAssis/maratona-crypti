import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DecodificarService {

  constructor() { }

  getCifraCesar(value:string):string{
    return 'teste';
  }
  getCifraVigenere(value:string):string{
    return null;
  }
  getCercaTrilho(value:string):string{
    return null;
  }
}
