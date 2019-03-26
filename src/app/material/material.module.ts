import { NgModule } from '@angular/core';
import { MatButtonModule } from "@angular/material";
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material';
import {MatIconModule} from '@angular/material/icon';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

const MatComponents = [
  MatButtonModule,
  MatTableModule,
  MatPaginatorModule,
  MatIconModule,
  BrowserAnimationsModule,
];

@NgModule({
  imports: [MatComponents],
  exports: [MatComponents],
})

export class MaterialModule { }
