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
import { CitedPersonsPartComponent } from './cited-persons-part/cited-persons-part.component';
import { PoeticTextInfoPartComponent } from './poetic-text-info-part/poetic-text-info-part.component';
import { LetterInfoPartComponent } from './letter-info-part/letter-info-part.component';
import { MsHandSignComponent } from './ms-hand-sign/ms-hand-sign.component';
import { PersonHandPartComponent } from './person-hand-part/person-hand-part.component';
import { CorrExchangeComponent } from './corr-exchange/corr-exchange.component';
import { CorrExchangesPartComponent } from './corr-exchanges-part/corr-exchanges-part.component';

@NgModule({
  declarations: [
    BioEventComponent,
    CitedPersonsPartComponent,
    CorrDedicationsPartComponent,
    CorrExchangeComponent,
    CorrExchangesPartComponent,
    CorrPseudonymComponent,
    CorrPseudonymsPartComponent,
    DocReferencesPartComponent,
    LetterInfoPartComponent,
    LitDedicationComponent,
    MsHandSignComponent,
    PersonPartComponent,
    PersonHandPartComponent,
    PersonEventsPartComponent,
    PoeticTextInfoPartComponent,
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
    CitedPersonsPartComponent,
    CorrDedicationsPartComponent,
    CorrExchangeComponent,
    CorrExchangesPartComponent,
    CorrPseudonymComponent,
    CorrPseudonymsPartComponent,
    DocReferencesPartComponent,
    LetterInfoPartComponent,
    LitDedicationComponent,
    MsHandSignComponent,
    PersonPartComponent,
    PersonHandPartComponent,
    PersonEventsPartComponent,
    PoeticTextInfoPartComponent,
  ],
})
export class CadmusItineraPartLtUiModule {}
