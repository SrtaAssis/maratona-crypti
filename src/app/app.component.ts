import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { CodigicarService } from './service/codigicar.service';
import { DecodificarService } from './service/decodificar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  formEntrada:FormGroup;
  formConfiguracao:FormGroup;
  formSaida:FormGroup;
  value:any;
  constructor(
    private codigicarService:CodigicarService,
    private decodificarService:DecodificarService

  ) { }

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm(): void {
    this.formEntrada = new FormGroup({
      'textoEntrada': new FormControl(this.value, [Validators.required]),
    });
    this.formConfiguracao = new FormGroup({
      'tipoCodigo': new FormControl(this.value, [Validators.required]),
      'chave': new FormControl(this.value, [Validators.required]),

    });
    this.formSaida = new FormGroup({
      'textoSaida': new FormControl('', [Validators.required]),
    });
  }

  codificar():any{
    console.log(this.isChaveValid());

    if( !this.formEntrada.valid || !this.formConfiguracao.valid || !this.isChaveValid()) {
      console.log("nao valido");
      return false;
    }
    console.log(this.tipoCodigo.value);
    console.log(this.textoEntrada.value);
    
    if(this.tipoCodigo.value == "cifraCesar"){
      this.textoSaida.setValue(this.codigicarService.getCifraCesar(this.textoEntrada.value,this.chave.value)); 
    }
    else if(this.tipoCodigo.value == "cifraVigenere"){
      this.textoSaida.setValue(this.codigicarService.getCifraVigenere(this.textoEntrada.value,this.chave.value))

    }
    else if(this.tipoCodigo.value == "cercaTrilho"){
      this.textoSaida.setValue(this.codigicarService.getCercaTrilho(this.textoEntrada.value,this.chave.value))

    }

  }

  decodificar():any{
    console.log(this.isChaveValid());
    
    if( !this.formEntrada.valid || !this.formConfiguracao.valid || !this.isChaveValid()) {
      console.log("nao valido");
      return false;
    }
    console.log(this.tipoCodigo.value);
    console.log(this.textoEntrada.value);

    if(this.tipoCodigo.value == "cifraCesar"){
      this.textoSaida.setValue(this.decodificarService.getCifraCesar(this.textoEntrada.value,this.chave.value))

    }
    else if(this.tipoCodigo.value == "cifraVigenere"){
      this.textoSaida.setValue(this.decodificarService.getCifraVigenere(this.textoEntrada.value,this.chave.value))

    }
    else if(this.tipoCodigo.value == "cercaTrilho"){
      this.textoSaida.setValue(this.decodificarService.getCercaTrilho(this.textoEntrada.value,this.chave.value))
    }
    
  }

  isChaveValid():boolean{
    if(this.tipoCodigo.value == "cercaTrilho"){
      console.log("cercaTrilho");
      
      let numeros:any = {1: 0, 2: 0, 3:0, 4:0, 5:0, 6:0, 7:0};
      let chave = this.chave.value.split("");
      for(let i = 0; i<7 ; i++){
        numeros[chave[i]] ++;
        console.log(chave[i]);

        if(numeros[chave[i]] > 1){
          return false;
        }
      }
    }
    return true;
  }

  getPattern():string{
    if(this.tipoCodigo.value == "cifraCesar"){
      return "[0-9]{1}"
    }
    else if(this.tipoCodigo.value == "cifraVigenere"){
      const tamanho = this.textoEntrada.value.length ;      
      return `.{${tamanho}}`;
    }
    else if(this.tipoCodigo.value == "cercaTrilho"){
      return "[1-7]{7}"
    }
    return '';

  }
  getMessage():string{
    if(this.tipoCodigo.value == "cifraCesar"){
      return "A chave só pode conter um número"
    }
    else if(this.tipoCodigo.value == "cifraVigenere"){
      const tamanho = this.textoEntrada.value.length ;      
      return `A chave tem que ter o mesmo tamanho que o texto de entrada.`;
    }
    else if(this.tipoCodigo.value == "cercaTrilho"){      
      return 'A chave tem que ter todos os numeros de 1 a 7 sem repetir.';

    }
    return '';
  }

  get textoEntrada(): AbstractControl {
    return this.formEntrada.get('textoEntrada');
  }
  get tipoCodigo(): AbstractControl {
    return this.formConfiguracao.get('tipoCodigo');
  }
  get chave(): AbstractControl {
    return this.formConfiguracao.get('chave');
  }
  get textoSaida(): AbstractControl {
    return this.formSaida.get('textoSaida');
  }

  get registerE() {
    return this.formEntrada.controls;
  }
  get registerG() {
    return this.formConfiguracao.controls;
  }
  get registerS() {
    return this.formSaida.controls;
  }

}

