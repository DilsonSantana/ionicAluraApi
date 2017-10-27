import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { EscolhaPage } from '../pages/escolha/escolha';
import { CadastroPage } from '../pages/cadastro/cadastro';
import { AgendamentoService } from '../domain/agendamento/agendamento-service';
import { Storage } from '@ionic/storage';
import { AgendamentoDao } from '../domain/agendamento/agendamentoDao';
import { AgendamentosPage } from '../pages/agendamentos/agendamentos';
import { LoginPage } from '../pages/login/login';
import { UsuarioService } from '../domain/usuario/usuario-service';
import { PerfilPage } from '../pages/perfil/perfil';
import { DetalhesAgendamentoPage } from '../pages/detalhes-agendamento/detalhes-agendamento';
import { DatePipe } from '@angular/common';

function provideStorage() {
  return new Storage(['indexeddb'], {
    name: 'aluracar',
    storeName: 'agendamentos'
  })
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    EscolhaPage,
    CadastroPage,
    AgendamentosPage,
    LoginPage,
    PerfilPage,
    DetalhesAgendamentoPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    EscolhaPage,
    CadastroPage,
    AgendamentosPage,
    LoginPage,
    PerfilPage,
    DetalhesAgendamentoPage
  ],
  providers: [
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AgendamentoService,
    { provide: Storage, useFactory: provideStorage },
    AgendamentoDao,
    UsuarioService,
    DatePipe
  ]
})

export class AppModule { }
