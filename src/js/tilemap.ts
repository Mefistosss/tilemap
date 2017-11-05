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
    private tiles: Array<Tile[]> = [];
    private width: number = 0;
    private height: number = 0;
    private isReady: boolean = false;
    private context: CanvasRenderingContext2D;
    private isMobile: boolean;
    private camera: Camera;
    private click: Subject<any> = new Subject();
    private showTiles: Subject<any> = new Subject();

    private options: any = {
        grid: true,
        numberOfTiles: false,
        gridColor: 'black'
        // additionalImages:
    };

    constructor (canvasId: string, pathToConfig: string, options: any) {
        this.node = <HTMLCanvasElement> document.getElementById(canvasId);
        this.options = Object.assign(this.options, options);

        this.isMobile = (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()));

        this.context = this.node.getContext('2d');
        if (this.context) {
            this.init(pathToConfig);
        }
    }

    private setEvents() :void {
        let x: number, y: number, isMove: boolean, moved: boolean = true;;

        let start = (_x: number, _y: number) => {
            x = _x;
            y = _y;
            isMove = true;
        };

        let move = (_x: number, _y: number) => {
            if (isMove) {
                moved = true;
                this.camera.setPosition(_x - x, _y - y);
                x = _x;
                y = _y;
                // this.draw();
            }
        };

        let end = (_x: number, _y: number) => {
            if (!moved) {
                let point = this.camera.getIndexOfTile(x, y);
                let tile = this.tiles[point.y][point.x];
                // this.click.onNext('foo');
                this.click.next(tile);
            }
            moved = false;
            isMove = false;
        };

        if (this.isMobile) {
            this.node.addEventListener('touchstart', (e) => {
                e.preventDefault();
                start(e.touches[0].pageX, e.touches[0].pageY);
            });

            this.node.addEventListener('touchmove', (e) => {
                e.preventDefault();
                move(e.touches[0].pageX, e.touches[0].pageY);
            });

            this.node.addEventListener('touchend', (e) => {
                e.preventDefault();
                end(e.touches[0].pageX, e.touches[0].pageY);
            });

            document.body.addEventListener('touchend', (e) => {
                e.preventDefault();
                end(e.touches[0].pageX, e.touches[0].pageY);
            });
        } else {
            this.node.addEventListener('mousedown', (e) => {
                e.preventDefault();
                start(e.offsetX, e.offsetY);
            });

            this.node.addEventListener('mousemove', (e) => {
                e.preventDefault();
                move(e.offsetX, e.offsetY);
            });

            document.body.addEventListener('mouseup', (e) => {
                e.preventDefault();
                end(e.offsetX, e.offsetY);
            });
        }
    }

    private draw() :void {
        let tiles = this.camera.getTiles();
        let tileset = this.mapConfig.tilesets[0];

        // this.context.fillRect(0, 0, this.width, this.height);

        tiles.forEach((tilePositions) => {
            let tile = this.tiles[tilePositions.y][tilePositions.x],
                posX = tile.x * tile.width + this.camera.X,
                posY = tile.y * tile.height + this.camera.Y;
// console.log(tile.imageX, tile.imageY, posX, posY);

            this.context.drawImage(
                this.loader.image,
                tile.imageX,
                tile.imageY,
                tile.width,
                tile.height,
                posX,
                posY,
                tile.width,
                tile.height
            );

            if (this.options.numberOfTiles) {
                // this.context.fillStyle = this.options.gridColor;
                this.context.textAlign = "start";
                this.context.textBaseline = "top";
                this.context.font = "12px Arial";
                this.context.fillText(tile.ID + '', posX + 1, posY + 1);
            }
        });

        if (this.options.grid) {
            this.drawGrid(this.tiles[tiles[0].x][tiles[0].y]);
        }
    }

    private drawGrid(tile: Tile) :void {
        let startPoint, point,
            tileset = this.mapConfig.tilesets[0],
            width = this.width,
            height = this.height;
        
        this.context.beginPath();

        this.context.lineWidth = 1;
        this.context.strokeStyle = this.options.gridColor;

        startPoint = tile.y * tile.width + this.camera.X;
        point = startPoint - tileset.tilewidth;
        do {
            point += tileset.tilewidth;
            this.context.moveTo(point - 0.5, 0);
            this.context.lineTo(point - 0.5, height);
        } while(point < startPoint + width)

        startPoint = tile.x * tile.height + this.camera.Y
        point = startPoint - tileset.tileheight;
        do {
            point += tileset.tileheight;
            this.context.moveTo(0, point - 0.5);
            this.context.lineTo(width, point - 0.5);
        } while(point < startPoint + height)

        this.context.stroke();
    }

    private getConfig(url: string, callback: Function) :void {
        ajax.getJSON(url)
        .subscribe(
            (data) => { callback(data); },
            (err) => { console.log('Can not load config'); }
        );
    }

    private loadImage (callback: Function) :void {
        this.loader = new ImageLoader (this.mapConfig.tilesets[0].image, (err: any, v: any) => {
            if (!err) {
                callback();
            }
        });

        this.loader.load();
    }

    private getPositionPerNumber(n: number, tileset: any) :Array<number> {
        let rows = Math.floor(n / tileset.columns);
        return [(n - 1) % tileset.columns, rows];
    }

    private createTiles () :void {
        let layer = this.mapConfig.layers[0];
        let tileset = this.mapConfig.tilesets[0];
        let tileCount = tileset.tilecount;
        let arr: Tile[] = [];

        this.mapConfig.layers[0].data.forEach((t: number, i: number) => {
            let y = Math.floor(i / layer.height);
            let x = i % layer.width;
            let pos = this.getPositionPerNumber(t, tileset);
            let imgPosX = tileset.spacing + pos[0] * (tileset.tilewidth + tileset.margin);
            let imgPosY = tileset.spacing + pos[1] * (tileset.tileheight + tileset.margin);

            arr.push(new Tile(t, tileset.tilewidth, tileset.tileheight, x, y, imgPosX, imgPosY));

            if (x === layer.width - 1) {
                this.tiles.push(arr);
                arr = [];
            }
        });
    }

    private init(pathToConfig: string) :void {
        this.getConfig(pathToConfig, (data: any) => {
            this.mapConfig = data;
            let tileset = this.mapConfig.tilesets[0];

            if (!this.mapConfig.tilesets[0].columns) {
                this.mapConfig.tilesets[0].columns = Math.floor((tileset.imagewidth - tileset.spacing) / (tileset.tilewidth + tileset.margin));
            }

            let layer = this.mapConfig.layers[0];
            this.width = this.node.offsetWidth;
            this.height = this.node.offsetHeight;
            this.camera = new Camera(this.width, this.height, (tileset.tilewidth + tileset.margin) * layer.width, (tileset.tileheight + tileset.margin) * layer.height, tileset.tilewidth, tileset.tileheight);
            this.camera.drawEvent.subscribe(() => {
                this.draw();
            });
            this.camera.animationEndEvent.subscribe(() => {
                console.log('end');
            });
            this.loadImage(() => {
                this.createTiles();
                this.setEvents();
                this.draw();
                this.isReady = true;
            });
        });
    }

    public get clickEvent() :Subject<any> {
        return this.click;
    }

    public get showTilesEvent() :Subject<any> {
        return this.showTiles;
    }

    public moveTo(indexX: number, indexY: number) :void {

    }

    public resize () :void {
        this.width = this.node.offsetWidth;
        this.height = this.node.offsetHeight;
        this.camera.resize(this.width, this.height);
    }
}