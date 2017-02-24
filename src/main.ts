import { NgModule }      from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http'
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'
import { ImageUploadModule } from 'angular2-image-upload'
import { BusyModule } from 'angular2-busy';
import { App, routes, providers } from './app'
import { Main, Notes, About, Auth, Images } from './app/containers'

import "materialize-css";
import "angular2-materialize";
import { MaterializeModule } from 'angular2-materialize'

import { 
  AppBar,
  NoteCard,
  NoteCreator,
  ColorPicker,
  Snap,
  SnapCreator
} from './app/ui'

@NgModule({
  declarations: [
    App,
    Main,
    AppBar,
    NoteCard,
    Notes,
    NoteCreator,
    ColorPicker,
    About,
    Auth,
    Images,
    Snap,
    SnapCreator
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routes,
    ImageUploadModule.forRoot(),
    BusyModule,
    MaterializeModule
  ],
  providers,
  bootstrap: [App]
})
export class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule)
