import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { CadmusItineraCoreModule } from '@myrmidon/cadmus-itinera-core';
import { CadmusMaterialModule } from '@myrmidon/cadmus-material';
import { CadmusItineraUiModule } from '@myrmidon/cadmus-itinera-ui';
import { CadmusUiModule } from '@myrmidon/cadmus-ui';
import { MsSignaturesPartComponent } from './ms-signatures-part/ms-signatures-part.component';
import { MsCompositionPartComponent } from './ms-composition-part/ms-composition-part.component';
import { MsGuardSheetComponent } from './ms-guard-sheet/ms-guard-sheet.component';
import { MsSectionComponent } from './ms-section/ms-section.component';
import { MsPlacePartComponent } from './ms-place-part/ms-place-part.component';
import { MsQuiresPartComponent } from './ms-quires-part/ms-quires-part.component';
import { MsCatchwordsPartComponent } from './ms-catchwords-part/ms-catchwords-part.component';

@NgModule({
  declarations: [
    MsCatchwordsPartComponent,
    MsCompositionPartComponent,
    MsGuardSheetComponent,
    MsPlacePartComponent,
    MsQuiresPartComponent,
    MsSectionComponent,
    MsSignaturesPartComponent,
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
    CadmusItineraUiModule,
  ],
  exports: [
    MsCatchwordsPartComponent,
    MsCompositionPartComponent,
    MsGuardSheetComponent,
    MsPlacePartComponent,
    MsQuiresPartComponent,
    MsSectionComponent,
    MsSignaturesPartComponent,
  ],
})
export class CadmusItineraPartMsUiModule {}
