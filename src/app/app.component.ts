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
    if( !this.formEntrada.valid || !this.formConfiguracao.valid) {
      console.log("nao valido");
      return false;
    }
    console.log(this.tipoCodigo.value);
    console.log(this.textoEntrada.value);
    
    if(this.tipoCodigo.value == "cifraCesar"){
      this.textoSaida.setValue(this.codigicarService.getCifraCesar(this.textoEntrada.value)); 
    }
    else if(this.tipoCodigo.value == "cifraVigenere"){
      this.textoSaida.setValue(this.codigicarService.getCifraVigenere(this.textoEntrada.value))

    }
    else if(this.tipoCodigo.value == "cercaTrilho"){
      this.textoSaida.setValue(this.codigicarService.getCercaTrilho(this.textoEntrada.value))

    }

  }

  decodificar():any{
    if( !this.formEntrada.valid || !this.formConfiguracao.valid) {
      console.log("nao valido");
      return false;
    }
    console.log(this.tipoCodigo.value);
    console.log(this.textoEntrada.value);

    if(this.tipoCodigo.value == "cifraCesar"){
      this.textoSaida.setValue(this.decodificarService.getCifraCesar(this.textoEntrada.value))

    }
    else if(this.tipoCodigo.value == "cifraVigenere"){
      this.textoSaida.setValue(this.decodificarService.getCifraVigenere(this.textoEntrada.value))

    }
    else if(this.tipoCodigo.value == "cercaTrilho"){
      this.textoSaida.setValue(this.decodificarService.getCercaTrilho(this.textoEntrada.value))
    }
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
      return '1{1}2{1}3{1}4{1}5{1}6{1}7{1}';

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

