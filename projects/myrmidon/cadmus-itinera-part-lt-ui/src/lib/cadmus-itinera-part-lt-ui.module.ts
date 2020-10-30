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
import { BioEventComponent } from './bio-event/bio-event.component';
import { DocReferencesPartComponent } from './doc-references-part/doc-references-part.component';
import { LitDedicationComponent } from './lit-dedication/lit-dedication.component';
import { CorrDedicationsPartComponent } from './corr-dedications-part/corr-dedications-part.component';
import { CorrPseudonymComponent } from './corr-pseudonym/corr-pseudonym.component';
import { CorrPseudonymsPartComponent } from './corr-pseudonyms-part/corr-pseudonyms-part.component';
import { CitedPersonComponent } from './cited-person/cited-person.component';
import { CitedPersonsPartComponent } from './cited-persons-part/cited-persons-part.component';

@NgModule({
  declarations: [
    BioEventComponent,
    CitedPersonComponent,
    CitedPersonsPartComponent,
    CorrDedicationsPartComponent,
    CorrPseudonymComponent,
    CorrPseudonymsPartComponent,
    DocReferencesPartComponent,
    LitDedicationComponent,
    PersonPartComponent,
    PersonEventsPartComponent,
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
    BioEventComponent,
    CitedPersonComponent,
    CitedPersonsPartComponent,
    CorrDedicationsPartComponent,
    CorrPseudonymComponent,
    CorrPseudonymsPartComponent,
    DocReferencesPartComponent,
    LitDedicationComponent,
    PersonPartComponent,
    PersonEventsPartComponent
  ],
})
export class CadmusItineraPartLtUiModule {}
