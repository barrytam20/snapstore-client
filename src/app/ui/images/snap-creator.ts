import {
  Component,
  Output,
  EventEmitter
} from '@angular/core';

@Component({
  selector: 'snap-creator',
  styles: [`
    .snap-creator {
      padding: 20px;
      background-color: white;
      border-radius: 3px;
    }
    .title {
      font-weight: bold;
      color: rgba(0,0,0,0.8);
    }
    .full {
      height: 100px;
    }
  `],
  template: `
    <div class="snap-creator shadow-2">
      <image-upload
        [max]="100"
        [buttonCaption]="'Select Images!'"
        [dropBoxMessage]="'Drop your images here!'"
        [preview]="false"
        (onFileUploadFinish)="onCreateSnap($event)"
        (onRemove)="imageRemoved($event)"
        (isPending)="disableSendButton($event)"
      ></image-upload>    
    </div>
  `
})
export class SnapCreator {
  @Output() createSnap = new EventEmitter();

  newImage;

  onCreateSnap(image: any){
    this.newImage = image;
    this.createSnap.next(this.newImage);
  }

}
