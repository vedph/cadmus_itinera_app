import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CadmusMaterialModule } from '@myrmidon/cadmus-material';
import {
  CadmusItineraPartLtUiModule,
  CORR_DEDICATIONS_PART_TYPEID,
  CORR_PSEUDONYMS_PART_TYPEID,
  DOC_REFERENCES_PART_TYPEID,
  PERSON_EVENTS_PART_TYPEID,
  PERSON_PART_TYPEID,
} from '@myrmidon/cadmus-itinera-part-lt-ui';
import { PersonPartFeatureComponent } from './person-part-feature/person-part-feature.component';
import { RouterModule } from '@angular/router';
import { PendingChangesGuard } from '@myrmidon/cadmus-core';
import { CadmusUiPgModule } from '@myrmidon/cadmus-ui-pg';
import { PersonEventsPartFeatureComponent } from './person-events-part-feature/person-events-part-feature.component';
import { DocReferencesPartFeatureComponent } from './doc-references-part-feature/doc-references-part-feature.component';
import { CorrDedicationsPartFeatureComponent } from './corr-dedications-part-feature/corr-dedications-part-feature.component';
import { CorrPseudonymsPartFeatureComponent } from './corr-pseudonyms-part-feature/corr-pseudonyms-part-feature.component';

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
]);

@NgModule({
  declarations: [
    CorrDedicationsPartFeatureComponent,
    CorrPseudonymsPartFeatureComponent,
    DocReferencesPartFeatureComponent,
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
    CorrDedicationsPartFeatureComponent,
    CorrPseudonymsPartFeatureComponent,
    DocReferencesPartFeatureComponent,
    PersonEventsPartFeatureComponent,
    PersonPartFeatureComponent,
  ],
})
export class CadmusItineraPartLtPgModule {}
