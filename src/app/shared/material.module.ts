import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import {
  MatButtonModule,
  MatSelectModule,
  MatFormFieldModule,
  MatListModule,
  MatRadioModule,
} from "@angular/material";

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    MatListModule,
    MatRadioModule,
  ],
  exports: [
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    MatListModule,
    MatRadioModule,
  ],
})
export class MaterialModule {}
