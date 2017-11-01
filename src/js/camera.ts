class Point {
    public x: number;
    public y: number;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}

export class Camera {
    private x: number;
    private y: number;
    private cameraWidth: number;
    private cameraHeight: number;
    private mapWidth: number;
    private mapHeight: number;
    private tileWidth: number;
    private tileHeight: number;

    constructor (cameraWidth: number, cameraHeight: number, mapWidth: number, mapHeight: number, tileWidth: number, tileHeight: number) {
        this.x = 0;
        this.y = 0;
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
        let indexX: number = this.getIndex(this.x * (-1), tw);
        let indexY: number = this.getIndex(this.y * (-1), th);
        let startX = indexX * tw;
        let startY = indexY * th;
        let normalizedX = Math.abs(this.x);
        let normalizedY = Math.abs(this.y);

        for (let _y = startY; _y < normalizedY + this.cameraHeight; _y += th) {
            for (let _x = startX; _x < normalizedX + this.cameraWidth; _x += tw) {
                arr.push(new Point(this.getIndex(_x, tw), this.getIndex(_y, th)));
            }
        }
        return arr;
    }

    public get X() :number { return this.x }
    public get Y() :number { return this.y }

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

    public setPosition(x: number, y: number) :void {
        this.x = this.correctPosition(this.x + x, this.cameraWidth - this.mapWidth);
        this.y = this.correctPosition(this.y + y, this.cameraHeight - this.mapHeight);
    }

    public getIndexOfTile(x: number, y: number) :Point {
        return new Point(this.getIndex(this.x * (-1) + x, this.tileWidth), this.getIndex(this.y * (-1) + y, this.tileHeight));
    }
}