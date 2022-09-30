import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AlertController, LoadingController, NavController  } from '@ionic/angular';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})


export class RegistroPage implements OnInit {

  formularioregistro: FormGroup;

  constructor(public fb: FormBuilder, private alertController: AlertController, public navCtrl: NavController, private loadingCtrl: LoadingController) {

    this.formularioregistro = this.fb.group({
      'nombre': new FormControl("",Validators.required),
      'email': new FormControl("",Validators.required),
      'contrasenia': new FormControl("",Validators.required),
      'confirmarContrasenia': new FormControl("",Validators.required)
    })

   
   }

  ngOnInit() {
  }

  async registrarse(){

    var f = this.formularioregistro.value;

    if(this.formularioregistro.invalid){
      const alert = await this.alertController.create({
        header: 'Datos incompletos',
        message: 'Rellene todos los datos',
        buttons: ['Aceptar'],
      });
  
      await alert.present();

      return;
    }

    if(f.contrasenia != f.confirmarContrasenia){
      const alert = await this.alertController.create({
        header: 'Las contraseña no coinside',
        buttons: ['Aceptar'],
      });
  
      await alert.present();

      return;
    }else{
      var usuario = {
        nombre: f.nombre,
        email: f.email,
        contrasenia: f.contrasenia,
        confirmarContrasenia: f.confirmarContrasenia
      }
      localStorage.setItem('usuario', JSON.stringify(usuario));
  
  
      console.log('Registro echo');

      const loading = await this.loadingCtrl.create({
        message: f.nombre + ', tu registro fue todo un exito!!',
        duration: 2000,
      });
  
      loading.present();

      this.navCtrl.navigateRoot('login');

    }

    
    
  }






  

}
