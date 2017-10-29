export class Tile {
    public id: number;
    private _x: number;
    private _y: number;
    private _width: number;
    private _height: number;

    private _imagePositionX: number;
    private _imagePositionY: number;

    constructor (id: number, width: number, height: number, indexOfArrayX: number, indexOfArrayY: number, imagePositionX: number, imagePositionY: number) {
        this.id = id;
        this._x = indexOfArrayX;
        this._y = indexOfArrayY;
        this._width = width;
        this._height = height;

        this._imagePositionX = imagePositionX;
        this._imagePositionY = imagePositionY;
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
}