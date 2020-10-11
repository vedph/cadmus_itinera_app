import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CadmusMaterialModule } from '@myrmidon/cadmus-material';
import { ExternalIdsComponent } from './components/external-ids/external-ids.component';
import { PersonNameComponent } from './components/person-name/person-name.component';
import { DocReferencesComponent } from './components/doc-references/doc-references.component';
import { DecoratedIdsComponent } from './components/decorated-ids/decorated-ids.component';
import { DecoratedCountsComponent } from './components/decorated-counts/decorated-counts.component';
import { CitedPersonComponent } from './components/cited-person/cited-person.component';

@NgModule({
  declarations: [
    CitedPersonComponent,
    DecoratedCountsComponent,
    DecoratedIdsComponent,
    DocReferencesComponent,
    ExternalIdsComponent,
    PersonNameComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CadmusMaterialModule,
  ],
  exports: [
    CitedPersonComponent,
    DecoratedCountsComponent,
    DecoratedIdsComponent,
    DocReferencesComponent,
    ExternalIdsComponent,
    PersonNameComponent,
  ],
})
export class CadmusItineraUiModule {}
