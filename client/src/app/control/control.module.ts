import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ControlRoutingModule } from './control-routing.module';
import {MatDialogModule, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { MatSliderModule } from '@angular/material/slider';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ControlComponent } from './control.component';

import { HeaderComponent } from '../component/header/header.component';
import { SidebarComponent } from '../component/sidebar/sidebar.component';

import { MaterialModule } from "../material/material.module";


@NgModule({
  declarations: [
  
    // ControlComponent,
    // HeaderComponent,
    // SidebarComponent
  ],
  imports: [
    CommonModule, 
    ControlRoutingModule,
    MaterialModule,
    DragDropModule,
    FormsModule
  ],
})
export class ControlModule {}
