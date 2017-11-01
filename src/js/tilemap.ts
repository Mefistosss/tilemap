// import { Observable } from 'rxjs/Observable';
// import { Observable } from 'rxjs';
import { ajax } from 'rxjs/observable/dom/ajax';
import { Subject } from 'rxjs/Subject';
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

    private click: Subject<any>;

    constructor (canvasId: string, pathToConfig: string) {
        this.node = <HTMLCanvasElement> document.getElementById(canvasId);
        this.tiles = [];

        this.contex = this.node.getContext('2d');
        if (this.contex) {
            this.getConfig(pathToConfig);
        }

        this.click = new Subject();

        this.isMobile = (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()));

        if (this.isMobile) {
            this.setMobileEvents();
        } else {
            this.setEvents();
        }
    }

    public get clickEvent() :Subject<any> {
        return this.click;
    }

    private setMobileEvents() :void {
        let x: number, y: number, isMove: boolean;

        this.node.addEventListener('touchstart', (e) => {
            e.preventDefault();
            x = e.touches[0].pageX;
            y = e.touches[0].pageY;
            isMove = true;
        });

        this.node.addEventListener('touchmove', (e) => {
            if (isMove) {
                e.preventDefault();
                this.camera.setPosition(e.touches[0].pageX - x, e.touches[0].pageY - y);
                x = e.touches[0].pageX;
                y = e.touches[0].pageY;
                this.draw();
            }
        });

        document.body.addEventListener('touchend', (e) => {
            e.preventDefault();
            isMove = false;
        });
    }

    private setEvents() :void {
        let x: number, y: number, isMove: boolean, moved = false;

        // this.node.addEventListener('click', (e) => {
        //     if (!isMove) {
        //         e.preventDefault();
        //         let point = this.camera.getIndexOfTile(e.offsetX, e.offsetY);
        //         let tile = this.tiles[point.y][point.x];
        //         // this.click.onNext('foo');
        //         this.click.next(tile);
        //     }
        // });

        this.node.addEventListener('mousedown', (e) => {
            e.preventDefault();
            x = e.offsetX;
            y = e.offsetY;
            isMove = true;
        });

        this.node.addEventListener('mousemove', (e) => {
            if (isMove) {
                moved = true;
                e.preventDefault();
                this.camera.setPosition(e.offsetX - x, e.offsetY - y);
                x = e.offsetX;
                y = e.offsetY;
                this.draw();
            }
        });

        document.body.addEventListener('mouseup', (e) => {
            e.preventDefault();
            if (!moved) {
                let point = this.camera.getIndexOfTile(e.offsetX, e.offsetY);
                let tile = this.tiles[point.y][point.x];
                // this.click.onNext('foo');
                this.click.next(tile);
            }
            moved = false;
            isMove = false;
        });
    }

    // public show() :void {
    //     this.draw();
    // }

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