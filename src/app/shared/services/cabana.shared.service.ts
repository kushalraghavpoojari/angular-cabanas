import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { MatSnackBar, MatDialog } from '@angular/material';

import { CabanaModel } from '../../models/cabana.model';
import { ResourceModel } from '../../models/resource.model';
import { UserOptionsModel } from '../../models/userOptions.model';
import { LocationModel } from '../../models/location.model';

import { ModalInfoInterface } from 'src/app/models/interfaces/modalInfo.interface';
import { CoordinatesInterface } from 'src/app/models/interfaces/coordinates.interface';

import { CabanaScalerService } from './cabana.scaler.service';
import { CabanaDataService } from './cabana.data.service';
import { ModalComponent } from '../components/Modal/modal.component';

@Injectable()
export class CabanaSharedService {
    private numberOfLocations: number = 0;
    private fullImageName: String = '';
    private island: String = '';
    private image: HTMLImageElement = null;
    private diameter: number = 0;
    private radius: number = 0;
    private locations: Array<LocationModel>;
    private currentSelectedLocation: LocationModel;

    constructor(
        @Inject(DOCUMENT) private document: Document,
        private http: HttpClient,
        private scalerService: CabanaScalerService,
        private dataService: CabanaDataService,
        public snackBar: MatSnackBar,
        public dialog: MatDialog) { }

    /**
     * Creates a Cabana and sets Cabana Information
     * @param formValues cabana information form values
     */
    setCabanaInformation(formValues: any): void {
        const { charac, imageName} = formValues;
        const currentCabanaLocations = [];
        
        this.numberOfLocations = +formValues.numberOfLocations;
        this.island = formValues.island;
        this.fullImageName = formValues.imageName;
        
        for (let i = 0; i< this.numberOfLocations; i++) {
            let numOfResources = formValues[`location-${i}-resources`];
            const resorceStartIndex = formValues[`location-${i}-resource-${i}-Id`];
            const currentLocationName = formValues[`location${i}`];
            const resourcesForCurrentLocation = this.getResourceValues(numOfResources, resorceStartIndex);
            const location = this.dataService.createLocation(currentLocationName, resourcesForCurrentLocation, numOfResources, i+1);
            
            currentCabanaLocations.push(location);
        }
        this.locations = currentCabanaLocations;
        this.dataService.createCabana(charac, imageName, this.locations);
    }

    /**
     * Creates Resource and sets the resource information
     * @param numOfResources number of resources
     * @param resourceStartIndex starting index for resources 
     */
    getResourceValues(numOfResources: number, resourceStartIndex: number): Array<ResourceModel> {
        const resources:Array<ResourceModel> = [];
        for (let i = 0; i< numOfResources; i++) {
            let resourceIndex = resourceStartIndex ? resourceStartIndex + i : i + 1;
            const resource = this.dataService.createResource(resourceIndex);
            resources.push(resource);
        }
        return resources;
    }

    /**
     * Get Locations from Data Service
     */
    getLocations(): Array<LocationModel> {
        return this.dataService.getLocations();
    }

    /**
     * Get Cabana from Data Service
     */
    getCabana(): CabanaModel {
        return this.dataService.getCabana();
    }

    /**
     * Set X,Y co-ordinates for a location
     * @param x x co-ordinate
     * @param y y co-ordinate
     * @param locationIndex location index
     */
    setCabanaLocationCoordinates(x: number, y: number, locationIndex: number): void {
        this.dataService.setLocationCoordinatesForCabana(x, y, locationIndex);
    }

    getFullImage(island: string, imageName: string) {
        const configUrl = `https://dev-assets.accesso.com/${island}/images/${imageName}`;
        return this.http.get(configUrl, { responseType: 'blob' });
    }

