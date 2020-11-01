import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CadmusMaterialModule } from '@myrmidon/cadmus-material';
import {
  CadmusItineraPartLtUiModule,
  CITED_PERSONS_PART_TYPEID,
  CORR_DEDICATIONS_PART_TYPEID,
  CORR_PSEUDONYMS_PART_TYPEID,
  DOC_REFERENCES_PART_TYPEID,
  LETTER_INFO_PART_TYPEID,
  PERSON_EVENTS_PART_TYPEID,
  PERSON_PART_TYPEID,
  POETIC_TEXT_INFO_PART_TYPEID,
} from '@myrmidon/cadmus-itinera-part-lt-ui';
import { RouterModule } from '@angular/router';
import { PendingChangesGuard } from '@myrmidon/cadmus-core';
import { CadmusUiPgModule } from '@myrmidon/cadmus-ui-pg';
import { PersonPartFeatureComponent } from './person-part-feature/person-part-feature.component';
import { PersonEventsPartFeatureComponent } from './person-events-part-feature/person-events-part-feature.component';
import { DocReferencesPartFeatureComponent } from './doc-references-part-feature/doc-references-part-feature.component';
import { CorrDedicationsPartFeatureComponent } from './corr-dedications-part-feature/corr-dedications-part-feature.component';
import { CorrPseudonymsPartFeatureComponent } from './corr-pseudonyms-part-feature/corr-pseudonyms-part-feature.component';
import { CitedPersonsPartFeatureComponent } from './cited-persons-part-feature/cited-persons-part-feature.component';
import { PoeticTextInfoPartFeatureComponent } from './poetic-text-info-part-feature/poetic-text-info-part-feature.component';
import { LetterInfoPartFeatureComponent } from './letter-info-part-feature/letter-info-part-feature.component';

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
    path: `${DOC_REFERENCES_PART_TYPEID}/:pid`,
    pathMatch: 'full',
    component: DocReferencesPartFeatureComponent,
    canDeactivate: [PendingChangesGuard],
  },
  {
    path: `${CORR_DEDICATIONS_PART_TYPEID}/:pid`,
    pathMatch: 'full',
    component: CorrDedicationsPartFeatureComponent,
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
    path: `${POETIC_TEXT_INFO_PART_TYPEID}/:pid`,
    pathMatch: 'full',
    component: PoeticTextInfoPartFeatureComponent,
    canDeactivate: [PendingChangesGuard],
  },
  {
    path: `${LETTER_INFO_PART_TYPEID}/:pid`,
    pathMatch: 'full',
    component: LetterInfoPartFeatureComponent,
    canDeactivate: [PendingChangesGuard],
  },
]);

@NgModule({
  declarations: [
    CitedPersonsPartFeatureComponent,
    CorrDedicationsPartFeatureComponent,
    CorrPseudonymsPartFeatureComponent,
    DocReferencesPartFeatureComponent,
    LetterInfoPartFeatureComponent,
    PersonEventsPartFeatureComponent,
    PersonPartFeatureComponent,
    PoeticTextInfoPartFeatureComponent,
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
    CitedPersonsPartFeatureComponent,
    CorrDedicationsPartFeatureComponent,
    CorrPseudonymsPartFeatureComponent,
    DocReferencesPartFeatureComponent,
    LetterInfoPartFeatureComponent,
    PersonEventsPartFeatureComponent,
    PersonPartFeatureComponent,
    PoeticTextInfoPartFeatureComponent,
  ],
})
export class CadmusItineraPartLtPgModule {}
