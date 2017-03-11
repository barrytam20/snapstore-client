import { Component } from '@angular/core';
import { MaterializeDirective } from "angular2-materialize";
import { Router } from '@angular/router';
import { UserStore } from '../stores/user-store';

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
        (keyup.enter)="createNewAlbum($event)"
      >
      <label for="album_name">album name</label>
      {{alreadyExistsMessage}}
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

  constructor(
    private store: UserStore,
    private router: Router
    ){
    this.store.changes.pluck('users')
      .subscribe((users: any) =>  this.users = users); 
    }

  createNewAlbum(event){
    const albumName: string = event.target.value;
    this.users.includes(albumName) ? 
      this.alreadyExistsMessage = `album with name ${albumName} already exists, please choose another one` :
      this.router.navigate([`images/${albumName}`]);
  }
}
