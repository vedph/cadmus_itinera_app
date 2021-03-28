import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CadmusMaterialModule } from '@myrmidon/cadmus-material';
import {
  CadmusItineraPartLtUiModule,
  CHRONOTOPICS_PART_TYPEID,
  CITED_PERSONS_PART_TYPEID,
  CORR_EXCHANGES_PART_TYPEID,
  CORR_PSEUDONYMS_PART_TYPEID,
  SERIAL_TEXT_INFO_PART_TYPEID,
  LIT_DEDICATIONS_PART_TYPEID,
  PERSON_EVENTS_PART_TYPEID,
  PERSON_PART_TYPEID,
  ATTACHMENTS_PART_TYPEID,
} from '@myrmidon/cadmus-itinera-part-lt-ui';
import { RouterModule } from '@angular/router';
import { PendingChangesGuard } from '@myrmidon/cadmus-core';
import { CadmusUiPgModule } from '@myrmidon/cadmus-ui-pg';
import { PersonPartFeatureComponent } from './person-part-feature/person-part-feature.component';
import { PersonEventsPartFeatureComponent } from './person-events-part-feature/person-events-part-feature.component';
import { LitDedicationsPartFeatureComponent } from './lit-dedications-part-feature/lit-dedications-part-feature.component';
import { CorrPseudonymsPartFeatureComponent } from './corr-pseudonyms-part-feature/corr-pseudonyms-part-feature.component';
import { CitedPersonsPartFeatureComponent } from './cited-persons-part-feature/cited-persons-part-feature.component';
import { SerialTextInfoPartFeatureComponent } from './serial-text-info-part-feature/serial-text-info-part-feature.component';
import { CorrExchangesPartFeatureComponent } from './corr-exchanges-part-feature/corr-exchanges-part-feature.component';
import { ChronotopicsPartFeatureComponent } from './chronotopics-part-feature/chronotopics-part-feature.component';
import { AttachmentsPartFeatureComponent } from './attachments-part-feature/attachments-part-feature.component';

// https://github.com/ng-packagr/ng-packagr/issues/778
export const RouterModuleForChild = RouterModule.forChild([
  {
    path: `${PERSON_PART_TYPEID}/:pid`,
    pathMatch: 'full',
    component: PersonPartFeatureComponent,
    canDeactivate: [PendingChangesGuard],
  },
  {
    path: `${PERSON_EVENTS_PART_TYPEID}/:pid`,
    pathMatch: 'full',
    component: PersonEventsPartFeatureComponent,
    canDeactivate: [PendingChangesGuard],
  },
  {
    path: `${LIT_DEDICATIONS_PART_TYPEID}/:pid`,
    pathMatch: 'full',
    component: LitDedicationsPartFeatureComponent,
    canDeactivate: [PendingChangesGuard],
  },
  {
    path: `${CORR_PSEUDONYMS_PART_TYPEID}/:pid`,
    pathMatch: 'full',
    component: CorrPseudonymsPartFeatureComponent,
    canDeactivate: [PendingChangesGuard],
  },
  {
    path: `${CITED_PERSONS_PART_TYPEID}/:pid`,
    pathMatch: 'full',
    component: CitedPersonsPartFeatureComponent,
    canDeactivate: [PendingChangesGuard],
  },
  {
    path: `${SERIAL_TEXT_INFO_PART_TYPEID}/:pid`,
    pathMatch: 'full',
    component: SerialTextInfoPartFeatureComponent,
    canDeactivate: [PendingChangesGuard],
  },
  {
    path: `${CORR_EXCHANGES_PART_TYPEID}/:pid`,
    pathMatch: 'full',
    component: CorrExchangesPartFeatureComponent,
    canDeactivate: [PendingChangesGuard],
  },
  {
    path: `${CHRONOTOPICS_PART_TYPEID}/:pid`,
    pathMatch: 'full',
    component: ChronotopicsPartFeatureComponent,
    canDeactivate: [PendingChangesGuard],
  },
  {
    path: `${ATTACHMENTS_PART_TYPEID}/:pid`,
    pathMatch: 'full',
    component: AttachmentsPartFeatureComponent,
    canDeactivate: [PendingChangesGuard],
  },
]);

@NgModule({
  declarations: [
    AttachmentsPartFeatureComponent,
    ChronotopicsPartFeatureComponent,
    CitedPersonsPartFeatureComponent,
    LitDedicationsPartFeatureComponent,
    CorrExchangesPartFeatureComponent,
    CorrPseudonymsPartFeatureComponent,
    SerialTextInfoPartFeatureComponent,
    PersonEventsPartFeatureComponent,
    PersonPartFeatureComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModuleForChild,
    // Cadmus
    CadmusMaterialModule,
    CadmusUiPgModule,
    // Cadmus itinera
    CadmusItineraPartLtUiModule,
  ],
  exports: [
    AttachmentsPartFeatureComponent,
    ChronotopicsPartFeatureComponent,
    CitedPersonsPartFeatureComponent,
    LitDedicationsPartFeatureComponent,
    CorrExchangesPartFeatureComponent,
    CorrPseudonymsPartFeatureComponent,
    SerialTextInfoPartFeatureComponent,
    PersonEventsPartFeatureComponent,
    PersonPartFeatureComponent,
  ],
})
export class CadmusItineraPartLtPgModule {}
