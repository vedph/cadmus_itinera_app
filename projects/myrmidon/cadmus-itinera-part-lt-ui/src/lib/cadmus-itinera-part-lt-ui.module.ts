import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { CadmusItineraCoreModule } from '@myrmidon/cadmus-itinera-core';
import { CadmusMaterialModule } from '@myrmidon/cadmus-material';
import { CadmusItineraUiModule } from '@myrmidon/cadmus-itinera-ui';
import { PersonPartComponent } from './person-part/person-part.component';
import { CadmusUiModule } from '@myrmidon/cadmus-ui';
import { PersonEventsPartComponent } from './person-events-part/person-events-part.component';

@NgModule({
  declarations: [
    PersonPartComponent,
    PersonEventsPartComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MonacoEditorModule,
    // Cadmus
    CadmusMaterialModule,
    CadmusUiModule,
    // Cadmus itinera
    CadmusItineraCoreModule,
    CadmusItineraUiModule
  ],
  exports: [
    PersonPartComponent,
    PersonEventsPartComponent
  ],
})
export class CadmusItineraPartLtUiModule {}
