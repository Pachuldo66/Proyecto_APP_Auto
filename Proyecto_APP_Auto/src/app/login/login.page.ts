import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AlertController, LoadingController, NavController } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  formularioLogin: FormGroup;

  constructor(public fb: FormBuilder, private alertController: AlertController, public navCtrl: NavController, private loadingCtrl: LoadingController ) { 

    this.formularioLogin = this.fb.group({
      'nombre': new FormControl("",Validators.required),
      'contrasenia': new FormControl("",Validators.required)
    })
  }

  ngOnInit() {
  }

  async ingresar(){
    
    var f = this.formularioLogin.value;

    var usuario = JSON.parse(localStorage.getItem('usuario'));

    if(usuario.nombre == f.nombre && usuario.contrasenia == f.contrasenia){
      console.log('Ingresado')

      this.navCtrl.navigateRoot('#')

      const loading = await this.loadingCtrl.create({
        message: 'Bienvenido ' + f.nombre,
        duration: 2000,
      });
  
      loading.present();
      
    }else{
      const alert = await this.alertController.create({
        header: 'Datos incorrectos',
        message: 'Los datos ingresados no coinsiden',
        buttons: ['Aceptar'],
      });
  
      await alert.present();
    }

  }

}