    createImageFromBlob(image: Blob, isMapImage: boolean, elementToAppendTo: string, elementName: string, locationIndex: number) {
        let reader = new FileReader();

        if (image) {
            reader.readAsDataURL(image);
        }

        reader.onload = () => {
           this.image = null;
           this.image = new Image();
           this.image.src = reader.result as string;
        };

        reader.onloadend = () => {
            // check if user has already uploaded an image.. if so delete the node
            this.removeExistingElement(elementName);

            // now create a canvas
            this.createCanvas(elementToAppendTo, elementName);

            // Set Radius for Map
            this.setRadius(150, isMapImage, locationIndex);
        }
    }

    getImage(island: string, imageName: string, isMapImage: boolean, elementToAppendTo: string, elementName: string, locationIndex: number) {
        this.getFullImage(island, imageName).subscribe(data => {
          this.createImageFromBlob(data, isMapImage, elementToAppendTo, elementName, locationIndex);
        }, error => {
          console.log(error);
        });
    }

    /**
     * Upload image and create canvas
     * @param file file to be uploaded
     * @param isMapImage is a map image
     * @param elementToAppendTo element where image has to be appended to
     * @param elementName element name
     * @param locationIndex location index
     */
    uploadImage(file: File, isMapImage: boolean, elementToAppendTo: string, elementName: string, locationIndex: number): void {
        const reader = new FileReader();
        const index = isMapImage ? -1 : locationIndex;
        
        this.setImageName(isMapImage, index, file.name);
        
        reader.readAsDataURL(file);
        
        reader.onload = () => {
            this.image = null;
            this.image = new Image();
            this.image.src = reader.result as string;
        }

        reader.onloadend = () => {
            // check if user has already uploaded an image.. if so delete the node
            this.removeExistingElement(elementName);

            // now create a canvas
            this.createCanvas(elementToAppendTo, elementName);

            // Set Radius for Map
            this.setRadius(150, isMapImage, locationIndex);
        }
    }

    /**
     * Set Image Name for Cabana/Location
     * @param isMapImage is a map image
     * @param locationIndex location index
     * @param imageName image name
     */
    setImageName(isMapImage: boolean, locationIndex: number, imageName: string): void {
        if (isMapImage) {
            this.dataService.setImageNameForCabana(imageName);
        } else {
            this.dataService.setImageNameForLocation(locationIndex, imageName);
        }
    }

    /**
     * Remove existing element if any
     * @param elementName element name
     */
    removeExistingElement(elementName: string) {
        if (this.document.getElementById(elementName)) {
            const element: HTMLElement = this.document.getElementById(elementName);
            element.parentNode.removeChild(element);
        }
    }
    
    /**
     * Create Canvas
     * @param elementToAppendTo element where canvas has to be appended to
     * @param elementName element name
     * @param hasRadius has radius
     * @param locationIndex location index
     */
    createCanvas(elementToAppendTo: string, elementName: string): void {
        this.scalerService.setScaleFactorToImage(this.image);
        const scaleFactor = this.scalerService.getCurrentScaleFactor();
        const scaledHeight = this.image.height * scaleFactor;
        const scaledWidth = this.image.width * scaleFactor;

        // check if user has already uploaded an image.. if so delete the node
        // this.removeExistingElement(elementName);

        const canvas: HTMLCanvasElement = this.document.createElement('canvas');
        canvas.setAttribute('id', elementName);
        canvas.width = scaledWidth;
        canvas.height = scaledHeight;
        canvas.style.display = 'block';
        canvas.style.marginLeft = 'auto';
        canvas.style.marginRight = 'auto';
        
        const canvasContext: CanvasRenderingContext2D = canvas.getContext('2d');
        canvasContext.drawImage(this.image, 0, 0);

        const canvasElement:HTMLElement = this.document.getElementById(elementToAppendTo);
        canvasElement.appendChild(canvas);
    }

