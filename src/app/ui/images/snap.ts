import {
  Component,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

@Component({
  selector: 'snap',
  styles: [`
    .snap {
      padding: 10px;
      border-radius: 2px;
      width: 100%;
      position: relative;
      margin-bottom: 20px;
      max-width:100px;
      max-height:100px;
    }
    .title {
      font-size: 1.2rem;
      font-weight: bold;
      text-align: left;
      color: rgba(0,0,0,0.8);
    }
    .value {
      text-align: left;
      font-size: 1.4rem;
      font-weight: 200;
      word-wrap: break-word;
    }
    .img {
      display: block;
      width: auto;
      height: auto;
    }
    .icon {
      position: absolute;
      color: black;
      border: 1px solid lightgrey;
      background-color: white;
      font-size: 30px;
      top: -10px;
      left: -10px;
      width: 40px;
      height: 40px;
      border-radius: 100%;
      cursor: pointer;
    }
  `],
  template: `
    <div
      class="snap row shadow-1"
      (mouseenter)="toggleDelete()"
      (mouseleave)="toggleDelete()"
    >
      <div class="icon" *ngIf="showDelete" (click)="onDelete()">
        <i class="small material-icons">delete</i>
      </div>
      <img 
        [src]="image.thumbnail" 
        class="responsive-img"
        (click)="onDisplay()"/>  
    </div>
  `
})
export class Snap {
  @Input() image = {};
  @Output() deleted = new EventEmitter();
  @Output() displayed = new EventEmitter();

  showDelete: boolean = false;

  toggleDelete() {
    this.showDelete = !this.showDelete;
  }

  onDelete() {
    this.deleted.next(this.image);
  }

  onDisplay(){
    this.displayed.next(this.image);
  }
}
