import { Carro } from '../carro/carro';

export class Agendamento {
    constructor(
        public carro: Carro, 
        public valor: number = 0,
        public endereco: string = '', 
        public nome: string = '',
        public email: string = '',
        public data: string = new Date().toISOString(),
        public confirmado: boolean = false ){}
}