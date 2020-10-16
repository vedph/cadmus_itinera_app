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

@NgModule({
  declarations: [
    MsSignaturesPartComponent,
    MsCompositionPartComponent,
    MsGuardSheetComponent,
    MsSectionComponent,
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
    MsSignaturesPartComponent,
    MsCompositionPartComponent,
    MsGuardSheetComponent,
    MsSectionComponent
  ],
})
export class CadmusItineraPartMsUiModule {}
