import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UsuarioService } from '../../domain/usuario/usuario-service';
import { Camera } from 'ionic-native';

@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html'
})
export class PerfilPage implements OnInit {

  public url: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public _service: UsuarioService) { }

  get usuarioLogado() {
    return this._service.getUsuarioLogado();
  }

  ngOnInit(): void {
    this.url = this._service.obterAvatar();
  }

  tirarFoto() {
    Camera.getPicture({
      destinationType: Camera.DestinationType.FILE_URI,
      saveToPhotoAlbum: true,
      correctOrientation: true
    }).then(url => {
      this._service.gravarAvatar(url);
      this.url = url;
    }).catch(err => console.log(err));
  }

  
}
