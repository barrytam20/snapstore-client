import { Component, EventEmitter } from '@angular/core';
import { MaterializeAction } from 'angular2-materialize';
import { ImageService } from '../services';
import { ImageStore } from '../image-store';
import 'rxjs/Rx';

@Component({
  selector: 'image-container',
  styles: [`
    .images {
      padding-top: 10px;
    }
    .creator {
      margin-bottom: 40px;
    }
  `],
  styleUrls:[
    '/node_modules/angular2-busy/build/style/busy.css'
  ],
  template: `
    <div class="row center-xs images">
      <div class="col-xs-6 creator">
        <snap-creator (createSnap)="onCreateSnap($event)"></snap-creator>
        <div [ngBusy]="{
          busy: busyCreating, 
          message: 'adding image', 
          backdrop: true
        }"></div>
      </div>    
      <div class="images col-sm-8">
        <div class="row between-md">
          <snap
            class="col-md-4"
            *ngFor="let image of images"
            [image]="image"
            (deleted)="onImageDeleted($event)"
            (displayed)="onImageDisplayed($event)"
          >
          </snap>
        </div>
      </div>
    </div>  
<!-- Modal Trigger -->
<a class="waves-effect waves-light btn modal-trigger" (click)="openModal()">Modal</a>
 
<!-- Modal Structure -->
<div id="modal1" class="modal bottom-sheet" materialize="modal" [materializeParams]="[{dismissible: false}]" [materializeActions]="modalActions">
  <div class="modal-content">
    <h4>Modal Header</h4>
    <p>A bunch of text</p>
  </div>
  <div class="modal-footer">
    <a class="waves-effect waves-green btn-flat" (click)="closeModal()">Close</a>
    <a class="modal-action modal-close waves-effect waves-green btn-flat">Agree</a>
  </div>
</div>

  `
})
export class Images {
  images = [];
  busyCreating;

  constructor(
    private store: ImageStore,
    private imageService: ImageService
  ) {
    this.imageService.getImageByUser('/user/123/images')
    .subscribe();

    this.store.changes.pluck('images')
    .subscribe((images: any) =>  this.images = images);
  }

  onCreateSnap(imageEvent) {
    const image = {
      imageId: Date.now().toString(),
      imageContent: imageEvent.src,
      postDate: Date.now(),
      userId: '123'
    }
    this.busyCreating = this.imageService.createImage('/image', image)
      .subscribe();
  }

  onImageDeleted(image) {
    this.imageService.deleteImage(`/image/${image.imageId}`)
    .subscribe();
  }

  onImageDisplayed(image){
    this.getImageContent(image).then((imageContent) => {
      //console.log(imageContent);
    })
  }

  private getImageContent(image): Promise<string>{
    return new Promise((resolve, reject) => {
      if(image.imageContent){
        resolve(image.imageContent);
      } else {
        this.imageService.getImage(`/image/${image.imageId}`)
        .subscribe((res) => {
          resolve(res.imageContent);
        });
      }
    });
  }

  modalActions = new EventEmitter<string|MaterializeAction>();
  openModal() {
    this.modalActions.emit({action:"modal",params:['open']});
  }
  closeModal() {
    this.modalActions.emit({action:"modal",params:['close']});
  }

}
