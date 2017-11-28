export declare class Tile {
    private id;
    private _x;
    private _y;
    private _width;
    private _height;
    private _imagePositionX;
    private _imagePositionY;
    private otherLayers;
    private requestStatus;
    constructor(id: number, width: number, height: number, indexOfArrayX: number, indexOfArrayY: number, imagePositionX: number, imagePositionY: number);
    readonly ID: number;
    readonly x: number;
    readonly y: number;
    readonly width: number;
    readonly height: number;
    readonly imageX: number;
    readonly imageY: number;
    readonly Status: number;
    setRequestingStatus(): void;
    setRequestedStatus(): void;
    addImage(image: HTMLImageElement): void;
    getImages(): Array<HTMLImageElement>;
}
