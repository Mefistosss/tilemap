export declare class ImageLoader {
    private _width;
    private _height;
    private node;
    private _image;
    private state;
    private callback;
    constructor(source: any, callback: Function);
    load(): void;
    readonly width: number;
    readonly height: number;
    readonly image: HTMLImageElement;
}
