import { Component, OnInit, Input } from '@angular/core';
import { CabanaSharedService } from '../shared/cabana.shared.service';
import { Router } from '@angular/router';
import { LocationModel } from '../models/location.model';

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
    @Input() stepper;
    
    constructor(private sharedService: CabanaSharedService, private router: Router) { }
    
	ngOnInit() {
        this.locations = this.sharedService.getLocations();
    }

    onImageUpload(event) {
        this.locations.forEach((location, index) => {
            if (location.isSelected) {
                this.locationIndex = index;
            }
        });
        this.sharedService.uploadImage(event.target.files[0], false, 'cabana-resource-view', 'cabana-resource-map', false, this.locationIndex);
    }

    uploadImage(id: string) {
        const element = document.getElementById(id);
        element.click();
    }

    addResource() {
        this.applyResourceIdStyles(undefined, undefined, this.numberOfResourcesAdded);
        if (this.numberOfResourcesAdded < +this.selectedLocation.numOfResources) {
            this.numberOfResourcesAdded++;
            this.resourcesAdded = this.numberOfResourcesAdded === +this.selectedLocation.numOfResources;
        }
    }

    applyResourceIdStyles(width: number = 19, height: number = 21, index: number) {
        this.resources.forEach((resource, i) => {
            if (index === i) {
                const resourceElement = document.getElementById(`dragable-resource-element-${i}`);
                resourceElement.style.width = `${width - 4}px`;
                resourceElement.style.height = `${height - 7}px`;
                resourceElement.style.display = 'block';
            }
        });
    }

    onMoveEnd(event, resourceIndex: number) {
        this.sharedService.onMoveEnd(event, { x: 154, y: 0 }, resourceIndex, this.locationIndex);
    }
    
    onResizeStop(event, index: number) {
        this.applyResourceIdStyles(event.size.width + 4, event.size.height + 7, index);
        this.sharedService.setDimensionsForResource(index, this.locationIndex, event.size.width + 4, event.size.height + 7);
    }

    nextRoute() {
        this.locations.forEach((location, locationIndex) => {
            if (location.isSelected) {
                location.coordinatesAdded = true;
            }
        });
        this.sharedService.hasCoordinatesToAdd() ? 
            this.router.navigate(['/cabana/cabana-resource-selection']) :
            this.router.navigate(['/cabana/cabana-final']);
    }
}
