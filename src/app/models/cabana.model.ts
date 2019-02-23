import { LocationModel } from './location.model';

export class Cabana {
    public name: string;
    public imageName: string;
    public locations: Array<LocationModel>;

    constructor(name: string, imageName: string, locations: Array<LocationModel>) {
        this.name = name;
        this.imageName = imageName;
        this.locations = locations;
    }

    setImageName(name: string) {
        this.imageName = name;
    }
}