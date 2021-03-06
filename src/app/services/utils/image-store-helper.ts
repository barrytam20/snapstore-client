import { Injectable } from '@angular/core';
import { ImageStore } from '../../stores/image-store';

@Injectable()
export class ImageStoreHelper {
  constructor(private store: ImageStore) {}

  update(prop, state) {
    const currentState = this.store.getState();
    this.store.setState(Object.assign({}, currentState, { [prop]: state }));
  }

  add(prop, state) {
    const currentState = this.store.getState();
    const collection = currentState[prop];
    this.store.setState(Object.assign({}, currentState, { [prop]: [state, ...collection] }));
  }

  findAndUpdate(prop, state) {
    const currentState = this.store.getState();
    const collection = currentState[prop];

    this.store.setState(Object.assign({}, currentState, {[prop]: collection.map(item => {
      if (item.imageId !== state.imageId) {
        return item;
      }
      return Object.assign({}, item, state)
    })}))
  }

  findAndDelete(prop, imageId) {
    const currentState = this.store.getState();
    const collection = currentState[prop];
    this.store.setState(Object.assign({}, currentState, {[prop]: collection.filter(item => item.imageId !== imageId)}));
  }
}
