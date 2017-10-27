import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Agendamento } from '../../domain/agendamento/agendamento';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'page-detalhes-agendamento',
  templateUrl: 'detalhes-agendamento.html'
})
export class DetalhesAgendamentoPage {

public dia: string;
public mes: string;
public ano: string;

  public agendamento: Agendamento;
  public data: Date;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public datepipe: DatePipe) {

    this.agendamento = this.navParams.get('agendamento');
    this.ano = this.agendamento.data.substring(0,4);
    this.mes = this.agendamento.data.substring(5,7);
    this.dia = this.agendamento.data.substring(9,10);

    this.data = new Date( +this.ano , +this.mes, +this.dia);
    
    this.agendamento.data = this.datepipe.transform(this.data, 'dd/MM/yyyy')
  }
}
