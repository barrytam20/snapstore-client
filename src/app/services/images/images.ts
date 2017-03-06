import { Injectable } from '@angular/core';
import { ImageStoreHelper } from '../utils/image-store-helper';
import { UserStoreHelper } from '../utils/user-store-helper';
import { LambdaService } from './lambda';
import 'rxjs/Rx';

@Injectable()
export class ImageService {
  path: string = '';
  constructor(
    private imageStoreHelper: ImageStoreHelper, 
    private userStoreHelper: UserStoreHelper, 
    private lambda: LambdaService) {}

  getImageByUser(path) {
    return this.lambda.get(path)
    .do((res: any) => this.imageStoreHelper.update('images', res));
  }

  createImage(path, body){
    return this.lambda.post(path, body)
      .do(savedImage => this.imageStoreHelper.add('images', savedImage));
  }

  deleteImage(path){
    return this.lambda.delete(path)
      .do((res: any) => {
        console.log(`deleting ${res.imageId}`);
        this.imageStoreHelper.findAndDelete('images', res.imageId);
      });
  }

  getImage(path){
    return this.lambda.get(path)
      .do(res => {
        this.imageStoreHelper.findAndUpdate('images', res);
      });
  }

  getUsers(path){
    return this.lambda.get(path)
    .do((res: any) => this.userStoreHelper.update('users', res));
  }

}