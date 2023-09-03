const image = new Image();
image.src = './sonic.png';
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

image.addEventListener('load', () => {
    scale = 0.75;
    image.width = image.width * scale;
    image.height = image.height * scale;

    canvas.width = image.width;
    canvas.height = image.height;
    size = 10;
    const acsii = new Acsii(canvas.width, canvas.height);
    acsii.init(size);
    ctx.font = size * 1.15 + 'px Verdana';
    acsii.draw();
});

class Cell {
    constructor(x, y, symbol, color) {
        this.x = x;
        this.y = y;
        this.symbol = symbol;
        this.color = color;
    }
    draw() {
        ctx.fillStyle = 'white';
        ctx.fillText(this.symbol, this.x + 0.1, this.y + 0.1);
        ctx.fillStyle = this.color;
        ctx.fillText(this.symbol, this.x, this.y);
    }
}

class Acsii {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.cells = [];

    }
    init(size) {
        ctx.drawImage(image, 0, 0, this.width, this.height);
        const pixels = ctx.getImageData(0, 0, this.width, this.height).data;
        for( let y = 0; y < this.height; y += size ) {
            for( let x = 0; x < this.width; x += size ) {
                const index = (y * this.width + x) * 4;
                const red = pixels[index];
                const green = pixels[index+1];
                const blue = pixels[index+2];
                const alpha = pixels[index+3];

                if( alpha > 0 ){
                    const color = `rgb(${red}, ${green}, ${blue})`;
                    const averageColorValue = (red + green + blue)/3;
                    const symbol = this.convertToSymbol(averageColorValue);
                    this.cells.push(new Cell(x, y, symbol, color));
                }

            }
        }
    }
    draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.cells.forEach(c => c.draw());
    }
    convertToSymbol(g) {
        if( g > 250 ) return '@';
        else if( g > 240 ) return '*';
        else if( g > 220 ) return '+';
        else if( g > 200 ) return '#';
        else if( g > 180 ) return '&';
        else if( g > 160 ) return '%';
        else if( g > 140) return '_';
        else if( g > 120 ) return ':';
        else if( g > 100 ) return '$';
        else if( g > 80 ) return '/';
        else if( g > 60 ) return '-';
        else if( g > 40 ) return 'X';
        else if( g > 20 ) return 'W';
        else return '';
    }
}

