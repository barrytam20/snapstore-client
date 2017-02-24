import { Injectable } from '@angular/core';
import { Image } from '../../image-store';
import { ImageStoreHelper } from '../utils/image-store-helper';
import { LambdaService } from './lambda';
import 'rxjs/Rx';

@Injectable()
export class ImageService {
  path: string = '';
  constructor(private storeHelper: ImageStoreHelper, private lambda: LambdaService) {}

  getImageByUser(path) {
    return this.lambda.get(path)
    .do((res: any) => this.storeHelper.update('images', res));
  }

  createImage(path, body){
    return this.lambda.post(path, body)
      .do(savedImage => this.storeHelper.add('images', savedImage));
  }

  deleteImage(path){
    return this.lambda.delete(path)
      .do((res: any) => {
        console.log(`deleting ${res.imageId}`);
        this.storeHelper.findAndDelete('images', res.imageId);
      });
  }

  getImage(path){
    return this.lambda.get(path)
      .do(res => {
        this.storeHelper.findAndUpdate('images', res);
      });
  }

}