import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CadmusMaterialModule } from '@myrmidon/cadmus-material';
import { RouterModule } from '@angular/router';
import { PendingChangesGuard } from '@myrmidon/cadmus-core';
import { CadmusUiPgModule } from '@myrmidon/cadmus-ui-pg';
import {
  CadmusItineraPartMsUiModule,
  MSCOMPOSITION_PART_TYPEID,
  MSSIGNATURES_PART_TYPEID,
  MSPLACE_PART_TYPEID
} from '@myrmidon/cadmus-itinera-part-ms-ui';
import { MsSignaturesPartFeatureComponent } from './ms-signatures-part-feature/ms-signatures-part-feature.component';
import { MsCompositionPartFeatureComponent } from './ms-composition-part-feature/ms-composition-part-feature.component';
import { MsPlacePartFeatureComponent } from './ms-place-part-feature/ms-place-part-feature.component';

// https://github.com/ng-packagr/ng-packagr/issues/778
export const RouterModuleForChild = RouterModule.forChild([
  {
    path: `${MSSIGNATURES_PART_TYPEID}/:pid`,
    pathMatch: 'full',
    component: MsSignaturesPartFeatureComponent,
    canDeactivate: [PendingChangesGuard],
  },
  {
    path: `${MSCOMPOSITION_PART_TYPEID}/:pid`,
    pathMatch: 'full',
    component: MsCompositionPartFeatureComponent,
    canDeactivate: [PendingChangesGuard],
  },
  {
    path: `${MSPLACE_PART_TYPEID}/:pid`,
    pathMatch: 'full',
    component: MsPlacePartFeatureComponent,
    canDeactivate: [PendingChangesGuard],
  },
]);

@NgModule({
  declarations: [
    MsCompositionPartFeatureComponent,
    MsPlacePartFeatureComponent,
    MsSignaturesPartFeatureComponent,
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
    CadmusItineraPartMsUiModule,
  ],
  exports: [
    MsCompositionPartFeatureComponent,
    MsPlacePartFeatureComponent,
    MsSignaturesPartFeatureComponent,
  ],
})
export class CadmusItineraPartMsPgModule {}
