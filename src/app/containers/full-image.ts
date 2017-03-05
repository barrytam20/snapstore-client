import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ImageService } from '../services';

@Component({
  selector: 'full-image-container',
  styles: [`
.container {
    width: 80%;
    height: 80%;
    position: absolute;    
    margin:auto;
    top:15;
    bottom:0;
    left:0;
    right:0;
    background-color: #aaa;
    }
img {
    max-width: 100%;
    max-height: 100%;  
    position: absolute;
    margin:auto;
    top:0;
    bottom:0;
    left:0;
    right:0;
    } 
  `],  
  template: `
  <div class="container">
      <img 
        [src]="imageContent"/>  
        </div>
  `
})
export class FullImage {
    imageId: string;
    imageContent: string;

    constructor(
      private route: ActivatedRoute,
      private imageService: ImageService) {
        this.imageId = route.snapshot.params['imageId']; 
        
        this.imageService.getImage(`/image/${this.imageId}`)
        .subscribe((res) => { this.imageContent = res.imageContent});
    }
}
