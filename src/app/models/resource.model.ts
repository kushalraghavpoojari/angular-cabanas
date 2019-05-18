export class ResourceModel {
    private x: number;
    private y: number;
    public resourceId: number;
    private width: number;
    private height: number;

    constructor(x: number, y: number, resourceId: number, width: number, height: number) {
        this.x = x;
        this.y = y;
        this.resourceId = resourceId;
        this.width = width;
        this.height = height;
    }

    setXYCoordinates(x: number, y:number) {
        this.x = x;
        this.y = y;
    }

    getXYCoordinates() {
        return {
            x: this.x,
            y: this.y
        };
    }

    setDimensions(width: number, height: number) {
        this.width = width;
        this.height = height;
    }

    getDimensions() {
        return {
            w: this.width,
            h: this.height
        };
    }
}