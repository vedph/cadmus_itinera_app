import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MarkdownModule } from 'ngx-markdown';
import { CadmusMaterialModule } from '@myrmidon/cadmus-material';
import { PersonNameComponent } from './components/person-name/person-name.component';
import { DecoratedIdsComponent } from './components/decorated-ids/decorated-ids.component';
import { DecoratedCountsComponent } from './components/decorated-counts/decorated-counts.component';
import { CitedPersonComponent } from './components/cited-person/cited-person.component';
import { ChronotopeComponent } from './components/chronotope/chronotope.component';
import { CadmusUiModule } from '@myrmidon/cadmus-ui';
import { NoteSetComponent } from './components/note-set/note-set.component';
import { ChronotopesComponent } from './components/chronotopes/chronotopes.component';
import { MultiEntrySelectorComponent } from './components/multi-entry-selector/multi-entry-selector.component';

@NgModule({
  declarations: [
    ChronotopeComponent,
    ChronotopesComponent,
    CitedPersonComponent,
    DecoratedCountsComponent,
    DecoratedIdsComponent,
    MultiEntrySelectorComponent,
    NoteSetComponent,
    PersonNameComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MarkdownModule,
    CadmusMaterialModule,
    CadmusUiModule,
  ],
  exports: [
    ChronotopeComponent,
    ChronotopesComponent,
    CitedPersonComponent,
    DecoratedCountsComponent,
    DecoratedIdsComponent,
    MultiEntrySelectorComponent,
    NoteSetComponent,
    PersonNameComponent,
  ],
})
export class CadmusItineraUiModule {}
