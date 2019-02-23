export class Resource {
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

    setXY(x: number, y:number) {
        this.x = x;
        this.y = y;
    }

    setDimensions(width: number, height: number) {
        this.width = width;
        this.height = height;
    }

    getXY() {
        return {
            x: this.x,
            y: this.y
        };
    }

    getDimensions() {
        return {
            w: this.width,
            h: this.height
        };
    }
}