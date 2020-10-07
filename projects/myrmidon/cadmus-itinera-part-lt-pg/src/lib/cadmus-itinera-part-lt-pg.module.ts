import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CadmusMaterialModule } from '@myrmidon/cadmus-material';
import { CadmusItineraPartLtUiModule } from '@myrmidon/cadmus-itinera-part-lt-ui';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    // Cadmus
    CadmusMaterialModule,
    // Cadmus itinera
    CadmusItineraPartLtUiModule,
  ],
  exports: [],
})
export class CadmusItineraPartLtPgModule {}
