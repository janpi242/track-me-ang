import { IonicModule } from '@ionic/angular'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { Tab1Page } from './tab1.page'
import { MapComponentModule } from '../map/map.module';
import { Tab1PageRoutingModule } from './tab1-routing.module'
import { GoogleMapComponentModule } from '../google-map/google-map.module'

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    MapComponentModule,
    GoogleMapComponentModule,
    Tab1PageRoutingModule,
  ],
  declarations: [Tab1Page],
})
export class Tab1PageModule {}
