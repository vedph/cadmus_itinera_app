import { NgModule } from '@angular/core';
import { CadmusItineraCoreModule } from '@myrmidon/cadmus-itinera-core';
import { PersonPartComponent } from './person-part/person-part.component';

@NgModule({
  declarations: [PersonPartComponent],
  imports: [CadmusItineraCoreModule],
  exports: [
    PersonPartComponent
  ],
})
export class CadmusItineraPartLtUiModule {}
