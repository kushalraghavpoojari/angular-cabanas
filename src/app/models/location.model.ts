import { Resource } from "./resource.model";

export class LocationModel {
    public name: string;
    public imageName: string;
    private x: number;
    private y: number;
    private diameter: number;
    public numOfResources: string;
    public resources: Array<Resource>;
    public isSelected: boolean;
    public coordinatesAdded: boolean;
    public locationId: number;

    constructor(name: string, imageName: string, x: number, y: number, diameter: number, resources: Array<Resource>, numOfResources: string, isSelected: boolean, coordinatesAdded: boolean, locationId: number) {
        this.name = name;
        this.imageName = imageName;
        this.x = x;
        this.y = y;
        this.diameter = diameter;
        this.resources = resources;
        this.numOfResources = numOfResources;
        this.isSelected = isSelected;
        this.coordinatesAdded = coordinatesAdded;
        this.locationId = locationId;
    }

    setLocationImageName(imageName: string) {
        this.imageName = imageName;
    }

    setDiameter(diameter: number) {
        this.diameter = diameter;
    }

    setXY(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    getXY() {
        return {
            x: this.x,
            y: this.y
        }
    }

    getDiameter() {
        return this.diameter;
    }
}