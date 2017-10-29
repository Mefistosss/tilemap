export class ImageLoader {
    private _width: number;
    private _height: number;

    private node: HTMLElement;
    private _image: HTMLImageElement;

    private state: number;

    private callback: Function;

    constructor (source: any, callback: Function) {
        this.state = 0;
        this._width = 0;
        this._height = 0;
        this.node = document.createElement('div');

        this.callback = callback;

        this._image = document.createElement('img');
        this._image.setAttribute('src', source);
    }

    public load () :void {
        if (!this.state) {
            this.state = 1;
            [
                ['top', '-10000px'],
                ['left', '-10000px'],
                ['width', '1px'],
                ['height', '1px'],
                ['position', 'absolute'],
                ['overflow', 'hidden']
            ].forEach((v) => {
                this.node.style[v[0]] = v[1];
            });

            this.node.appendChild(this._image);

            this._image.addEventListener('load', (e) => {
                this.state = 2;
                this._width = this.image.offsetWidth;
                this._height = this.image.offsetHeight;
                this.callback(null, e);
            });

            this._image.addEventListener('error', (e) => {
                this.state = 3;
                this.callback(e);
            });

            document.body.appendChild(this.node);
        }
    }

    public get width() :number {
        return this._width;
    }

    public get height() :number {
        return this._height;
    }

    public get image() :HTMLImageElement {
        return this._image;
    }
}