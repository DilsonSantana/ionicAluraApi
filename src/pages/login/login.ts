import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { UsuarioService } from '../../domain/usuario/usuario-service';


/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})

export class LoginPage {

  public email: string = 'joao@alura.com.br';
  public senha: string = 'alura123';
  private _alerta = this._alertCtrl.create();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _service: UsuarioService,
    private _alertCtrl: AlertController) {

    this._alerta = this._alertCtrl.create({
      title: 'Aviso',
      buttons: [{ text: 'Ok', handler: () => this.navCtrl.setRoot(LoginPage) }]
    })

  }

  efetuaLogin() {
    this._service
      .efetuaLogin(this.email, this.senha)
      .then((usuarioLogado) => {
        this.navCtrl.setRoot(HomePage);
      })
      .catch(err => {
        console.log(err['_body']);
        this._alerta.setSubTitle(err['_body']);
        this._alerta.present();

      });

  }

}
