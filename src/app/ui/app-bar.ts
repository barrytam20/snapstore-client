import { Component } from '@angular/core';
import { AuthService } from '../services'

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
      font-size: 24px;
      font-weight: 400;
      cursor: pointer;
    }
  `],
  template: `
    <header class="app-bar row middle-xs">
      <span [routerLink]="['']" class="logo col-xs-10">
        Retain
      </span>
      <nav class="col-xs-2">
        <div class="row middle-xs between-xs">
          <span [routerLink]="['', 'about']" class="link">About</span>
          <span [routerLink]="['', 'images']" class="link">Images</span>
          <span 
            class="link"
            (click)="signout()"
          >
            signout
          </span>
        </div>
      </nav>
    </header>
  `
})
export class AppBar {
  constructor(
    private authService: AuthService
  ) {}

  signout(){
    this.authService.signout();
  }
}
