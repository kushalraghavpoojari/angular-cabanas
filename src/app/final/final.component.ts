import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { CabanaSharedService } from '../shared/services/cabana.shared.service';
import { CabanaModel } from '../models/cabana.model';
import { LocationModel } from '../models/location.model';
import { ModalInfoInterface } from '../models/interfaces/modalInfo.interface';
import { OutputLocationInterface, OutputResourceInterface } from '../models/interfaces/finalOutput.interface';

@Component({
	selector: 'app-final',
	templateUrl: './final.component.html',
	styleUrls: ['./final.component.scss']
})
export class FinalComponent implements OnInit {
    cabana: CabanaModel;
    locations: Array<LocationModel>;
    finalOutput = {};
    constructor(@Inject(DOCUMENT) private document: Document, private sharedService: CabanaSharedService) { }

    ngOnInit() {
        this.sendStateEvent();
        this.cabana = this.sharedService.getCabana();
        this.locations = this.sharedService.getLocations() || [];
        this.getOutputObject();
    }

    sendStateEvent() {
		this.sharedService.stateChanged(5);
	}

    /**
     * Get final output object
     */
    getOutputObject(): void {
        const finalObj = {
            name: this.cabana.getCabanaName(),
            imageName: this.cabana.getImageName(),
            locations: []
        };
        let locations:any = [];
        this.locations.forEach((location) => {
            const locationCoordinates = location.getXYCoordinates();
            const locationObj:  OutputLocationInterface = {
                name: location.name,
                imageName: location.imageName,
                x: locationCoordinates.x,
                y: locationCoordinates.y,
                diameter: location.getDiameter(),
                resources: []
            };
            const resources: Array<OutputResourceInterface> = [];
            location.resources.forEach((resource) => {
                const {x, y}  = resource.getXYCoordinates();
                const {w, h} = resource.getDimensions();
                const resourceObj: OutputResourceInterface = {
                    id: resource.resourceId,
                    x,
                    y,
                    w,
                    h
                }
                resources.push(resourceObj);
            });
            locationObj.resources = resources;
            locations.push(locationObj);
        });
        finalObj.locations = locations;
        this.finalOutput = finalObj;
    }

    /**
     * Copy text to clipboard
     */
    copyText(): void {
        const modalInfo: ModalInfoInterface = {
                info: 'Copied to clipboard',
                additionalInfo: ''
            },
            snackBarInfo: string = 'Copied to clipboard',
            tempTextElement: HTMLTextAreaElement = this.document.createElement('textarea');
        
        tempTextElement.style.position = 'fixed';
        tempTextElement.style.left = '0';
        tempTextElement.style.top = '0';
        tempTextElement.style.opacity = '0';
        tempTextElement.value = JSON.stringify(this.finalOutput, null, 2);;
        
        this.document.body.appendChild(tempTextElement);
        
        tempTextElement.focus();
        tempTextElement.select();
        
        this.document.execCommand('copy');
        this.document.body.removeChild(tempTextElement);
        this.sharedService.notifyUser(modalInfo, snackBarInfo, '350px');
    }
}
