import { LocationModel } from './location.model';

export class Locations {
    public locations: Array<LocationModel>;

    constructor(locations: Array<LocationModel>) {
        this.locations = locations
    }
}