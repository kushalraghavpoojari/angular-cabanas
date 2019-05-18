export class CabanaScalerService {
    scaleFactor = 1;
    maxHeight = 325;
    maxWidth = 900;
    parentViewWidth = 950;
    widthOffset = 0;

    /**
     * Sets scale factor to image
     * @param image image
     */
    setScaleFactorToImage(image: HTMLImageElement): void {
        const heightRatio = this.maxHeight / image.height;
        const widthratio = this.maxWidth / image.width;
        this.scaleFactor = Math.min(heightRatio, widthratio, 1);
        this.widthOffset = (this.parentViewWidth - (this.scaleFactor * image.width))/2;
    }

    /**
     * Get Current Scale Factor
     */
    getCurrentScaleFactor(): number {
        return this.scaleFactor;
    }

    /**
     * Get Width Offset
     */
    getWidthOffset(): number {
        return this.widthOffset;
    }
}