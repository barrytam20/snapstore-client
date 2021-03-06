import * as services from './services';
import { Store } from './stores/store';
import { ImageStore } from './stores/image-store'
import { UserStore } from './stores/user-store'
export { App } from './app';
export { routes } from './routes';


const mapValuesToArray = (obj) => Object.keys(obj).map(key => obj[key]);

export const providers = [
  Store,
  ImageStore,
  UserStore,
  ...mapValuesToArray(services)
];
