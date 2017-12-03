import { Subject } from 'rxjs/Subject';
export declare class Point {
    x: number;
    y: number;
    constructor(x: number, y: number);
}
export declare class Camera {
    private x;
    private y;
    private dx;
    private dy;
    private cameraWidth;
    private cameraHeight;
    private mapWidth;
    private mapHeight;
    private tileWidth;
    private tileHeight;
    private timer;
    private isMoving;
    private draw;
    private animationEnd;
    private step;
    constructor(cameraWidth: number, cameraHeight: number, mapWidth: number, mapHeight: number, tileWidth: number, tileHeight: number);
    private getIndex(value, size);
    getTiles(): Array<Point>;
    readonly X: number;
    readonly Y: number;
    resize(width: number, height: number): void;
    private correctMinPosition(value);
    private correctPosition(value, maxValue);
    private animation();
    readonly drawEvent: Subject<any>;
    readonly animationEndEvent: Subject<any>;
    stop(): void;
    setPosition(x: number, y: number): void;
    move(indexX: number, indexY: number): void;
    setStartPosition(indexX: number, indexY: number, animation?: boolean): void;
    getIndexOfTile(x: number, y: number): Point;
}
