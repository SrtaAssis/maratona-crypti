import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { CodificarService } from './service/codificar.service';
import { DecodificarService } from './service/decodificar.service';
import { ToastrService } from 'ngx-toastr';

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
  buttonCodificar:string;
  buttonDecodificar:string;

  constructor(
    private codificarService:CodificarService,
    private decodificarService:DecodificarService,
    private toastr: ToastrService

  ) { }

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm(): void {
    this.formEntrada = new FormGroup({
      'textoEntrada': new FormControl(this.value, [Validators.required]),
    });
    this.formConfiguracao = new FormGroup({
      'tipoCifra': new FormControl(this.value, [Validators.required]),
      'chave': new FormControl(this.value, [Validators.required]),

    });
    this.formSaida = new FormGroup({
      'textoSaida': new FormControl('', [Validators.required]),
    });
  }

  codificar():any{
    if( !this.isvalidForms()) {
      return false;
    }
    this.buttonCodificar = "button-ativo"
    this.buttonDecodificar = ""

    if(this.tipoCifra.value == "cifraCesar"){
      this.textoSaida.setValue(this.codificarService.getCifraCesar(this.textoEntrada.value,this.chave.value)); 
    }
    else if(this.tipoCifra.value == "cifraVigenere"){
      this.textoSaida.setValue(this.codificarService.getCifraVigenere(this.textoEntrada.value,this.chave.value))

    }
    else if(this.tipoCifra.value == "cercaTrilho"){
      this.textoSaida.setValue(this.codificarService.getCercaTrilho(this.textoEntrada.value,this.chave.value))

    }

  }

  decodificar():any{
    
    if( !this.isvalidForms()) {
      console.log("nao valido");
      return false;
    }

    this.buttonCodificar = ""
    this.buttonDecodificar = "button-ativo"

    if(this.tipoCifra.value == "cifraCesar"){
      this.textoSaida.setValue(this.decodificarService.getCifraCesar(this.textoEntrada.value,this.chave.value))

    }
    else if(this.tipoCifra.value == "cifraVigenere"){
      this.textoSaida.setValue(this.decodificarService.getCifraVigenere(this.textoEntrada.value,this.chave.value))

    }
    else if(this.tipoCifra.value == "cercaTrilho"){
      this.textoSaida.setValue(this.decodificarService.getCercaTrilho(this.textoEntrada.value,this.chave.value))
    }
    
  }

  isvalidForms(){
    
    if( !this.formEntrada.valid) {
      this.toastr.error("O texto de entrada não é válido!")
      return false;
    }
    else if(!this.tipoCifra.valid){
      this.toastr.error("Por favor, selecione o tipo da cifra!")
      return false;
    }
    else if(!this.isChaveValid() || !this.chave.valid){
      this.toastr.error("A chave inserida não é válida!")
      return false;
    }
    else{
      return true;
    }
  }

  isChaveValid():boolean{
    if(this.tipoCifra.value == "cercaTrilho"){
      let numeros:any = {1: 0, 2: 0, 3:0, 4:0, 5:0, 6:0, 7:0};
      let chave = this.chave.value.split("");
      for(let i = 0; i<7 ; i++){
        numeros[chave[i]] ++;
        if(numeros[chave[i]] > 1){
          return false;
        }
      }
    }
    return true;
  }

  getPattern():string{
    if(this.tipoCifra.value == "cifraCesar"){
      return "[0-9]{1}"
    }
    else if(this.tipoCifra.value == "cifraVigenere"){
      const tamanho = this.textoEntrada.value.length ;      
      return `.{${tamanho}}`;
    }
    else if(this.tipoCifra.value == "cercaTrilho"){
      return "[1-7]{7}"
    }
    return '';

  }

  getMessage():string{
    if(this.tipoCifra.value == "cifraCesar"){
      return "A chave só pode conter um número"
    }
    else if(this.tipoCifra.value == "cifraVigenere"){
      const tamanho = this.textoEntrada.value.length ;      
      return `A chave tem que ter o mesmo tamanho que o texto de entrada.`;
    }
    else if(this.tipoCifra.value == "cercaTrilho"){      
      return 'A chave tem que ter todos os numeros de 1 a 7 sem repetir.';

    }
    return '';
  }

  get textoEntrada(): AbstractControl {
    return this.formEntrada.get('textoEntrada');
  }
  get tipoCifra(): AbstractControl {
    return this.formConfiguracao.get('tipoCifra');
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

