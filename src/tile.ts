export class Tile {
    private id: number;
    private _x: number;
    private _y: number;
    private _width: number;
    private _height: number;

    private _imagePositionX: number;
    private _imagePositionY: number;

    private otherLayers: Array<HTMLImageElement> = [];

    private requestStatus: number = 0; // 0 - not requested, 1 - requesting, 2 - requested

    constructor (id: number, width: number, height: number, indexOfArrayX: number, indexOfArrayY: number, imagePositionX: number, imagePositionY: number) {
        this.id = id;
        this._x = indexOfArrayX;
        this._y = indexOfArrayY;
        this._width = width;
        this._height = height;

        this._imagePositionX = imagePositionX;
        this._imagePositionY = imagePositionY;
    }

    public get ID() :number {
        return this.id;
    }

    public get x() :number {
        return this._x;
    }

    public get y() :number {
        return this._y;
    }

    public get width() :number {
        return this._width;
    }

    public get height() :number {
        return this._height;
    }

    public get imageX() :number {
        return this._imagePositionX;
    }

    public get imageY() :number {
        return this._imagePositionY;
    }

    public get Status() :number {
        return this.requestStatus;
    }

    public setRequestingStatus() :void {
        this.requestStatus = 1;
    }

    public setRequestedStatus() :void {
        this.requestStatus = 2;
    }

    public addImage(image: HTMLImageElement) :void {
        this.otherLayers.push(image);
    }

    public getImages() :Array<HTMLImageElement> {
        return this.otherLayers.length ? this.otherLayers : null;
    }
}