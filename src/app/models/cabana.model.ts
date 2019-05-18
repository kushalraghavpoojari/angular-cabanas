import { LocationModel } from './location.model';

export class CabanaModel {

    constructor(private name: string, private imageName: string, private locations: Array<LocationModel>) {
    }

    setImageName(name: string) {
        this.imageName = name;
    }

    getImageName(): string {
        return this.imageName;
    }

    getCabanaName(): string {
        return this.name;
    }

    getLocations(): Array<LocationModel> {
        return this.locations;
    }
}