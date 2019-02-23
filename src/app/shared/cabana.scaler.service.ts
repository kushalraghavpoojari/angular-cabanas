export class CabanaScalerService {
    scaleFactor = 1;
    maxHeight = 325;
    maxWidth = 900;
    parentViewWidth = 950;
    widthOffset = 0;

    setScaleFactorToImage(image) {
        const heightRatio = this.maxHeight / image.height;
        const widthratio = this.maxWidth / image.width;
        this.scaleFactor = Math.min(heightRatio, widthratio, 1);
        this.widthOffset = (this.parentViewWidth - (this.scaleFactor * image.width))/2;
    }

    getCurrentScaleFactor() {
        return this.scaleFactor;
    }

    getWidthOffset() {
        return this.widthOffset;
    }
}