import * as Materialize from "angular2-materialize";
import { MaterializeDirective } from "angular2-materialize";
import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Router } from '@angular/router';
import { ImageService } from '../services';
import { UserStore } from '../stores/user-store';

@Component({
    selector: 'dropdown',
    template: `
      <div class="row">
          <div class="input-field col s6">
                <select 
                  [ngModel]="initialValue" 
                  (ngModelChange)="change($event)" 
                  id="selectExample" 
                  materialize="material_select" 
                  [materializeSelectOptions]="users"
                >
                  <option value="" disabled selected>Select album</option>
                  <option *ngFor="let user of users" [value]="user">{{user}}</option>
              </select>
          </div>
      </div>
    `
})
export class Dropdown {
  @Input() initialValue: string;
  @Output() modelChange = new EventEmitter();

  users = [];

  constructor(
    private store: UserStore,
    private imageService: ImageService,
    private router: Router,
  ){
    this.imageService.getUsers(`/users`)
    .subscribe();

    this.store.changes.pluck('users')
    .subscribe((users: any) =>  this.users = users);    
  }
  
  change(newValue) {
    Materialize.toast(`view photos from ${newValue}`, 2000)
    this.modelChange.emit(newValue);
  }
}