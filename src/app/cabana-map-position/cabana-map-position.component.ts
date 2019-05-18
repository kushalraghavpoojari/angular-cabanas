import { Component, OnInit, Input, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { CabanaSharedService } from '../shared/services/cabana.shared.service';
import { Router } from '@angular/router';
import { LocationModel } from '../models/location.model';
import { IResizeEvent } from 'angular2-draggable/lib/models/resize-event';

@Component({
	selector: 'app-cabana-map-position',
	templateUrl: './cabana-map-position.component.html',
	styleUrls: ['./cabana-map-position.component.scss']
})
export class CabanaMapPositionComponent implements OnInit {
    bubbleAdded: Boolean = false;
    numberOfBubblesAdded: number = 0;
    locations:Array<LocationModel>;

	constructor(@Inject(DOCUMENT) private document: Document, private sharedService: CabanaSharedService, private router:Router) {}

	ngOnInit() {
        this.locations = this.sharedService.getLocations();
        this.sendStateEvent();
    }

    /**
	 * Send Current State
	 */
    sendStateEvent(): void {
		this.sharedService.stateChanged(2);
	}
    
    /**
     * On image upload
     * @param event mouse event
     */
    onImageUpload(event: MouseEvent): void {
        this.sharedService.uploadImage((<HTMLInputElement>event.target).files[0], true, 'cabana-view', 'cabana-full-map', -1);
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
     * Set Radus and apply styles on resize stop
     * @param event resize event
     * @param locationIndex location index 
     */
    onResizeStop(event: IResizeEvent, locationIndex: number): void {
        this.sharedService.setRadius(event.size.width, true, locationIndex);
        this.applyLocationNameStyles(locationIndex, event.size.width);
    }

    /**
     * Add Location Bubble on map
     */
    addBubble(): void {
        const dragElement = this.document.getElementById(`dragable-element-${this.numberOfBubblesAdded}`);
        dragElement.style.display = 'block';
        this.applyLocationNameStyles(this.numberOfBubblesAdded);
        if (this.numberOfBubblesAdded < this.locations.length) {
            this.numberOfBubblesAdded++;
            this.bubbleAdded = this.numberOfBubblesAdded === this.locations.length;
        }
    }

    /**
     * Apply styles to location name in bubble
     * @param diameter diameter of location bubble
     * @param locationIndex location index
     */
    applyLocationNameStyles(locationIndex: number, diameter: number = 150): void {
        const radius = diameter / 2;
        this.locations.forEach((location, i) => {
            if (locationIndex === i) {
                const locationElement = this.document.getElementById(`cabana-name-${i}`);
                locationElement.style.width = `${diameter-2}px`;
                locationElement.style.top = `${radius-10}px`;
                locationElement.style.left = `1px`;
                locationElement.style.display = 'block';
            }
        });
    }

    /**
     * Move End Event
     * @param event move end event
     * @param index 
     */
    onMoveEnd(event: MouseEvent, index: number): void {
        this.sharedService.onMoveEnd(event, { x: 154, y: 0 }, index);
    }

    /**
     * Navigate to previous route
     */
    goBack(): void {
        this.router.navigate(['/cabana']);
    }

    /**
     * Navigate to next route
     */
    onClickNext(): void {
        this.router.navigate(['/cabana/cabana-location-selection']);
    }

}
