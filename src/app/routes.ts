import { RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core' 
import { Main, Notes, NewAlbum, Auth, Images, FullImage } from './containers';


export const routes: ModuleWithProviders = RouterModule.forRoot([
  {
    path: '',
    component: Main,
    children: [
      { path: 'newAlbum', component: NewAlbum },
      { path: 'images/:userId', component: Images },
      { path: 'image/:imageId', component: FullImage}
    ]
  },
  { path: '**', redirectTo: 'newAlbum' }
]);
