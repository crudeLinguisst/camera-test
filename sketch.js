let vid;
let vScale = 10;
let increment = 0;

let movers = [];

function setup() {
	createCanvas(720, 576);
	pixelDensity(1);
	vid = createCapture(VIDEO);
	vid.size(width/vScale, height/vScale)
	// vid.hide();
}

function draw() {
	background(255);

	vid.loadPixels();
	noStroke();


	for(let y = vid.height-1; y >= 0; y--){
		for(let x = vid.width-1; x >= 0; x--){
			let pIndex = (x+(y*vid.width))*4;
			let flippedIndex = ((vid.width-1-x)+(y*vid.width))*4
			let r = vid.pixels[flippedIndex + 0];
			let g = vid.pixels[flippedIndex + 1];
			let b = vid.pixels[flippedIndex + 2];
			let bright = (r+g+b)/3;
			// console.log(bright)

			let i = pIndex/4;
			if(bright <= 100){
				if(!movers[i]){
					movers[i] = new Mover(x*vScale, y*vScale);
				} else {
					movers[i].moveTo(x*vScale, y*vScale);
					movers[i].getColor(r, g, b);
				}
			} else {
				if(movers[i]){
					movers[i].flee();
				}
			}
		}
	}

	movers.forEach((mover, i) => {
		if(mover && mover.isOut === false){
			mover.summon();
			mover.update();
			mover.applyBehavior();
		} else {
			movers[i] = null;
		}
	})
	// movers = movers.filter(mover => {
	// 	return mover.isOut === false;
	// })
}
