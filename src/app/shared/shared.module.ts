import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
const MaterialComponents = [

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
  MatToolbarModule,

  // MatSortModule,
  // MatNativeDateModule,
  // MatBadgeModule,
  // MatStepperModule,
  // MatExpansionModule,
  // MatButtonToggleModule,
  // MatTooltipModule,
  // MatSliderModule
];
const OtherComponents = [


]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MaterialComponents,
    ReactiveFormsModule,
    FormsModule,
    // OtherComponents
  ],
  exports: [
    MaterialComponents,
    ReactiveFormsModule,
    FormsModule
    // OtherComponents
  ]
})
export class SharedModule { }
