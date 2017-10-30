import { Observable } from 'rxjs/Observable';
// import { Observable } from 'rxjs';
import { ajax } from 'rxjs/observable/dom/ajax';
// import { ajax } from 'rxjs/add/observable/dom/ajax';
import { Tile } from './tile';
import { ImageLoader } from './image-loader';
import { Camera } from './camera';

export class Tilemap {
    private node: HTMLCanvasElement;
    private mapConfig: any;
    private loader: ImageLoader;
    private tiles: Array<Tile[]>;

    private contex: CanvasRenderingContext2D;
    private isMobile: boolean;
    private camera: Camera;

    constructor (canvasId: string, pathToConfig: string) {
        this.node = <HTMLCanvasElement> document.getElementById(canvasId);
        this.tiles = [];

        this.contex = this.node.getContext('2d');
        if (this.contex) {
            this.getConfig(pathToConfig);
        }

        this.isMobile = (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()));
        this.setEvents();
    }

    private setEvents() :void {
        let x: number, y: number, isMove: boolean;

        // this.node.addEventListener('mousedown', (e) => {
        this.node.addEventListener('touchstart', (e) => {
            e.preventDefault();
            // x = e.offsetX;
            // y = e.offsetY;
            x = e.touches[0].pageX;
            y = e.touches[0].pageY;
            isMove = true;
        });

        // this.node.addEventListener('mousemove', (e) => {
        this.node.addEventListener('touchmove', (e) => {
            e.preventDefault();
            if (isMove) {
                // this.camera.setPosition(e.offsetX - x, e.offsetY - y);
                // x = e.offsetX;
                // y = e.offsetY;
                this.camera.setPosition(e.touches[0].pageX - x, e.touches[0].pageY - y);
                x = e.touches[0].pageX;
                y = e.touches[0].pageY;
                this.draw();
            }
        });

        // document.body.addEventListener('mouseup', (e) => {
        document.body.addEventListener('touchend', (e) => {
            e.preventDefault();
            isMove = false;
        });
    }

    public show() :void {
        this.draw();
    }

    private draw () :void {
        let tiles = this.camera.getTiles();
        // this.contex.clearRect(0, 0, this.node.offsetWidth, this.node.offsetHeight);

        tiles.forEach((tilePositions) => {
            let tile = this.tiles[tilePositions.y][tilePositions.x];

            this.contex.drawImage(
                this.loader.image,
                tile.imageX,
                tile.imageY,
                tile.width,
                tile.height,
                tile.x * tile.width + this.camera.X,
                tile.y * tile.height + this.camera.Y,
                tile.width,
                tile.height
            );
        });
    }

    private getConfig(url: string) :void {
        ajax.getJSON(url)
        .subscribe(
            (data) => {
                this.mapConfig = data;
                let tileset = this.mapConfig.tilesets[0];
                let layer = this.mapConfig.layers[0];
                this.camera = new Camera(this.node.offsetWidth, this.node.offsetHeight, tileset.tilewidth * layer.width, tileset.tileheight * layer.height, tileset.tilewidth, tileset.tileheight);
                this.loadImage();
            },
            (err) => {
                // Log the error
            }
        );
    }

    private loadImage () :void {
        this.loader = new ImageLoader (this.mapConfig.tilesets[0].image, (err: any, v: any) => {
            if (!err) {
                this.createTiles();
            }
        });

        this.loader.load();
    }

    private getPositionPerNumber(n: number, tileset: any) :Array<number> {
        let rows = tileset.tilecount / tileset.columns;
        return [(n - 1) % tileset.columns, Math.floor(n / rows)];
        // return [Math.floor(n / rows), (n - 1) % tileset.columns];
    }

    private createTiles () {
        let layer = this.mapConfig.layers[0];
        let tileset = this.mapConfig.tilesets[0];
        let tileCount = tileset.tilecount;
        let arr: Tile[] = [];

        this.mapConfig.layers[0].data.forEach((t: number, i: number) => {
            let y = Math.floor(i / layer.height);
            let x = i % layer.width;
            let pos = this.getPositionPerNumber(t, tileset);

            arr.push(new Tile(t, tileset.tilewidth, tileset.tileheight, x, y, pos[0] * tileset.tilewidth, pos[1] * tileset.tileheight));

            if (x === layer.width - 1) {
                this.tiles.push(arr);
                arr = [];
            }
        });
        this.draw();
    }
}