import { Component } from '@angular/core';
import { MaterializeDirective } from "angular2-materialize";
import { Router } from '@angular/router';

@Component({
  selector: 'about-container',
  template: `
    <div class="input-field col s12">
              <input 
                id="album_name" 
                type="text" 
                class="validate" 
                [attr.disabled]="isDisabled"
                style="text-align:center;"
              >
              <label for="album_name">album name</label>
    </div>
  `,
  styles:[`
      .input-field {
        text-align: center;
      }
  `]
})
export class About {
  isDisabled;
}
