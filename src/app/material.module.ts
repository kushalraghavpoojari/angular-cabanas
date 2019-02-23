import { NgModule } from '@angular/core';
import {
    MatGridListModule,  
    MatIconModule, 
    MatCardModule, 
    MatFormFieldModule, 
    MatInputModule,
    MatButtonModule,
    MatMenuModule,
    MatStepperModule,
    MatSlideToggleModule,
    MatDialogModule,
    MatSnackBarModule,
    MatExpansionModule,
    MatSelectModule,
    MatCheckboxModule
} from '@angular/material';

export const materialModules = [
    MatGridListModule,  
    MatIconModule, 
    MatCardModule, 
    MatFormFieldModule, 
    MatInputModule,
    MatButtonModule,
    MatMenuModule,
    MatSlideToggleModule,
    MatStepperModule,
    MatDialogModule,
    MatSnackBarModule,
    MatExpansionModule,
    MatSelectModule,
    MatCheckboxModule,
];

@NgModule({
    imports: materialModules,
    exports: materialModules
})

export class MaterialModule {}