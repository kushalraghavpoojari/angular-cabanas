import { LocationModel } from './location.model';

export class LocationsModel {
    public locations: Array<LocationModel>;

    constructor(locations: Array<LocationModel>) {
        this.locations = locations
    }
}