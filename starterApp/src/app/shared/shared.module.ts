import { NgModule , CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { NavComponent } from './nav/nav.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import { LayoutPmComponent } from './layout-pm/layout-pm.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AssetUrlPipe } from 'src/app/core/pipes/asset.pipe';


const AngularMaterialComps: any = [
  MatCardModule,
  MatButtonModule,
  MatIconModule,
  MatDividerModule,
  MatTableModule,
  MatListModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatMenuModule,
  MatPaginatorModule,
  MatTabsModule,
  MatDialogModule,
  MatSnackBarModule,
  MatProgressBarModule,
];

@NgModule({
  imports: [
    AngularMaterialComps,
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  declarations: [
    NavComponent,
    LayoutPmComponent,
    AssetUrlPipe

  ],
  exports: [
    CommonModule,
    NavComponent,
    FormsModule,
    LayoutPmComponent,
    ReactiveFormsModule,
    AngularMaterialComps,
    HttpClientModule,
    AssetUrlPipe
  ],

  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class SharedModule {}
