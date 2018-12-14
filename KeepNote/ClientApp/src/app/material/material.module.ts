import { NgModule } from '@angular/core';

import {
  MatInputModule, MatFormFieldModule, MatToolbarModule,
  MatExpansionModule, MatCardModule, MatButtonModule,
  MatCheckboxModule, MatSidenavModule, MatIconModule,
  MatListModule, MatDialogModule, MatOptionModule, MatSelectModule,
  MatChipsModule, MatSnackBarModule
} from '@angular/material';

@NgModule({

  imports: [
    MatInputModule, MatFormFieldModule, MatToolbarModule,
    MatExpansionModule, MatCardModule, MatButtonModule,
    MatCheckboxModule, MatSidenavModule, MatIconModule,
    MatListModule, MatDialogModule, MatOptionModule, MatSelectModule,
    MatChipsModule, MatSnackBarModule
  ],
  exports: [
    MatInputModule, MatFormFieldModule, MatToolbarModule,
    MatExpansionModule, MatCardModule, MatButtonModule,
    MatCheckboxModule, MatSidenavModule, MatIconModule,
    MatListModule, MatDialogModule, MatOptionModule, MatSelectModule,
    MatChipsModule, MatSnackBarModule
  ]
})

export class MaterialModule { }
