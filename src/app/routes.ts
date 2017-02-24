import { AuthService } from './services';
import { RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core' 
import { Main, Notes, About, Auth, Images } from './containers';


export const routes: ModuleWithProviders = RouterModule.forRoot([
  {
    path: '',
    component: Main,
    canActivate: [AuthService],
    children: [
      { path: '', component: Notes },
      { path: 'about', component: About },
      { path: 'images', component: Images }
    ]
  },
  { path: 'auth', component: Auth },
  { path: '**', redirectTo: '' }
]);
