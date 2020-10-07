import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CadmusMaterialModule } from '@myrmidon/cadmus-material';
import {
  CadmusItineraPartLtUiModule,
  PERSON_PART_TYPEID,
} from '@myrmidon/cadmus-itinera-part-lt-ui';
import { PersonPartFeatureComponent } from './person-part-feature/person-part-feature.component';
import { RouterModule } from '@angular/router';
import { PendingChangesGuard } from '@myrmidon/cadmus-core';
import { CadmusUiPgModule } from '@myrmidon/cadmus-ui-pg';

// https://github.com/ng-packagr/ng-packagr/issues/778
export const RouterModuleForChild = RouterModule.forChild([
  {
    path: `${PERSON_PART_TYPEID}/:pid`,
    pathMatch: 'full',
    component: PersonPartFeatureComponent,
    canDeactivate: [PendingChangesGuard],
  },
]);

@NgModule({
  declarations: [PersonPartFeatureComponent],
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
  exports: [PersonPartFeatureComponent],
})
export class CadmusItineraPartLtPgModule {}
