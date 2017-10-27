import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { AgendamentoDao } from '../../domain/agendamento/agendamentoDao';
import { AgendamentoService } from '../../domain/agendamento/agendamento-service';
import { Agendamento } from '../../domain/agendamento/agendamento';
import { HomePage } from '../home/home';
import { DetalhesAgendamentoPage } from '../detalhes-agendamento/detalhes-agendamento';

@Component({
  selector: 'page-agendamentos',
  templateUrl: 'agendamentos.html'
})
export class AgendamentosPage {

  public agendamentos: Agendamento[];
  private _alerta = this._alertCtrl.create();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _dao: AgendamentoDao,
    private _service: AgendamentoService,
    private _alertCtrl: AlertController) {

    this._alerta = this._alertCtrl.create({
      title: 'Aviso',
      buttons: [{ text: 'Ok', handler: () => this.navCtrl.setRoot(HomePage) }]
    })

    this._dao
      .listarTodos()
      .then(agendamentos => {
        this.agendamentos = agendamentos;
      })
  }


  reenviar(agendamento: Agendamento) {
    this._service
      .reenvioAgenda(agendamento)
      .then(res => {
        if (res) {
          this._alerta.setSubTitle('Reenvio realizado com sucesso!')
          this._alerta.present();
        } else {
          this._alerta.setSubTitle('Tente novamente!');
          this._alerta.present();
        }
      })
      .catch(err => {
        this._alerta.setSubTitle('Erro ao fazer reenvio!');
        this._alerta.present();
        console.log(err);
      });
  }

  listarDetalhes(agendamento: Agendamento){
    console.log(agendamento);
    this.navCtrl.push(DetalhesAgendamentoPage, { agendamento: agendamento });
  }


}
