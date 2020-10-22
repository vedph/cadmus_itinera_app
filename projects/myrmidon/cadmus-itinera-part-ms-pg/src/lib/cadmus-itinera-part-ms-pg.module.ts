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
  MSPLACE_PART_TYPEID,
  MSQUIRES_PART_TYPEID,
  MSCATCHWORDS_PART_TYPEID,
  MSWATERMARKS_PART_TYPEID,
  MSNUMBERINGS_PART_TYPEID,
  MSPOEM_RANGES_PART_TYPEID,
  MSBINDING_PART_TYPEID,
  MSMATERIAL_DSC_PART_TYPEID,
  MSCONTENTS_PART_TYPEID,
  MSCONTENT_LOCI_PART_TYPEID,
  MSDIMENSIONS_PART_TYPEID
} from '@myrmidon/cadmus-itinera-part-ms-ui';
import { MsSignaturesPartFeatureComponent } from './ms-signatures-part-feature/ms-signatures-part-feature.component';
import { MsCompositionPartFeatureComponent } from './ms-composition-part-feature/ms-composition-part-feature.component';
import { MsPlacePartFeatureComponent } from './ms-place-part-feature/ms-place-part-feature.component';
import { MsQuiresPartFeatureComponent } from './ms-quires-part-feature/ms-quires-part-feature.component';
import { MsCatchwordsPartFeatureComponent } from './ms-catchwords-part-feature/ms-catchwords-part-feature.component';
import { MsWatermarksPartFeatureComponent } from './ms-watermarks-part-feature/ms-watermarks-part-feature.component';
import { MsNumberingsPartFeatureComponent } from './ms-numberings-part-feature/ms-numberings-part-feature.component';
import { MsPoemRangesPartFeatureComponent } from './ms-poem-ranges-part-feature/ms-poem-ranges-part-feature.component';
import { MsBindingPartFeatureComponent } from './ms-binding-part-feature/ms-binding-part-feature.component';
import { MsMaterialDscPartFeatureComponent } from './ms-material-dsc-part-feature/ms-material-dsc-part-feature.component';
import { MsContentsPartFeatureComponent } from './ms-contents-part-feature/ms-contents-part-feature.component';
import { MsContentLociPartFeatureComponent } from './ms-content-loci-part-feature/ms-content-loci-part-feature.component';
import { MsDimensionsPartFeatureComponent } from './ms-dimensions-part-feature/ms-dimensions-part-feature.component';

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
  {
    path: `${MSQUIRES_PART_TYPEID}/:pid`,
    pathMatch: 'full',
    component: MsQuiresPartFeatureComponent,
    canDeactivate: [PendingChangesGuard],
  },
  {
    path: `${MSCATCHWORDS_PART_TYPEID}/:pid`,
    pathMatch: 'full',
    component: MsCatchwordsPartFeatureComponent,
    canDeactivate: [PendingChangesGuard],
  },
  {
    path: `${MSWATERMARKS_PART_TYPEID}/:pid`,
    pathMatch: 'full',
    component: MsWatermarksPartFeatureComponent,
    canDeactivate: [PendingChangesGuard],
  },
  {
    path: `${MSNUMBERINGS_PART_TYPEID}/:pid`,
    pathMatch: 'full',
    component: MsNumberingsPartFeatureComponent,
    canDeactivate: [PendingChangesGuard],
  },
  {
    path: `${MSPOEM_RANGES_PART_TYPEID}/:pid`,
    pathMatch: 'full',
    component: MsPoemRangesPartFeatureComponent,
    canDeactivate: [PendingChangesGuard],
  },
  {
    path: `${MSBINDING_PART_TYPEID}/:pid`,
    pathMatch: 'full',
    component: MsBindingPartFeatureComponent,
    canDeactivate: [PendingChangesGuard],
  },
  {
    path: `${MSMATERIAL_DSC_PART_TYPEID}/:pid`,
    pathMatch: 'full',
    component: MsMaterialDscPartFeatureComponent,
    canDeactivate: [PendingChangesGuard],
  },
  {
    path: `${MSCONTENTS_PART_TYPEID}/:pid`,
    pathMatch: 'full',
    component: MsContentsPartFeatureComponent,
    canDeactivate: [PendingChangesGuard],
  },
  {
    path: `${MSCONTENT_LOCI_PART_TYPEID}/:pid`,
    pathMatch: 'full',
    component: MsContentLociPartFeatureComponent,
    canDeactivate: [PendingChangesGuard],
  },
  {
    path: `${MSDIMENSIONS_PART_TYPEID}/:pid`,
    pathMatch: 'full',
    component: MsDimensionsPartFeatureComponent,
    canDeactivate: [PendingChangesGuard],
  },
]);

@NgModule({
  declarations: [
    MsBindingPartFeatureComponent,
    MsCatchwordsPartFeatureComponent,
    MsCompositionPartFeatureComponent,
    MsContentLociPartFeatureComponent,
    MsContentsPartFeatureComponent,
    MsDimensionsPartFeatureComponent,
    MsMaterialDscPartFeatureComponent,
    MsNumberingsPartFeatureComponent,
    MsPlacePartFeatureComponent,
    MsPoemRangesPartFeatureComponent,
    MsQuiresPartFeatureComponent,
    MsSignaturesPartFeatureComponent,
    MsWatermarksPartFeatureComponent,
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
    MsBindingPartFeatureComponent,
    MsCatchwordsPartFeatureComponent,
    MsCompositionPartFeatureComponent,
    MsContentLociPartFeatureComponent,
    MsContentsPartFeatureComponent,
    MsDimensionsPartFeatureComponent,
    MsMaterialDscPartFeatureComponent,
    MsNumberingsPartFeatureComponent,
    MsPlacePartFeatureComponent,
    MsPoemRangesPartFeatureComponent,
    MsQuiresPartFeatureComponent,
    MsSignaturesPartFeatureComponent,
    MsWatermarksPartFeatureComponent,
  ],
})
export class CadmusItineraPartMsPgModule {}
