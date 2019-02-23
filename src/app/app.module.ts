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
import { CabanaResourceSelectionComponent } from './cabana-resource-selection/cabana-resource-selection.component';
import { CabanaResourceComponent } from './cabana-resource/cabana-resource.component';
import { FinalComponent } from './final/final.component';

import { ModalComponent } from './shared/Modal/modal.component';

import { CabanaScalerService } from './shared/cabana.scaler.service';
import { CabanaSharedService } from './shared/cabana.shared.service';

import { AngularDraggableModule } from 'angular2-draggable';

@NgModule({
	declarations: [
		AppComponent,
		HomeComponent,
		CabanaComponent,
		CabanaInfoComponent,
		CabanaMapPositionComponent,
		CabanaResourceSelectionComponent,
		CabanaResourceComponent,
		FinalComponent,
		ModalComponent
	],
	entryComponents: [ ModalComponent],
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
	providers: [ CabanaScalerService, CabanaSharedService ],
	bootstrap: [AppComponent]
})
export class AppModule { }
