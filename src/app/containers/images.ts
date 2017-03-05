import { Component, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MaterializeAction } from 'angular2-materialize';
import { ImageService } from '../services';
import { ImageStore } from '../stores/image-store';
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
          <thumb
            class="col-md-4"
            *ngFor="let image of images"
            [image]="image"
            (deleted)="onImageDeleted($event)"
            (displayed)="onRouteToImage($event)"
          >
          </thumb>
        </div>
      </div>
    </div>  
  `
})
export class Images {
  images = [];
  userId = "";
  busyCreating;

  constructor(
    private store: ImageStore,
    private imageService: ImageService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.userId = route.snapshot.params['userId']; 

    this.imageService.getImageByUser(`/user/${this.userId}/images`)
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

  onRouteToImage(image){
    this.router.navigate([`image/${image.imageId}`]);
  }
}
