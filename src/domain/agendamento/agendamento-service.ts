import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Agendamento } from '../agendamento/agendamento';
import { AgendamentoDao } from '../../domain/agendamento/agendamentoDao';

@Injectable()
export class AgendamentoService {

    constructor(private _http: Http, private _dao: AgendamentoDao) { }


    agenda(agendamento: Agendamento) {

        let api = `https://aluracar.herokuapp.com/salvarpedido?carro=${agendamento.carro.nome}&preco=${agendamento.carro.preco}&nome=${agendamento.nome}&endereco=${agendamento.endereco}&email=${agendamento.email}&dataAgendamento=${agendamento.data}`;

        return this._dao.ehAgendamentoDuplicado(agendamento)
            .then(existe => {
                if (existe) throw new Error('Este agendamento já foi realizado');
                return this._http
                    .get(api)
                    .toPromise()
                    .then(() => agendamento.confirmado = true, err => console.log(err))
                    .then(() => this._dao.salva(agendamento))
                    .then(() => { return agendamento.confirmado })
            })
    }

    reenvioAgenda(agendamento: Agendamento) {

        let api = `https://aluracar.herokuapp.com/salvarpedido?carro=${agendamento.carro.nome}&preco=${agendamento.carro.preco}&nome=${agendamento.nome}&endereco=${agendamento.endereco}&email=${agendamento.email}&dataAgendamento=${agendamento.data}`;

        return this._http
            .get(api)
            .toPromise()
            .then(() => agendamento.confirmado = true, err => console.log(err))
            .then(() => this._dao.salva(agendamento))
            .then(() => { return agendamento.confirmado })

    }

}