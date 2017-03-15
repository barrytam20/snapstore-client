import { Component } from '@angular/core';
import { Router } from '@angular/router'
import { ImageService } from '../services';

@Component({
  selector: 'app-bar',
  styles: [`
    .app-bar {
      height: 100px;
      padding: 10px 30px;
      background-color: #00BCD4;
    }
    .logo {
      color: white;
      font-size: 30px;
      font-weight: 300;
      cursor: pointer;
    }
    .link {
      color: white;
      font-size: 10px;
      font-weight: 400;
      cursor: pointer;
    }
  `],
  template: `
    <header class="app-bar row left-xs">
      <span class="logo col-xs-10">
        <dropdown></dropdown>
      </span>
      <nav class="col-xs-2">
        <div class="row middle-xs between-xs">
          <span [routerLink]="['', 'newAlbum']" class="link">Create New Album</span>
        </div>
      </nav>
    </header>
  `
})
export class AppBar {
  constructor(
    private router: Router
  ) {}

}
