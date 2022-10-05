import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AlertController, LoadingController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-recuperar-contrasenia',
  templateUrl: './recuperar-contrasenia.page.html',
  styleUrls: ['./recuperar-contrasenia.page.scss'],
})
export class RecuperarContraseniaPage implements OnInit {

  formularioRecuperar: FormGroup;

  constructor(public fb: FormBuilder, private alertController: AlertController, public navCtrl: NavController, private loadingCtrl: LoadingController) {

    this.formularioRecuperar = this.fb.group({
      'nombre': new FormControl('',Validators.required),
      'email': new FormControl('',Validators.required)

    })

   }

  ngOnInit() {
  }

  async recuperarContrasenia(){

    var f = this.formularioRecuperar.value;

    if(this.formularioRecuperar.invalid){
      const alert = await this.alertController.create({
        header: 'Datos incompletos',
        message: 'Rellene todos los datos',
        buttons: ['Aceptar'],
      });
  
      await alert.present();

      return;
    }else{

      const loading = await this.loadingCtrl.create({
        message: f.nombre + ', se envio un correo para recuperar tu contraseña',
        duration: 2000,
      });
  
      loading.present();

      this.navCtrl.navigateRoot('/login')

      console.log('se envio un correo')
    }
  }

}
