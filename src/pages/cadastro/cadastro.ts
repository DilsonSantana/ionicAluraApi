import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Carro } from '../../domain/carro/carro';
import { Agendamento } from '../../domain/agendamento/agendamento';
import { HomePage } from '../home/home';
import { AgendamentoService } from '../../domain/agendamento/agendamento-service';
import { DatePicker } from 'ionic-native';

@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html'
})

export class CadastroPage {


  public carro: Carro;
  public precoTotal;
  public agendamento: Agendamento;
  private _alerta = this._alertCtrl.create();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _service: AgendamentoService,
    private _alertCtrl: AlertController) {

    this.carro = this.navParams.get('carro');
    this.precoTotal = this.navParams.get('precoTotal');
    this.agendamento = new Agendamento(this.carro, this.carro.preco);
    this._alerta = this._alertCtrl.create({
      title: 'Aviso',
      buttons: [{ text: 'Ok', handler: () => this.navCtrl.setRoot(HomePage) }]
    })
  }

  agenda() {

    if (!this.agendamento.nome || !this.agendamento.endereco || !this.agendamento.email) {
      this._alertCtrl.create({
        title: 'Preenchimento Obrigatório',
        subTitle: 'Você deve preencher todas as informações',
        buttons: [{ text: 'Ok'}]
      }).present();

    } else {

      this._service
        .agenda(this.agendamento)
        .then(confirmado => {
          confirmado ? 
            this._alerta.setSubTitle('Agendamento realizado com sucesso.') :
            this._alerta.setSubTitle('Erro ao fazer agendamento.');
          this._alerta.present();  
        })
        .catch(err => {
          this._alerta.setSubTitle(err.message);
          this._alerta.present();
        })
    }
  }

  selecionaData(){
    DatePicker.show({
      date: new Date(),
      mode: 'date'
    })
    .then(data => this.agendamento.data = data.toISOString());
  }

}
