import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CadmusMaterialModule } from '@myrmidon/cadmus-material';
import { ExternalIdsComponent } from './components/external-ids/external-ids.component';

@NgModule({
  declarations: [ExternalIdsComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CadmusMaterialModule,
  ],
  exports: [ExternalIdsComponent],
})
export class CadmusItineraUiModule {}
