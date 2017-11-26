import { Subject } from 'rxjs/Subject';

class Point {
    public x: number;
    public y: number;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}

export class Camera {
    private x: number = 0;
    private y: number = 0;
    private dx: number = 0;
    private dy: number = 0;
    private cameraWidth: number;
    private cameraHeight: number;
    private mapWidth: number;
    private mapHeight: number;
    private tileWidth: number;
    private tileHeight: number;
    private timer: number = null;
    private isMoving: boolean = false;
    private draw: Subject<any> = new Subject();
    private animationEnd: Subject<any> = new Subject();
    private step: number = 0.4;

    constructor (
        cameraWidth: number,
        cameraHeight: number,
        mapWidth: number,
        mapHeight: number,
        tileWidth: number,
        tileHeight: number
    ) {
        this.cameraWidth = cameraWidth;
        this.cameraHeight = cameraHeight;
        this.mapWidth = mapWidth;
        this.mapHeight = mapHeight;
        this.tileWidth = tileWidth;
        this.tileHeight = tileHeight;
    }

    private getIndex(value: number, size: number) :number {
        return Math.floor(Math.abs(value) / size);
    }

    public getTiles() :Array<Point> {
        let arr: Array<Point> = [];
        let tw = this.tileWidth;
        let th = this.tileHeight;
        let indexX: number = this.getIndex(this.dx * (-1), tw);
        let indexY: number = this.getIndex(this.dy * (-1), th);
        let startX = indexX * tw;
        let startY = indexY * th;
        let normalizedX = Math.abs(this.dx);
        let normalizedY = Math.abs(this.dy);

        for (let _y = startY; _y < normalizedY + this.cameraHeight; _y += th) {
            for (let _x = startX; _x < normalizedX + this.cameraWidth; _x += tw) {
                arr.push(new Point(this.getIndex(_x, tw), this.getIndex(_y, th)));
            }
        }
        return arr;
    }

    public get X() :number { return this.dx }
    public get Y() :number { return this.dy }

    public resize(width: number, height: number) :void {
        this.cameraWidth = width;
        this.cameraHeight = height;

        this.x = this.correctPosition(this.x, this.cameraWidth - this.mapWidth);
        this.y = this.correctPosition(this.y, this.cameraHeight - this.mapHeight);
    }

    private correctMinPosition(value: number) :number {
        if (value > 0) { value = 0; }
        return value;
    }

    private correctPosition(value :number, maxValue: number) :number {
        value = this.correctMinPosition(value);
        if (value < maxValue) { value = maxValue; }
        return value;
    }

    private animation() :void {
        this.isMoving = true;

        let dx = (this.x - this.dx) * this.step;
        let dy = (this.y - this.dy) * this.step;

        this.dx += dx;
        this.dy += dy;

        this.draw.next();
        if (Math.abs(dx) < 0.001 && Math.abs(dy) < 0.001) {
            this.stop();
            this.animationEnd.next();
            return;
        }
        this.timer = setTimeout(() => { this.animation(); }, 30);
    }

    public get drawEvent() :Subject<any> {
        return this.draw;
    }

    public get animationEndEvent() :Subject<any> {
        return this.animationEnd;
    }

    public stop() :void {
        clearTimeout(this.timer);
        this.dx = this.x;
        this.dy = this.y;
        this.isMoving = false;
    }

    public setPosition(x: number, y: number) :void {
        this.x = this.correctPosition(this.x + x, this.cameraWidth - this.mapWidth);
        this.y = this.correctPosition(this.y + y, this.cameraHeight - this.mapHeight);
        if (!this.isMoving) { this.animation(); }
    }

    public move(indexX: number, indexY: number) :void {
        let x = (0 - indexX * this.tileWidth) + this.cameraWidth / 2 - this.tileWidth / 2;
        let y = (0 - indexY * this.tileHeight) + this.cameraHeight / 2 - this.tileHeight / 2;
        this.x = this.correctPosition(x, this.cameraWidth - this.mapWidth);
        this.y = this.correctPosition(y, this.cameraHeight - this.mapHeight);
        if (!this.isMoving) { this.animation(); }
    }

    public getIndexOfTile(x: number, y: number) :Point {
        return new Point(this.getIndex(this.x * (-1) + x, this.tileWidth), this.getIndex(this.y * (-1) + y, this.tileHeight));
    }
}
