import { Injectable } from '@angular/core';
import { UserStore } from '../../stores/user-store';

@Injectable()
export class UserStoreHelper {
  constructor(private store: UserStore) {}

  update(prop, state) {
    const currentState = this.store.getState();
    this.store.setState(Object.assign({}, currentState, { [prop]: state }));
  }

  add(prop, state) {
    const currentState = this.store.getState();
    const collection = currentState[prop];
    this.store.setState(Object.assign({}, currentState, { [prop]: [state, ...collection] }));
  }

  findAndDelete(prop, userId) {
    const currentState = this.store.getState();
    const collection = currentState[prop];
    this.store.setState(Object.assign({}, currentState, {[prop]: collection.filter(item => item !== userId)}));
  }
}
