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
import { MsWatermarkComponent } from './ms-watermark/ms-watermark.component';
import { MsWatermarksPartComponent } from './ms-watermarks-part/ms-watermarks-part.component';
import { MsNumberingsPartComponent } from './ms-numberings-part/ms-numberings-part.component';
import { MsPoemRangesPartComponent } from './ms-poem-ranges-part/ms-poem-ranges-part.component';
import { MsBindingPartComponent } from './ms-binding-part/ms-binding-part.component';
import { MsMaterialDscPartComponent } from './ms-material-dsc-part/ms-material-dsc-part.component';
import { MsPalimpsestComponent } from './ms-palimpsest/ms-palimpsest.component';
import { MsContentComponent } from './ms-content/ms-content.component';
import { MsContentsPartComponent } from './ms-contents-part/ms-contents-part.component';
import { MsContentLociPartComponent } from './ms-content-loci-part/ms-content-loci-part.component';
import { MsContentLocusComponent } from './ms-content-locus/ms-content-locus.component';
import { MsDimensionsPartComponent } from './ms-dimensions-part/ms-dimensions-part.component';
import { MsHandsPartComponent } from './ms-hands-part/ms-hands-part.component';
import { MsHandComponent } from './ms-hand/ms-hand.component';
import { MsDecorationComponent } from './ms-decoration/ms-decoration.component';
import { MsDecorationArtistComponent } from './ms-decoration-artist/ms-decoration-artist.component';
import { MsDecorationsPartComponent } from './ms-decorations-part/ms-decorations-part.component';
import { MsHistoryPersonComponent } from './ms-history-person/ms-history-person.component';

@NgModule({
  declarations: [
    MsBindingPartComponent,
    MsCatchwordsPartComponent,
    MsCompositionPartComponent,
    MsContentComponent,
    MsContentLociPartComponent,
    MsContentLocusComponent,
    MsContentsPartComponent,
    MsDecorationArtistComponent,
    MsDecorationComponent,
    MsDecorationsPartComponent,
    MsDimensionsPartComponent,
    MsGuardSheetComponent,
    MsHandComponent,
    MsHandsPartComponent,
    MsHistoryPersonComponent,
    MsMaterialDscPartComponent,
    MsNumberingsPartComponent,
    MsPalimpsestComponent,
    MsPlacePartComponent,
    MsPoemRangesPartComponent,
    MsQuiresPartComponent,
    MsSectionComponent,
    MsSignaturesPartComponent,
    MsWatermarkComponent,
    MsWatermarksPartComponent,
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
    MsBindingPartComponent,
    MsCatchwordsPartComponent,
    MsCompositionPartComponent,
    MsContentComponent,
    MsContentLociPartComponent,
    MsContentLocusComponent,
    MsContentsPartComponent,
    MsDecorationArtistComponent,
    MsDecorationComponent,
    MsDecorationsPartComponent,
    MsDimensionsPartComponent,
    MsGuardSheetComponent,
    MsHandComponent,
    MsHandsPartComponent,
    MsHistoryPersonComponent,
    MsMaterialDscPartComponent,
    MsNumberingsPartComponent,
    MsPalimpsestComponent,
    MsPlacePartComponent,
    MsPoemRangesPartComponent,
    MsQuiresPartComponent,
    MsSectionComponent,
    MsSignaturesPartComponent,
    MsWatermarkComponent,
    MsWatermarksPartComponent,
  ],
})
export class CadmusItineraPartMsUiModule {}
