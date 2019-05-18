import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';

import { MaterialModule } from './material.module';

import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import {AppRoutingModule} from './app-routing.module';

import { HomeComponent } from './home/home.component';
import { CabanaComponent } from './cabana/cabana.component';
import { CabanaInfoComponent } from './cabana-info/cabana-info.component';
import { CabanaMapPositionComponent } from './cabana-map-position/cabana-map-position.component';
import { CabanaLocationSelectionComponent } from './cabana-location-selection/cabana-location-selection.component';
import { CabanaResourceComponent } from './cabana-resource/cabana-resource.component';
import { FinalComponent } from './final/final.component';

import { ModalComponent } from './shared/components/Modal/modal.component';

import { CabanaScalerService } from './shared/services/cabana.scaler.service';
import { CabanaSharedService } from './shared/services/cabana.shared.service';
import { CabanaDataService } from './shared/services/cabana.data.service';

import { AngularDraggableModule } from 'angular2-draggable';
import { StepperComponent } from './stepper/stepper.component';

@NgModule({
	declarations: [
		AppComponent,
		HomeComponent,
		CabanaComponent,
		CabanaInfoComponent,
		CabanaMapPositionComponent,
		CabanaLocationSelectionComponent,
		CabanaResourceComponent,
		FinalComponent,
		StepperComponent,
		ModalComponent
	],
	entryComponents: [ModalComponent],
	imports: [
        BrowserModule,
        AppRoutingModule,
		BrowserAnimationsModule,
		FormsModule,
		ReactiveFormsModule,
		MaterialModule,
		FlexLayoutModule,
		AngularDraggableModule,
		HttpClientModule
	],
	providers: [CabanaScalerService, CabanaSharedService, CabanaDataService],
	bootstrap: [AppComponent]
})
export class AppModule { }
