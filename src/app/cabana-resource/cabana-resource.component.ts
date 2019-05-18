import { Component, OnInit, Input, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { CabanaSharedService } from '../shared/services/cabana.shared.service';
import { Router } from '@angular/router';
import { LocationModel } from '../models/location.model';
import { IResizeEvent } from 'angular2-draggable/lib/models/resize-event';

@Component({
	selector: 'app-cabana-resource',
	templateUrl: './cabana-resource.component.html',
	styleUrls: ['./cabana-resource.component.scss']
})
export class CabanaResourceComponent implements OnInit {
    locations:Array<LocationModel>
    locationIndex: number;
    numberOfResourcesAdded: number = 0;
    resourcesAdded: Boolean = false;
    selectedLocation:LocationModel = this.sharedService.getCurrentSelectedLocation();
    resources = this.selectedLocation.resources;
    
    constructor(@Inject(DOCUMENT) private document: Document, private sharedService: CabanaSharedService, private router: Router) { }
    
	ngOnInit() {
        this.locations = this.sharedService.getLocations();
        this.sendStateEvent();
    }

    /**
	 * Send Current State
	 */
    sendStateEvent(): void {
		this.sharedService.stateChanged(4);
	}

    /**
     * On image upload
     * @param event mouse event
     */
    onImageUpload(event: MouseEvent): void {
        this.locations.forEach((location, index) => {
            if (location.isSelected) {
                this.locationIndex = index;
            }
        });
        this.sharedService.uploadImage((<HTMLInputElement>event.target).files[0], false, 'cabana-resource-view', 'cabana-resource-map', this.locationIndex);
    }

    /**
     * Upload Image
     * @param id element id
     */
    uploadImage(id: string): void {
        const element = this.document.getElementById(id);
        element.click();
    }

    /**
     * Add Resource
     */
    addResource(): void {
        this.applyResourceIdStyles(this.numberOfResourcesAdded);
        if (this.numberOfResourcesAdded < +this.selectedLocation.numOfResources) {
            this.numberOfResourcesAdded++;
            this.resourcesAdded = this.numberOfResourcesAdded === +this.selectedLocation.numOfResources;
        }
    }

   /**
    * Apply styles to resource id
    * @param resourceIndex resource index 
    * @param width resource width
    * @param height resource height
    */
    applyResourceIdStyles(resourceIndex: number, width: number = 19, height: number = 21): void {
        this.resources.forEach((resource, i) => {
            if (resourceIndex === i) {
                const resourceElement = this.document.getElementById(`dragable-resource-element-${i}`);
                resourceElement.style.width = `${width - 4}px`;
                resourceElement.style.height = `${height - 7}px`;
                resourceElement.style.display = 'block';
            }
        });
    }

    /**
     * Move End Event
     * @param event move end event
     * @param resourceIndex resource index
     */
    onMoveEnd(event: MouseEvent, resourceIndex: number): void {
        this.sharedService.onMoveEnd(event, { x: 154, y: 0 }, resourceIndex, this.locationIndex);
    }
    
    /**
     * On Resize stop apply styles and set dimensions
     * @param event resize stop event
     * @param resourceIndex resource index 
     */
    onResizeStop(event: IResizeEvent, resourceIndex: number): void {
        this.applyResourceIdStyles(resourceIndex, event.size.width + 4, event.size.height + 7);
        this.sharedService.setDimensionsForResource(resourceIndex, this.locationIndex, event.size.width + 4, event.size.height + 7);
    }

    /**
     * Navigate to next route
     */
    nextRoute(): void {
        this.locations.forEach((location, locationIndex) => {
            if (location.isSelected) {
                location.coordinatesAdded = true;
            }
        });
        this.sharedService.hasCoordinatesToAdd() ? 
            this.router.navigate(['/cabana/cabana-location-selection']) :
            this.router.navigate(['/cabana/cabana-final']);
    }

    /**
     * Navigate to previous route
     */
    goBack(): void {
        this.router.navigate(['/cabana/cabana-location-selection']);
    }
}
