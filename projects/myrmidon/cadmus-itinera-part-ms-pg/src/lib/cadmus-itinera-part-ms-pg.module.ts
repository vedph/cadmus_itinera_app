import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CadmusMaterialModule } from '@myrmidon/cadmus-material';
import { RouterModule } from '@angular/router';
import { PendingChangesGuard } from '@myrmidon/cadmus-core';
import { CadmusUiPgModule } from '@myrmidon/cadmus-ui-pg';
import {
  CadmusItineraPartMsUiModule,
  MSSIGNATURES_PART_TYPEID,
} from '@myrmidon/cadmus-itinera-part-ms-ui';
import { MsSignaturesPartFeatureComponent } from './ms-signatures-part-feature/ms-signatures-part-feature.component';

// https://github.com/ng-packagr/ng-packagr/issues/778
export const RouterModuleForChild = RouterModule.forChild([
  {
    path: `${MSSIGNATURES_PART_TYPEID}/:pid`,
    pathMatch: 'full',
    component: MsSignaturesPartFeatureComponent,
    canDeactivate: [PendingChangesGuard],
  },
]);

@NgModule({
  declarations: [MsSignaturesPartFeatureComponent],
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
  exports: [MsSignaturesPartFeatureComponent],
})
export class CadmusItineraPartMsPgModule {}
