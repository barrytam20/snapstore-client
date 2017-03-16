import { Component } from '@angular/core';
import { MaterializeDirective } from "angular2-materialize";
  
@Component({
  selector: 'main-container',
  template: `
    <div class="main-container">
      <app-bar></app-bar>
      <main class="main">
         <router-outlet></router-outlet>
          <div class="parallax-container">
            <div class="parallax" materialize="parallax"><img src="./pics/_ST_8244.jpg"></div>
          </div>
          <div class="section white">
            <div class="row container">
              <h2 class="header">Welcome to SnapStore</h2>
              <p class="grey-text text-darken-3 lighten-3">A place to store your snaps ;)</p>
            </div>
          </div>
          <div class="parallax-container">
            <div class="parallax" materialize="parallax"><img src="./pics/2014_Land-Rover_CA-3586.jpg"></div>
          </div>         
      </main>
    </div>
  `
})
export class Main {}
