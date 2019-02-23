import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CabanaSharedService } from '../shared/cabana.shared.service';
import { MatSnackBar } from '@angular/material';
import { Cabana } from '../models/cabana.model';
import { LocationModel } from '../models/location.model';

@Component({
	selector: 'app-final',
	templateUrl: './final.component.html',
	styleUrls: ['./final.component.scss']
})
export class FinalComponent implements OnInit {
    cabana:Cabana;
    locations:Array<LocationModel>;
    finalOutput:any = {};
    constructor(private sharedService: CabanaSharedService, public snackBar: MatSnackBar) { }

    ngOnInit() {
        this.cabana = this.sharedService.getCabana();
        this.locations = this.cabana.locations;
        this.getOutputObject();
    }

    getOutputObject() {
        const finalObj = {
            name: this.cabana.name,
            imageName: this.cabana.imageName,
            locations: []
        };
        let locations:any = [];
        this.locations.forEach((location) => {
            let locationObj: any = {};
            let resources: any = [];
            locationObj.name = location.name;
            locationObj.imageName = location.imageName;
            locationObj.x = location.getXY().x;
            locationObj.y = location.getXY().y;
            locationObj.diameter = location.getDiameter();
            location.resources.forEach((resource) => {
                let resourceObj: any = {};
                resourceObj.id = String(resource.resourceId);
                resourceObj.x = resource.getXY().x;
                resourceObj.y = resource.getXY().y;
                resourceObj.w = resource.getDimensions().w;
                resourceObj.h = resource.getDimensions().h;
                resources.push(resourceObj);
            });
            locationObj.resources = resources;
            locations.push(locationObj);
        });
        finalObj.locations = locations;
        console.log(finalObj);
        this.finalOutput = finalObj;
    }

    copyText() {
        let selBox = document.createElement('textarea');
        selBox.style.position = 'fixed';
        selBox.style.left = '0';
        selBox.style.top = '0';
        selBox.style.opacity = '0';
        selBox.value = JSON.stringify(this.finalOutput, null, 2);;
        document.body.appendChild(selBox);
        selBox.focus();
        selBox.select();
        document.execCommand('copy');
        document.body.removeChild(selBox);
        this.snackBar.open('Copied to clipboard', 'Got it');
    }
}
