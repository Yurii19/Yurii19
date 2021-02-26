
window.onload = function() {
	buttonClear = document.getElementById('clear');
	buttonClear.addEventListener('click', reset);

	buttonGOL = document.getElementById('start');
	buttonGOL.addEventListener('click', gameLife);
	buttonGOL.addEventListener('click', indicate);

	buttonStop = document.getElementById('stop');
	buttonStop.addEventListener('click', stop);
}

let GameStatus = false;

function stop(){
	const indicator = document.getElementById('lamp');
	GameStatus = false;
	indicator.classList.remove('lamp-on');
	indicator.classList.add('lamp-off');
}

function indicate(){
	if(!GameStatus) {
		alert('asdf');
	}
	const indicator = document.getElementById('lamp');
	let mySwitch = true ;
	setInterval(function(){
		if (GameStatus){
			if(mySwitch){
				indicator.classList.remove('lamp-off');
				indicator.classList.add('lamp-on');
				mySwitch = false
			} else {
				indicator.classList.remove('lamp-on');
				indicator.classList.add('lamp-off');
				mySwitch = true;
			}
		}
	}, 2000);

}

function gameLife() {
	if(GameStatus) {
		return;
	}
	canvas = document.getElementById("scene");
	ctx = canvas.getContext("2d");  
	GameStatus = true;
	universeWidth = 80;
	universeHeight = 46;
	let universe = [];
	
	for (let i = 0; i < universeHeight; i++) {
		let row = [];
		for (let j = 0; j < universeWidth; j++) {
			row.push(false);
		}
		universe.push(row);
	} 
	 //make 1-st generation
	 for (let i = 0; i < 500; i++) {
	 	let x = randomNumber(universeWidth);
	 	let y = randomNumber(universeHeight);
	 	universe[y][x] = true;
	 }
	
	 drawUniverse(universe);
	 
	 let temp = universe;
	 setInterval(function(){
	 	if (GameStatus){
	 		clearScene();
	 		temp = refreshGeneration(temp);
	 		drawUniverse(temp);
	 	}
	 	
	 }, 200);
	 
	}

	function reset(){
		location.reload();
	}

	function refreshGeneration(arrUniverse) {
		let rows = arrUniverse.length;
		let cols = arrUniverse[0].length;
		let arrNewUniverse = arrUniverse.map(function(arr) {
			return arr.slice();
		});

		for (let i = 0; i < rows; i++) {
			for (let j = 0; j < cols; j++){

				let counterAlives = 0;
				let col = j;
				let row = i;
				let adjacent = [[col, row-1],[col+1, row-1],[col+1, row],
				[col+1, row+1],[col, row+1],[col-1, row+1],[col-1, row],[col-1, row-1]];
				for (let l = 0; l < adjacent.length; l++) {
					let tempCol = adjacent[l][0];
					let tempRow = adjacent[l][1];
					
					if (tempRow > rows-1 || tempRow < 0 || tempCol > cols-1 || tempCol < 0) {
						continue;
					} 
					if (arrUniverse[tempRow][tempCol]){
						counterAlives++;
					}
				}

				if (counterAlives === 3) {
					arrNewUniverse[row][col] = true;
				} else if (counterAlives > 3 || counterAlives < 2) {
					arrNewUniverse[row][col] = false;
				} 
			}
		}
		return arrNewUniverse;
	}

	function drawUniverse(arrUniverse) {
		let rows = arrUniverse.length;
		let cols = arrUniverse[0].length;
		for (let i = 0; i < rows; i++) {
			for (let j = 0; j < cols; j++){
				if (arrUniverse[i][j]) {
					drawObj(j*10,i*10, 10)
				}
			}
		}
	}

	function clearScene() {
		canvas = document.getElementById("scene");
		ctx.clearRect(0, 0, canvas.width, canvas.height );
	}

	function drawObj( x, y, w) {
		ctx.fillStyle = "#12CBC4";
		ctx.fillRect(x, y, w, w);
	}

	function randomNumber(limit) {
		return Math.floor(Math.random() * limit) ;
	}