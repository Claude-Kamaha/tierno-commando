import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatStepperModule } from '@angular/material/stepper';;
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatSliderModule } from '@angular/material/slider';
import { LoaderComponent } from './loader/loader.component';
// import * as intlTelInput from 'intl-tel-input';


const MaterialComponents = [

  MatButtonModule,
  MatAutocompleteModule,
  MatCardModule,
  MatChipsModule,
  MatPaginatorModule,
  MatCheckboxModule,
  MatDialogModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatProgressBarModule,
  MatSelectModule,
  MatSnackBarModule,
  MatTabsModule,
  MatTableModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatDatepickerModule,
  MatDividerModule,
  MatIconModule,
  MatToolbarModule,
  MatSortModule,
  MatNativeDateModule,
  MatBadgeModule,
  MatStepperModule,
  MatExpansionModule,
  MatButtonToggleModule,
  MatTooltipModule,
  MatSliderModule
];
const OtherComponents = [
  // intlTelInput
]

@NgModule({
  declarations: [
    LoaderComponent
  ],
  imports: [
    CommonModule,
    MaterialComponents,
    // OtherComponents
  ],
  exports: [
    MaterialComponents,
    ReactiveFormsModule,
    FormsModule,
    LoaderComponent
    // OtherComponents
  ]
})
export class SharedModule { }
