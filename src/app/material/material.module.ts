import {NgModule}                  from '@angular/core';
import {MatButtonModule, 
        MatDatepickerModule, 
        MatNativeDateModule}       from "@angular/material";
import {MatTableModule}            from '@angular/material/table';
import {MatPaginatorModule}        from '@angular/material';
import {MatIconModule}             from '@angular/material/icon';
import {BrowserAnimationsModule}   from '@angular/platform-browser/animations';
import {MatToolbarModule}          from '@angular/material/toolbar';
import {MatCardModule}             from '@angular/material/card';
import {MatFormFieldModule}        from '@angular/material/form-field';
import {MatInputModule}            from '@angular/material/input';
import {MatSelectModule}           from '@angular/material/select';
import {MatRadioModule}            from '@angular/material/radio';




const MatComponents = [
  MatButtonModule,
  MatTableModule,
  MatPaginatorModule,
  MatIconModule,
  BrowserAnimationsModule,
  MatToolbarModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatRadioModule
];

@NgModule({
  imports: [MatComponents],
  exports: [MatComponents],
})

export class MaterialModule { }
