/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/

function createShip(name, length, hits, sunk) {
	const ship = {};
	ship.name = name;
	ship.length = length;
	ship.hits = hits;
	ship.sunk = sunk;
	ship.hit = function () {
		ship.hits += 1;
		alert(ship.name + ' has been hit!');
	};
	ship.isSunk = function () {
		if (ship.hits === ship.length) {
			ship.sunk = 'Yes';
			alert(ship.name + ' has been sunk!');
		}
	};
	return ship;
}

const playerAircraftCarrier = createShip('Aircraft Carrier', 5, 0, 'No');
const playerBattleship = createShip('Battleship', 4, 0, 'No');
const playerDestroyer = createShip('Destroyer', 4, 0, 'No');
const playerSubmarine = createShip('Submarine', 3, 0, 'No');
const playerPatrolBoat = createShip('Patrol Boat', 2, 0, 'No');

const computerAircraftCarrier = createShip('Aircraft Carrier', 5, 0, 'No');
const computerBattleship = createShip('Battleship', 4, 0, 'No');
const computerDestroyer = createShip('Destroyer', 4, 0, 'No');
const computerSubmarine = createShip('Submarine', 3, 0, 'No');
const computerPatrolBoat = createShip('Patrol Boat', 2, 0, 'No');

function createLocation(x, y) {
	return { x, y, boat: 'none', attacked: 'no' };
}

const computerContainer = document.querySelector('#computer-container');

function createPlayerGameBoard() {
	const playerGameBoard = [];
	const columns = 10;
	const rows = 10;

	for (let x = 1; x <= columns; x++) {
		for (let y = 'A'.charCodeAt(0); y <= 'J'.charCodeAt(0); y++) {
			const location = createLocation(x, String.fromCharCode(y));
			playerGameBoard.push(location);

			const playerContainer = document.querySelector('#player-container');
			const div = document.createElement('div');
			div.id = String.fromCharCode(y) + x;
			div.classList.add('location');
			playerContainer.appendChild(div);
		}
	}

	return playerGameBoard;
}

function createComputerLocation(x, y) {
	return { x, y, boat: 'none', attacked: 'no' };
}

function createComputerGameBoard() {
	const computerGameBoard = [];
	const columns = 10;
	const rows = 10;

	for (let x = 1; x <= columns; x++) {
		for (let y = 'A'.charCodeAt(0); y <= 'J'.charCodeAt(0); y++) {
			const location = createComputerLocation(x, String.fromCharCode(y));
			computerGameBoard.push(location);

			const div = document.createElement('div');
			div.id = 'computer-' + String.fromCharCode(y) + x;
			div.classList.add('location');
			computerContainer.appendChild(div);
		}
	}

	return computerGameBoard;
}

const playerGameBoard = createPlayerGameBoard();
const computerGameBoard = createComputerGameBoard();

function randomCoordinate() {
	const x = Math.floor(Math.random() * 10) + 1;
	const y = String.fromCharCode(Math.floor(Math.random() * 10) + 'A'.charCodeAt(0));
	return { x, y };
}

function placeComputerShips(computerGameBoard, ships) {
	for (const ship of ships) {
		let validPlacement = false;
		while (!validPlacement) {
			const { x, y } = randomCoordinate();
			if (x + ship.length - 1 <= 10) {
				let canPlaceShip = true;
				for (let i = x; i < x + ship.length; i++) {
					const locationToCheck = computerGameBoard.find(loc => loc.x === i && loc.y === y);
					if (locationToCheck.boat !== 'none') {
						canPlaceShip = false;
						break;
					}
				}
				if (canPlaceShip) {
					for (let i = x; i < x + ship.length; i++) {
						const locationToPlace = computerGameBoard.find(loc => loc.x === i && loc.y === y);
						locationToPlace.boat = ship.name;
					}
					validPlacement = true;
				}
			}
		}
	}
}

const computerShips = [computerAircraftCarrier, computerBattleship, computerDestroyer, computerSubmarine, computerPatrolBoat];

