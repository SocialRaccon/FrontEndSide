import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ImageUploadComponent} from "./components/image-upload/image-upload.component";
import { MapaComponent } from './components/mapa/mapa.component';
import {LeafletModule} from "@bluehalo/ngx-leaflet";



@NgModule({
  declarations: [
    ImageUploadComponent,
    MapaComponent
  ],
  imports: [
    CommonModule,
    LeafletModule
  ],
  exports: [
    ImageUploadComponent,
    MapaComponent,
  ]
})
export class SharedModule { }
