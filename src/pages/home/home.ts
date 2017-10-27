import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import { EscolhaPage } from '../escolha/escolha';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  public carros;

  constructor(
    public _loadingCtrl: LoadingController,
    public navCtrl: NavController,
    private _http: Http,
    public _alertCtrl: AlertController) { }

  ngOnInit() {
    let loader = this._loadingCtrl.create({
      content: 'Buscando novos carros, Aguarde...'
    });

    loader.present();

    this._http
      .get('http://aluracar.herokuapp.com/')
      .map(res => res.json())
      .toPromise()
      .then(carros => {
        loader.dismiss();
        this.carros = carros
      })
      .catch(err => {
        console.log(err);
        loader.dismiss();
        this._alertCtrl
          .create({
            title: 'Falha na conexão',
            buttons: [{ text: 'Estou ciente' }],
            subTitle: 'Não foi possivel exibir a lista de carros. Tente mais tarde.'
          }).present();
      });

  }

  selecionar(carro) { 

    this.navCtrl.push(EscolhaPage , { carroSelecionado: carro });
  }

}
