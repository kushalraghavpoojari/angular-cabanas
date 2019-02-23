import { Component, OnInit, Input } from '@angular/core';
import { CabanaSharedService } from '../shared/cabana.shared.service';
import { Router } from '@angular/router';
import { LocationModel } from '../models/location.model';

@Component({
	selector: 'app-cabana-map-position',
	templateUrl: './cabana-map-position.component.html',
	styleUrls: ['./cabana-map-position.component.scss']
})
export class CabanaMapPositionComponent implements OnInit {
    bubbleAdded: Boolean = false;
    numberOfBubblesAdded: number = 0;
    locations:Array<LocationModel>;
    
    @Input() stepper;

	constructor(private sharedService: CabanaSharedService, private router:Router) { 
    }

	ngOnInit() {
        this.locations = this.sharedService.getLocations();
    }
    
    onImageUpload(event) {
        this.sharedService.uploadImage(event.target.files[0], true, 'cabana-view', 'cabana-full-map', true, undefined);
    }

    uploadImage(id: string) {
        const element = document.getElementById(id);
        element.click();
    }

    onResizeStop(event, index: number) {
        console.log(event.size.width, index)
        this.sharedService.setRadius(event.size.width, true, index);
        this.applyLocationNameStyles(event.size.width, index);
    }

    addBubble() {
        let dragElement = document.getElementById(`dragable-element-${this.numberOfBubblesAdded}`);
        dragElement.style.display = 'block';
        this.applyLocationNameStyles(undefined, this.numberOfBubblesAdded);
        if (this.numberOfBubblesAdded < this.locations.length) {
            this.numberOfBubblesAdded++;
            this.bubbleAdded = this.numberOfBubblesAdded === this.locations.length;
        }
    }

    applyLocationNameStyles(diameter: number = 150, index: number) {
        const radius = diameter / 2;
        this.locations.forEach((location, i) => {
            if (index === i) {
                const locationElement = document.getElementById(`cabana-name-${i}`);
                locationElement.style.width = `${diameter-2}px`;
                locationElement.style.top = `${radius-10}px`;
                locationElement.style.left = `1px`;
                locationElement.style.display = 'block';
            }
        });
    }

    onMoveEnd(event, index: number) {
        this.sharedService.onMoveEnd(event, { x: 154, y: 0 }, index, false);
    }

    goBack() {
        this.router.navigate(['/cabana']);
    }

    onClickNext() {
        this.router.navigate(['/cabana/cabana-resource-selection']);
    }

}
