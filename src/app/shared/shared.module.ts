import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
const MaterialComponents = [
  // MatFormFieldModule,
  // MatButtonModule,
  // MatAutocompleteModule,
  // MatCardModule,
  // MatChipsModule,
  // MatPaginatorModule,
  // MatCheckboxModule,
  // MatDialogModule,
  // MatInputModule,
  // MatListModule,
  // MatMenuModule,
  // MatProgressBarModule,
  // MatSelectModule,
  // MatSnackBarModule,
  // MatTabsModule,
  // MatTableModule,
  // MatProgressSpinnerModule,
  // MatRadioModule,
  // MatDatepickerModule,
  // MatDividerModule,
  MatIconModule,
  MatToolbarModule
  // MatSortModule,
  // MatNativeDateModule,
  // MatBadgeModule,
  // MatStepperModule,
  // MatExpansionModule,
  // MatButtonToggleModule,
  // MatTooltipModule,
  // MatSliderModule
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MaterialComponents
  ],
  exports: [
    MaterialComponents
  ]
})
export class SharedModule { }
