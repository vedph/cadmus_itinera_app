import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CadmusItineraCoreModule } from '@myrmidon/cadmus-itinera-core';
import { CadmusMaterialModule } from '@myrmidon/cadmus-material';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { PersonPartComponent } from './person-part/person-part.component';

@NgModule({
  declarations: [PersonPartComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MonacoEditorModule,
    // Cadmus
    CadmusMaterialModule,
    // Cadmus itinera
    CadmusItineraCoreModule,
  ],
  exports: [PersonPartComponent],
})
export class CadmusItineraPartLtUiModule {}
