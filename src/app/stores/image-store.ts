import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Injectable } from '@angular/core';
import 'rxjs/Rx';

export interface Image {
  imageId: string;
  thumbnail: string;
  userId: string;
  postDate?: number;
  imageContent?: string;
}

export interface State {
  images: Array<Image>
}

const defaultState = {
  images: []
}

const _store = new BehaviorSubject<State>(defaultState);

@Injectable()
export class ImageStore {
  private _store = _store;
  changes = this._store.asObservable().distinctUntilChanged()

  setState(state: State) {
    this._store.next(state);
  }

  getState(): State {
    return this._store.value;
  }

  purge() {
    this._store.next(defaultState);
  }

}