    /**
     * Set Radius 
     * @param diameter diameter
     * @param hasRadius has radius
     * @param locationIndex location index
     */
    setRadius(diameter: number = 150, hasRadius: boolean, locationIndex: number): void {
        this.diameter = diameter * this.scalerService.getCurrentScaleFactor();
        this.radius = hasRadius ? this.diameter / 2 : 0;

        if (hasRadius && locationIndex !== -1) {
            this.setLocationDiameter(locationIndex, this.diameter);
        }
    }

    /**
     * Set Diameter to a location
     * @param index location index
     * @param diameter diameter
     */
    setLocationDiameter(index: number, diameter: number): void {
       this.dataService.setLocationDiameter(index, diameter);
    }

    /**
     * Set Dimensions for a location's resource
     * @param resourceIndex resourceIndex
     * @param locationIndex locationIndex
     * @param width width
     * @param height height
     */
    setDimensionsForResource(resourceIndex: number, locationIndex: number, width: number, height: number): void {
        this.dataService.setDimensionsForResource(resourceIndex, locationIndex, width, height);
    }

    /**
     * On Move End
     * @param event Mouse Event
     * @param coordinates co-ordinates
     * @param index location / resource index
     * @param locationIndex location index
     */
    onMoveEnd(event: MouseEvent, coordinates: CoordinatesInterface = { x : 0, y : 0 }, index: number, locationIndex: number = -1): void {
        const x = event.x + coordinates.x;
        const y = event.y + coordinates.y;
        const scaleFactor = this.scalerService.getCurrentScaleFactor();
        const X = Math.round((x + this.radius - this.scalerService.getWidthOffset()) / scaleFactor);
        const Y = Math.round((y + this.radius) / scaleFactor);
        if (locationIndex === -1) {
            this.setCabanaLocationCoordinates(X, Y, index);
        } else {
            this.setCabanaResourceCoordinates(X, Y, index, locationIndex);
        }
    }

    /**
     * Sets X and Y co-ordinates for a resource
     * @param x x co-ordinate
     * @param y y co-ordinate
     * @param resourceIndex resource index
     * @param locationIndex location index
     */
    setCabanaResourceCoordinates(x: number, y: number, resourceIndex: number, locationIndex: number): void {
        this.dataService.setCabanaResourceCoordinates(resourceIndex, locationIndex, x, y);
    }

    /**
     * Set location as currently selected location
     * @param location selected location
     */
    setCurrentSelectedLocation(location: LocationModel): void {
        this.currentSelectedLocation = null;
        this.currentSelectedLocation = location;
    }

    /**
     * Get Current selected location
     */
    getCurrentSelectedLocation(): LocationModel {
        return this.currentSelectedLocation;
    }

    /**
     * Checks if the any location has no co-ordinates added
     */
    hasCoordinatesToAdd(): boolean {
        return this.locations.some((location) => {
            return !location.coordinatesAdded;
        });
    }

    /**
     * Sets User Options
     * @param options user options
     */
    setUserOptions(options: UserOptionsModel): void {
        this.dataService.setUserOptions(options);
    }

    /**
     * Get User Options from Data Service
     */
    getUserOptions(): UserOptionsModel {
        return this.dataService.getUserOptions();
    }

    /**
     * Create User Options
     * @param enableDarkMode enable dark mode
     * @param enableModal enable modal
     * @param enableSnackBar enable snack bar
     */
    createUserOptions(enableDarkMode: boolean, enableModal: boolean, enableSnackBar: boolean, enableImageUpload: boolean): void {
        this.dataService.createUserOptions(enableDarkMode, enableModal, enableSnackBar, enableImageUpload);
    }

    /**
     * Notify User
     * @param modalInfo modal information
     * @param snackBarInfo snack bar information
     * @param width width for modal
     */
    notifyUser(modalInfo: ModalInfoInterface, snackBarInfo: string, width = '550px'): void {
        const userOptions = this.getUserOptions(),
            notifyWithModal = userOptions.notifyUsingModal();
        if (notifyWithModal) {
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