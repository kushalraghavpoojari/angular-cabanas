import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CabanaScalerService } from './cabana.scaler.service';
import { Cabana } from '../models/cabana.model';
import { LocationModel } from '../models/location.model';
import { Resource } from '../models/resource.model';
import { UserOptions } from '../models/userOptions.model';
import { MatSnackBar, MatDialog } from '@angular/material';
import { ModalComponent } from './Modal/modal.component';

@Injectable()
export class CabanaSharedService {
    private numberOfLocations: number = 0;
    private fullImageName: String = '';
    private island: String = '';
    private image: HTMLImageElement = null;
    private diameter: number = 0;
    private radius: number = 0;
    private cabana: Cabana;
    private locations: Array<LocationModel>;
    private currentSelectedLocation: LocationModel;
    private userOptions: UserOptions;

    constructor(private http: HttpClient,
        private scalerService: CabanaScalerService,
        public snackBar: MatSnackBar,
        public dialog: MatDialog) { }

    setImageName(isMapImage: boolean, locationIndex: number, imageName: string) {
        if (isMapImage) {
            this.cabana.setImageName(imageName);
        } else {
            const currentLocation:LocationModel = this.locations[locationIndex];
            currentLocation.setLocationImageName(imageName);
        }
    }

    setCabanaInformation(formValues) {
        const { charac, imageName} = formValues;
        const currentCabanaLocations = [];
        
        this.numberOfLocations = +formValues.numberOfLocations;
        this.island = formValues.island;
        
        for (let i = 0; i< this.numberOfLocations; i++) {
            let numOfResources = formValues[`location-${i}-resources`];
            const resorceStartIndex = formValues[`location-${i}-resource-${i}-Id`];
            const currentLocationName = formValues[`location${i}`];
            const resourcesForCurrentLocation = this.getResourceValues(numOfResources, resorceStartIndex);
            const location = new LocationModel(currentLocationName, '', 0, 0, 150, resourcesForCurrentLocation, numOfResources, false, false, i+1);
            
            currentCabanaLocations.push(location);
        }
        this.locations = currentCabanaLocations;
        this.cabana = new Cabana(charac, imageName, this.locations);
    }

    getResourceValues(numOfResources: number, index: number) {
        const resources:Array<Resource> = [];
        for (let i = 0; i< numOfResources; i++) {
            let resourceIndex = index ? index + i : i + 1;
            const resource = new Resource(0, 0, resourceIndex, 19, 21);
            resources.push(resource);
        }
        return resources;
    }

    getLocations() {
        return this.locations;
    }

    getCabana() {
        return this.cabana;
    }

    setCabanaLocationCoordinates(x: number, y: number, index: number) {
        this.locations[index].setXY(x, y);

    }

    getFullImage() {
        const configUrl = `https://dev-assets.accesso.com/${this.island}/images/${this.fullImageName}`;
        return this.http.get(configUrl, { responseType: 'text' });
    }

    uploadImage(file, mapImage: boolean, elementToAppendTo: string, elementName: string, hasRadius: boolean, locationIndex: number) {
        const reader = new FileReader();
        if (mapImage) {
            this.setImageName(true, undefined, file.name);
        } else {
            this.setImageName(false, locationIndex, file.name);
        }
        reader.readAsDataURL(file);
        
        reader.onload = () => {
            this.image = null;
            this.image = new Image();
            this.image.src = reader.result as string;
        }

        reader.onloadend = () => {
            this.getCanvas(elementToAppendTo, elementName, hasRadius, locationIndex);
        }
    }

    getCanvas(element: string, elementName: string, hasRadius: boolean, locationIndex: number) {
        this.scalerService.setScaleFactorToImage(this.image);
        const scaleFactor = this.scalerService.getCurrentScaleFactor();
        const scaledHeight = this.image.height * scaleFactor;
        const scaledWidth = this.image.width * scaleFactor;

        // check if user has already uploaded an image.. if so delete the node
        if (document.getElementById(elementName)) {
            const element = document.getElementById(elementName);
            element.parentNode.removeChild(element);
        }

        let canvas:HTMLCanvasElement = document.createElement('canvas');
        canvas.setAttribute("id", elementName);
        let ctx = canvas.getContext("2d");
        canvas.width = scaledWidth;
        canvas.height = scaledHeight;
        canvas.style.display = 'block';
        canvas.style.marginLeft = 'auto';
        canvas.style.marginRight = 'auto';

        ctx.drawImage(this.image, 0, 0);

        let canvasElement:HTMLElement = document.getElementById(element);
        canvasElement.appendChild(canvas);
        this.setRadius(undefined, hasRadius, locationIndex);
    }

    setRadius(diameter = 150, hasRadius: boolean, locationIndex: number) {
        this.diameter = diameter * this.scalerService.getCurrentScaleFactor();
        this.radius = hasRadius ? this.diameter / 2 : 0;
        if (hasRadius && locationIndex !== undefined) {
            this.setLocationDiameter(locationIndex, this.diameter);
        }
    }

    setLocationDiameter(index: number, diameter: number) {
        this.locations[index].setDiameter(diameter);
    }

    setDimensionsForResource(resourceIndex: number, locationIndex: number, width: number, height: number) {
        const currentResource:Resource = this.locations[locationIndex].resources[resourceIndex];
        currentResource.setDimensions(width, height);
    }

    onMoveEnd(event, defaults = { x : 0, y : 0}, index: number, setIndexForResource) {
        const x = event.x + defaults.x;
        const y = event.y + defaults.y;
        const scaleFactor = this.scalerService.getCurrentScaleFactor();
        const X = Math.round((x + this.radius - this.scalerService.getWidthOffset()) / scaleFactor);
        const Y = Math.round((y + this.radius) / scaleFactor);
        if (!setIndexForResource && setIndexForResource !== 0) {
            this.setCabanaLocationCoordinates(X, Y, index);
        } else {
            this.setCabanaResourceCoordinates(X, Y, index, setIndexForResource);
        }
        console.log(X, Y);
    }

    setCabanaResourceCoordinates(x: number, y: number, resourceIndex: number, locationIndex: number) {
        const currentResource:Resource = this.locations[locationIndex].resources[resourceIndex];
        currentResource.setXY(x, y);
    }

    setCurrentSelectedLocation(location: LocationModel) {
        this.currentSelectedLocation = null;
        this.currentSelectedLocation = location;
    }

    getCurrentSelectedLocation() {
        return this.currentSelectedLocation;
    }

    hasCoordinatesToAdd() {
        return this.locations.some((location) => {
            return !location.coordinatesAdded;
        });
    }

    setUserOptions(options: UserOptions) {
        this.userOptions = options;
    }

    getUserOptions():UserOptions {
        return this.userOptions;
    }

    notifyUser(modalInfo, snackBarInfo, width = '550px') {
        const userOptions = this.getUserOptions(),
            notifyWithDialog = userOptions.notifyUsingModal();
        if (notifyWithDialog) {
            this.dialog.open(ModalComponent, {
                width: width,
                data: {
                    info: modalInfo.info,
                    additionalInfo: modalInfo.additionalInfo
                }
            });
        } else {
            this.snackBar.open(snackBarInfo, 'Got it');
        }
    }
}