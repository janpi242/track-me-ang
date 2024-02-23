import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GoogleMapComponent } from './google-map.component';

@NgModule({
  imports: [ CommonModule, FormsModule, IonicModule],
  declarations: [GoogleMapComponent],
  exports: [GoogleMapComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GoogleMapComponentModule {}