placeComputerShips(computerGameBoard, computerShips);

console.log(playerGameBoard);
console.log(computerGameBoard);
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsVUFBVTtBQUNWOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlCQUFpQixjQUFjO0FBQy9CLGtDQUFrQyx3QkFBd0I7QUFDMUQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsVUFBVTtBQUNWOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlCQUFpQixjQUFjO0FBQy9CLGtDQUFrQyx3QkFBd0I7QUFDMUQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQjtBQUNBO0FBQ0Esb0JBQW9CLHFCQUFxQjtBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixxQkFBcUI7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0EsK0IiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlxuZnVuY3Rpb24gY3JlYXRlU2hpcChuYW1lLCBsZW5ndGgsIGhpdHMsIHN1bmspIHtcblx0Y29uc3Qgc2hpcCA9IHt9O1xuXHRzaGlwLm5hbWUgPSBuYW1lO1xuXHRzaGlwLmxlbmd0aCA9IGxlbmd0aDtcblx0c2hpcC5oaXRzID0gaGl0cztcblx0c2hpcC5zdW5rID0gc3Vuaztcblx0c2hpcC5oaXQgPSBmdW5jdGlvbiAoKSB7XG5cdFx0c2hpcC5oaXRzICs9IDE7XG5cdFx0YWxlcnQoc2hpcC5uYW1lICsgJyBoYXMgYmVlbiBoaXQhJyk7XG5cdH07XG5cdHNoaXAuaXNTdW5rID0gZnVuY3Rpb24gKCkge1xuXHRcdGlmIChzaGlwLmhpdHMgPT09IHNoaXAubGVuZ3RoKSB7XG5cdFx0XHRzaGlwLnN1bmsgPSAnWWVzJztcblx0XHRcdGFsZXJ0KHNoaXAubmFtZSArICcgaGFzIGJlZW4gc3VuayEnKTtcblx0XHR9XG5cdH07XG5cdHJldHVybiBzaGlwO1xufVxuXG5jb25zdCBwbGF5ZXJBaXJjcmFmdENhcnJpZXIgPSBjcmVhdGVTaGlwKCdBaXJjcmFmdCBDYXJyaWVyJywgNSwgMCwgJ05vJyk7XG5jb25zdCBwbGF5ZXJCYXR0bGVzaGlwID0gY3JlYXRlU2hpcCgnQmF0dGxlc2hpcCcsIDQsIDAsICdObycpO1xuY29uc3QgcGxheWVyRGVzdHJveWVyID0gY3JlYXRlU2hpcCgnRGVzdHJveWVyJywgNCwgMCwgJ05vJyk7XG5jb25zdCBwbGF5ZXJTdWJtYXJpbmUgPSBjcmVhdGVTaGlwKCdTdWJtYXJpbmUnLCAzLCAwLCAnTm8nKTtcbmNvbnN0IHBsYXllclBhdHJvbEJvYXQgPSBjcmVhdGVTaGlwKCdQYXRyb2wgQm9hdCcsIDIsIDAsICdObycpO1xuXG5jb25zdCBjb21wdXRlckFpcmNyYWZ0Q2FycmllciA9IGNyZWF0ZVNoaXAoJ0FpcmNyYWZ0IENhcnJpZXInLCA1LCAwLCAnTm8nKTtcbmNvbnN0IGNvbXB1dGVyQmF0dGxlc2hpcCA9IGNyZWF0ZVNoaXAoJ0JhdHRsZXNoaXAnLCA0LCAwLCAnTm8nKTtcbmNvbnN0IGNvbXB1dGVyRGVzdHJveWVyID0gY3JlYXRlU2hpcCgnRGVzdHJveWVyJywgNCwgMCwgJ05vJyk7XG5jb25zdCBjb21wdXRlclN1Ym1hcmluZSA9IGNyZWF0ZVNoaXAoJ1N1Ym1hcmluZScsIDMsIDAsICdObycpO1xuY29uc3QgY29tcHV0ZXJQYXRyb2xCb2F0ID0gY3JlYXRlU2hpcCgnUGF0cm9sIEJvYXQnLCAyLCAwLCAnTm8nKTtcblxuZnVuY3Rpb24gY3JlYXRlTG9jYXRpb24oeCwgeSkge1xuXHRyZXR1cm4geyB4LCB5LCBib2F0OiAnbm9uZScsIGF0dGFja2VkOiAnbm8nIH07XG59XG5cbmNvbnN0IGNvbXB1dGVyQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NvbXB1dGVyLWNvbnRhaW5lcicpO1xuXG5mdW5jdGlvbiBjcmVhdGVQbGF5ZXJHYW1lQm9hcmQoKSB7XG5cdGNvbnN0IHBsYXllckdhbWVCb2FyZCA9IFtdO1xuXHRjb25zdCBjb2x1bW5zID0gMTA7XG5cdGNvbnN0IHJvd3MgPSAxMDtcblxuXHRmb3IgKGxldCB4ID0gMTsgeCA8PSBjb2x1bW5zOyB4KyspIHtcblx0XHRmb3IgKGxldCB5ID0gJ0EnLmNoYXJDb2RlQXQoMCk7IHkgPD0gJ0onLmNoYXJDb2RlQXQoMCk7IHkrKykge1xuXHRcdFx0Y29uc3QgbG9jYXRpb24gPSBjcmVhdGVMb2NhdGlvbih4LCBTdHJpbmcuZnJvbUNoYXJDb2RlKHkpKTtcblx0XHRcdHBsYXllckdhbWVCb2FyZC5wdXNoKGxvY2F0aW9uKTtcblxuXHRcdFx0Y29uc3QgcGxheWVyQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3BsYXllci1jb250YWluZXInKTtcblx0XHRcdGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHRcdFx0ZGl2LmlkID0gU3RyaW5nLmZyb21DaGFyQ29kZSh5KSArIHg7XG5cdFx0XHRkaXYuY2xhc3NMaXN0LmFkZCgnbG9jYXRpb24nKTtcblx0XHRcdHBsYXllckNvbnRhaW5lci5hcHBlbmRDaGlsZChkaXYpO1xuXHRcdH1cblx0fVxuXG5cdHJldHVybiBwbGF5ZXJHYW1lQm9hcmQ7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUNvbXB1dGVyTG9jYXRpb24oeCwgeSkge1xuXHRyZXR1cm4geyB4LCB5LCBib2F0OiAnbm9uZScsIGF0dGFja2VkOiAnbm8nIH07XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUNvbXB1dGVyR2FtZUJvYXJkKCkge1xuXHRjb25zdCBjb21wdXRlckdhbWVCb2FyZCA9IFtdO1xuXHRjb25zdCBjb2x1bW5zID0gMTA7XG5cdGNvbnN0IHJvd3MgPSAxMDtcblxuXHRmb3IgKGxldCB4ID0gMTsgeCA8PSBjb2x1bW5zOyB4KyspIHtcblx0XHRmb3IgKGxldCB5ID0gJ0EnLmNoYXJDb2RlQXQoMCk7IHkgPD0gJ0onLmNoYXJDb2RlQXQoMCk7IHkrKykge1xuXHRcdFx0Y29uc3QgbG9jYXRpb24gPSBjcmVhdGVDb21wdXRlckxvY2F0aW9uKHgsIFN0cmluZy5mcm9tQ2hhckNvZGUoeSkpO1xuXHRcdFx0Y29tcHV0ZXJHYW1lQm9hcmQucHVzaChsb2NhdGlvbik7XG5cblx0XHRcdGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHRcdFx0ZGl2LmlkID0gJ2NvbXB1dGVyLScgKyBTdHJpbmcuZnJvbUNoYXJDb2RlKHkpICsgeDtcblx0XHRcdGRpdi5jbGFzc0xpc3QuYWRkKCdsb2NhdGlvbicpO1xuXHRcdFx0Y29tcHV0ZXJDb250YWluZXIuYXBwZW5kQ2hpbGQoZGl2KTtcblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gY29tcHV0ZXJHYW1lQm9hcmQ7XG59XG5cbmNvbnN0IHBsYXllckdhbWVCb2FyZCA9IGNyZWF0ZVBsYXllckdhbWVCb2FyZCgpO1xuY29uc3QgY29tcHV0ZXJHYW1lQm9hcmQgPSBjcmVhdGVDb21wdXRlckdhbWVCb2FyZCgpO1xuXG5mdW5jdGlvbiByYW5kb21Db29yZGluYXRlKCkge1xuXHRjb25zdCB4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApICsgMTtcblx0Y29uc3QgeSA9IFN0cmluZy5mcm9tQ2hhckNvZGUoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApICsgJ0EnLmNoYXJDb2RlQXQoMCkpO1xuXHRyZXR1cm4geyB4LCB5IH07XG59XG5cbmZ1bmN0aW9uIHBsYWNlQ29tcHV0ZXJTaGlwcyhjb21wdXRlckdhbWVCb2FyZCwgc2hpcHMpIHtcblx0Zm9yIChjb25zdCBzaGlwIG9mIHNoaXBzKSB7XG5cdFx0bGV0IHZhbGlkUGxhY2VtZW50ID0gZmFsc2U7XG5cdFx0d2hpbGUgKCF2YWxpZFBsYWNlbWVudCkge1xuXHRcdFx0Y29uc3QgeyB4LCB5IH0gPSByYW5kb21Db29yZGluYXRlKCk7XG5cdFx0XHRpZiAoeCArIHNoaXAubGVuZ3RoIC0gMSA8PSAxMCkge1xuXHRcdFx0XHRsZXQgY2FuUGxhY2VTaGlwID0gdHJ1ZTtcblx0XHRcdFx0Zm9yIChsZXQgaSA9IHg7IGkgPCB4ICsgc2hpcC5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRcdGNvbnN0IGxvY2F0aW9uVG9DaGVjayA9IGNvbXB1dGVyR2FtZUJvYXJkLmZpbmQobG9jID0+IGxvYy54ID09PSBpICYmIGxvYy55ID09PSB5KTtcblx0XHRcdFx0XHRpZiAobG9jYXRpb25Ub0NoZWNrLmJvYXQgIT09ICdub25lJykge1xuXHRcdFx0XHRcdFx0Y2FuUGxhY2VTaGlwID0gZmFsc2U7XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKGNhblBsYWNlU2hpcCkge1xuXHRcdFx0XHRcdGZvciAobGV0IGkgPSB4OyBpIDwgeCArIHNoaXAubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHRcdGNvbnN0IGxvY2F0aW9uVG9QbGFjZSA9IGNvbXB1dGVyR2FtZUJvYXJkLmZpbmQobG9jID0+IGxvYy54ID09PSBpICYmIGxvYy55ID09PSB5KTtcblx0XHRcdFx0XHRcdGxvY2F0aW9uVG9QbGFjZS5ib2F0ID0gc2hpcC5uYW1lO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHR2YWxpZFBsYWNlbWVudCA9IHRydWU7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cbn1cblxuY29uc3QgY29tcHV0ZXJTaGlwcyA9IFtjb21wdXRlckFpcmNyYWZ0Q2FycmllciwgY29tcHV0ZXJCYXR0bGVzaGlwLCBjb21wdXRlckRlc3Ryb3llciwgY29tcHV0ZXJTdWJtYXJpbmUsIGNvbXB1dGVyUGF0cm9sQm9hdF07XG5cbnBsYWNlQ29tcHV0ZXJTaGlwcyhjb21wdXRlckdhbWVCb2FyZCwgY29tcHV0ZXJTaGlwcyk7XG5cbmNvbnNvbGUubG9nKHBsYXllckdhbWVCb2FyZCk7XG5jb25zb2xlLmxvZyhjb21wdXRlckdhbWVCb2FyZCk7Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9