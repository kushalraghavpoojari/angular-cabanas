import { CabanaModel } from 'src/app/models/cabana.model';
import { LocationModel } from 'src/app/models/location.model';
import { ResourceModel } from 'src/app/models/resource.model';
import { UserOptionsModel } from 'src/app/models/userOptions.model';

export class CabanaDataService {
    private cabana: CabanaModel;
    private locations: Array<LocationModel>;
    private userOptions: UserOptionsModel;
    constructor() {}

    /* CABANA METHODS */

    /**
     * Creates cabana through cabana model
     * @param charac cabana charac value
     * @param imageName full map image
     * @param locations locations for cabana
     */
    createCabana(charac: string, imageName: string, locations: Array<LocationModel>): void {
        this.cabana = new CabanaModel(charac, imageName, locations);
        this.locations = this.cabana.getLocations();
    }

    /**
     * Returns Cabana
     */
    getCabana():CabanaModel {
        return this.cabana;
    }

    /**
     * Sets images name for Cabana
     * @param imageName iamge name for Cabana
     */
    setImageNameForCabana(imageName: string): void {
        this.cabana.setImageName(imageName);
    }

    /* LOCATION METHODS */

    /**
     * Create Location through Location Model
     * @param name name of location
     * @param resources resources for location
     * @param numOfResources number fo resources
     * @param locationId location id
     */
    createLocation(
        name: string,
        resources: Array<ResourceModel>,
        numOfResources: string,
        locationId: number): LocationModel {
            return new LocationModel(name, '', 0, 0, 150, resources, numOfResources, false, false, locationId)
        }
    
    /**
     * Returns Locations
     */
    getLocations(): Array<LocationModel> {
        return this.locations;
    }

    /**
     * Returns current location
     * @param locationIndex location index
     */
    getCurrentLocation(locationIndex: number): LocationModel {
        return this.locations[locationIndex];
    }

    /**
     * Sets Image name for a location
     * @param locationIndex location index
     * @param imageName image name for location
     */
    setImageNameForLocation(locationIndex: number, imageName: string) {
        const currentLocation: LocationModel = this.getCurrentLocation(locationIndex);
        currentLocation.setLocationImageName(imageName);
    }

    /**
     * Sets location co-ordinates for cabana
     * @param x x co-ordinate
     * @param y y co-ordinate
     * @param locationIndex location index
     */
    setLocationCoordinatesForCabana(x: number, y: number, locationIndex: number) {
        const currentLocation: LocationModel = this.getCurrentLocation(locationIndex);
        currentLocation.setXYCoordinates(x, y);
    }

    /**
     * Set Location Diameter
     * @param locationIndex location index
     * @param diameter diameter
     */
    setLocationDiameter(locationIndex: number, diameter: number): void {
        const currentLocation: LocationModel = this.getCurrentLocation(locationIndex);
        currentLocation.setDiameter(diameter);
    }


    /* RESOURCE METHODS */

    /**
     * Create Resource through Resource Model
     * @param resourceIndex resource index
     */
    createResource(resourceIndex: number): ResourceModel {
        return new ResourceModel(0, 0, resourceIndex, 19, 21);
    }

    /**
     * Get Current Resource
     * @param locationIndex location index
     * @param resourceIndex resource index
     */
    getCurrentResource(locationIndex: number, resourceIndex: number): ResourceModel {
        const currentLocation = this.getCurrentLocation(locationIndex);
        return currentLocation.resources[resourceIndex];
    }

    /**
     * Set Dimensions(width, height) for a resource
     * @param resourceIndex resource index
     * @param locationIndex location index
     * @param width width
     * @param height height
     */
    setDimensionsForResource(resourceIndex: number, locationIndex: number, width: number, height: number): void {
        const currentResource: ResourceModel = this.getCurrentResource(locationIndex, resourceIndex);
        currentResource.setDimensions(width, height);
    }

    /**
     * Set Cabana Resource Coordinates
     * @param resourceIndex resource index
     * @param locationIndex location index
     * @param x x co-ordinate
     * @param y y co-ordinate
     */
    setCabanaResourceCoordinates(resourceIndex: number, locationIndex: number, x: number, y: number) {
        const currentResource: ResourceModel = this.getCurrentResource(locationIndex, resourceIndex);
        currentResource.setXYCoordinates(x, y);
    }

    /* USER OPTIONS METHODS */

    /**
     * Creates User Options through UserOptionsModel
     * @param enableDarkMode enable dark mode
     * @param enableModal enable modal
     * @param enableSnackBar enable snack bar
     */
    createUserOptions(enableDarkMode: boolean, enableModal: boolean, enableSnackBar: boolean, enableImageUpload: boolean) {
        this.userOptions = new UserOptionsModel(enableDarkMode, enableModal, enableSnackBar, enableImageUpload);
    }

    /**
     * Returns UserOptions
     */
    getUserOptions(): UserOptionsModel {
        return this.userOptions;
    }

    /**
     * Sets User options
     * @param options user options
     */
    setUserOptions(options: UserOptionsModel): void {
        this.userOptions = options;
    }
}