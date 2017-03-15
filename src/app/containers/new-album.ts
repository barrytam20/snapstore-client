import { Component } from '@angular/core';
import * as Materialize from "angular2-materialize";
import { MaterializeDirective } from "angular2-materialize";
import { Router } from '@angular/router';
import { UserStore } from '../stores/user-store';
import { UserStoreHelper } from '../services/utils/user-store-helper';

@Component({
  selector: 'new-album-container',
  template: `
    <div class="input-field col s12">
      <input 
        id="album_name" 
        type="text" 
        class="validate" 
        [attr.disabled]="isDisabled"
        style="text-align:center;"
        [(ngModel)]="albumName"
        (keyup.enter)="createNewAlbum()"
      >
      <label for="album_name">album name</label>
      <button 
        class="btn waves-effect waves-light" 
        type="submit"
        name="action"
        (click)="createNewAlbum()">create ablum
        <i class="material-icons right">note_add</i>
      </button>
      <p>{{alreadyExistsMessage}}</p>
    </div>
  `,
  styles:[`
      .input-field {
        text-align: center;
      }
  `]
})
export class NewAlbum {
  isDisabled;
  users = [];
  alreadyExistsMessage;
  albumName;

  constructor(
    private store: UserStore,
    private userStoreHelper: UserStoreHelper, 
    private router: Router
    ){
    this.store.changes.pluck('users')
      .subscribe((users: any) =>  this.users = users); 
    }

  createNewAlbum(){
    if(this.users.includes(this.albumName)){ 
      this.alreadyExistsMessage = `album with name ${this.albumName} already exists, please choose another one`;
    } else {
      Materialize.toast(`viewing new album: ${this.albumName}`, 2000);
      this.userStoreHelper.add('users',this.albumName);
      this.router.navigate([`images/${this.albumName}`]);
    }
  }
}
