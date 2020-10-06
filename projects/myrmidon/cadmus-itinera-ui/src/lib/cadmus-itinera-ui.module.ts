import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CadmusMaterialModule } from '@myrmidon/cadmus-material';
import { ExternalIdsComponent } from './components/external-ids/external-ids.component';
import { PersonNameComponent } from './components/person-name/person-name.component';

@NgModule({
  declarations: [ExternalIdsComponent, PersonNameComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CadmusMaterialModule,
  ],
  exports: [ExternalIdsComponent, PersonNameComponent],
})
export class CadmusItineraUiModule {}
