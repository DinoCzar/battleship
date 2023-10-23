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

	for (let x = 'A'.charCodeAt(0); x <= 'J'.charCodeAt(0); x++) {
		for (let y = 1; y <= 10; y++) {
			const location = createLocation(String.fromCharCode(x), y);
			playerGameBoard.push(location);

			const playerContainer = document.querySelector('#player-container');
			const div = document.createElement('div');
			div.id = String.fromCharCode(x) + y;
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

	for (let x = 'A'.charCodeAt(0); x <= 'J'.charCodeAt(0); x++) {
		for (let y = 1; y <= 10; y++) {
			const location = createComputerLocation(String.fromCharCode(x), y);
			computerGameBoard.push(location);

			const div = document.createElement('div');
			div.id = 'computer-' + String.fromCharCode(x) + y;
			div.classList.add('location');
			computerContainer.appendChild(div);
		}
	}

	return computerGameBoard;
}

const playerGameBoard = createPlayerGameBoard();
const computerGameBoard = createComputerGameBoard();

function randomCoordinate() {
	const x = String.fromCharCode(Math.floor(Math.random() * 10) + 'A'.charCodeAt(0));
	const y = Math.floor(Math.random() * 10) + 1;
	return { x, y };
}

function placeComputerShips(computerGameBoard, ships) {
	for (const ship of ships) {
		let validPlacement = false;
		while (!validPlacement) {
			const { x, y } = randomCoordinate();
			if (x.charCodeAt(0) + ship.length - 1 <= 'J'.charCodeAt(0)) {
				let canPlaceShip = true;
				for (let i = x.charCodeAt(0); i <= x.charCodeAt(0) + ship.length - 1; i++) {
					const locationToCheck = computerGameBoard.find(
						(loc) => loc.x === String.fromCharCode(i) && loc.y === y
					);
					if (locationToCheck.boat !== 'none') {
						canPlaceShip = false;
						break;
					}
				}
				if (canPlaceShip) {
					for (let i = x.charCodeAt(0); i <= x.charCodeAt(0) + ship.length - 1; i++) {
						const locationToPlace = computerGameBoard.find(
							(loc) => loc.x === String.fromCharCode(i) && loc.y === y
						);
						locationToPlace.boat = ship.name;
					}
					validPlacement = true;
				}
			}
		}
	}
}

const computerShips = [
	computerAircraftCarrier,
	computerBattleship,
	computerDestroyer,
	computerSubmarine,
	computerPatrolBoat,
];

placeComputerShips(computerGameBoard, computerShips);

function placePlayerShips(playerGameBoard, ships) {
	for (const ship of ships) {
		let validPlacement = false;

		while (!validPlacement) {
			const x = prompt(`Enter x-coordinate for ${ship.name} (A-J):`);
			const y = parseInt(prompt(`Enter y-coordinate for ${ship.name} (1-10):`));
			const horizontal = confirm(
				`Do you want to place the ship vertically? (OK for Yes, Cancel for No)`
			);

			if (
				x >= 'A' &&
				x <= 'J' &&
				y >= 1 &&
				y <= 10
			) {
				const xUpper = x.toUpperCase();

				if (horizontal) {
					// Check if there's enough space to place the ship horizontally
					if (xUpper.charCodeAt(0) + ship.length - 1 <= 'J'.charCodeAt(0)) {
						let canPlaceShip = true;
						for (let i = xUpper.charCodeAt(0); i <= xUpper.charCodeAt(0) + ship.length - 1; i++) {
							const locationToCheck = playerGameBoard.find(
								(loc) => loc.x === String.fromCharCode(i) && loc.y === y
							);
							if (locationToCheck.boat !== 'none') {
								canPlaceShip = false;
								break;
							}
						}
						if (canPlaceShip) {
							for (let i = xUpper.charCodeAt(0); i <= xUpper.charCodeAt(0) + ship.length - 1; i++) {
								const locationToPlace = playerGameBoard.find(
									(loc) => loc.x === String.fromCharCode(i) && loc.y === y
								);
								locationToPlace.boat = ship.name;
							}
							validPlacement = true;
							alert(`${ship.name} has been placed at ${xUpper}${y}`);
						}
					}
				} else {
					// Check if there's enough space to place the ship vertically
					if (y + ship.length - 1 <= 10) {
						let canPlaceShip = true;
						for (let i = y; i <= y + ship.length - 1; i++) {
							const locationToCheck = playerGameBoard.find(
								(loc) => loc.x === xUpper && loc.y === i
							);
							if (locationToCheck.boat !== 'none') {
								canPlaceShip = false;
								break;
							}
						}
						if (canPlaceShip) {
							for (let i = y; i <= y + ship.length - 1; i++) {
								const locationToPlace = playerGameBoard.find(
									(loc) => loc.x === xUpper && loc.y === i
								);
								locationToPlace.boat = ship.name;
							}
							validPlacement = true;
							alert(`${ship.name} has been placed at ${xUpper}${y}`);
						}
					}
				}
			}
		}
	}
}

// Create an array of player ships
const playerShips = [
	playerAircraftCarrier,
	playerBattleship,
	playerDestroyer,
	playerSubmarine,
	playerPatrolBoat,
];

// Prompt the player to place each ship
placePlayerShips(playerGameBoard, playerShips);

console.log(playerGameBoard);
console.log(computerGameBoard);

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxVQUFVO0FBQ1Y7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUNBQWlDLHdCQUF3QjtBQUN6RCxrQkFBa0IsU0FBUztBQUMzQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxVQUFVO0FBQ1Y7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUNBQWlDLHdCQUF3QjtBQUN6RCxrQkFBa0IsU0FBUztBQUMzQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCO0FBQ0E7QUFDQSxrQ0FBa0Msd0NBQXdDO0FBQzFFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQyx3Q0FBd0M7QUFDM0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4Q0FBOEMsV0FBVztBQUN6RCx1REFBdUQsV0FBVztBQUNsRTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5Q0FBeUMsNkNBQTZDO0FBQ3RGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBDQUEwQyw2Q0FBNkM7QUFDdkY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLFdBQVcscUJBQXFCLE9BQU8sRUFBRSxFQUFFO0FBQzNEO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLDBCQUEwQjtBQUNoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsMEJBQTBCO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixXQUFXLHFCQUFxQixPQUFPLEVBQUUsRUFBRTtBQUMzRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gY3JlYXRlU2hpcChuYW1lLCBsZW5ndGgsIGhpdHMsIHN1bmspIHtcblx0Y29uc3Qgc2hpcCA9IHt9O1xuXHRzaGlwLm5hbWUgPSBuYW1lO1xuXHRzaGlwLmxlbmd0aCA9IGxlbmd0aDtcblx0c2hpcC5oaXRzID0gaGl0cztcblx0c2hpcC5zdW5rID0gc3Vuaztcblx0c2hpcC5oaXQgPSBmdW5jdGlvbiAoKSB7XG5cdFx0c2hpcC5oaXRzICs9IDE7XG5cdFx0YWxlcnQoc2hpcC5uYW1lICsgJyBoYXMgYmVlbiBoaXQhJyk7XG5cdH07XG5cdHNoaXAuaXNTdW5rID0gZnVuY3Rpb24gKCkge1xuXHRcdGlmIChzaGlwLmhpdHMgPT09IHNoaXAubGVuZ3RoKSB7XG5cdFx0XHRzaGlwLnN1bmsgPSAnWWVzJztcblx0XHRcdGFsZXJ0KHNoaXAubmFtZSArICcgaGFzIGJlZW4gc3VuayEnKTtcblx0XHR9XG5cdH07XG5cdHJldHVybiBzaGlwO1xufVxuXG5jb25zdCBwbGF5ZXJBaXJjcmFmdENhcnJpZXIgPSBjcmVhdGVTaGlwKCdBaXJjcmFmdCBDYXJyaWVyJywgNSwgMCwgJ05vJyk7XG5jb25zdCBwbGF5ZXJCYXR0bGVzaGlwID0gY3JlYXRlU2hpcCgnQmF0dGxlc2hpcCcsIDQsIDAsICdObycpO1xuY29uc3QgcGxheWVyRGVzdHJveWVyID0gY3JlYXRlU2hpcCgnRGVzdHJveWVyJywgNCwgMCwgJ05vJyk7XG5jb25zdCBwbGF5ZXJTdWJtYXJpbmUgPSBjcmVhdGVTaGlwKCdTdWJtYXJpbmUnLCAzLCAwLCAnTm8nKTtcbmNvbnN0IHBsYXllclBhdHJvbEJvYXQgPSBjcmVhdGVTaGlwKCdQYXRyb2wgQm9hdCcsIDIsIDAsICdObycpO1xuXG5jb25zdCBjb21wdXRlckFpcmNyYWZ0Q2FycmllciA9IGNyZWF0ZVNoaXAoJ0FpcmNyYWZ0IENhcnJpZXInLCA1LCAwLCAnTm8nKTtcbmNvbnN0IGNvbXB1dGVyQmF0dGxlc2hpcCA9IGNyZWF0ZVNoaXAoJ0JhdHRsZXNoaXAnLCA0LCAwLCAnTm8nKTtcbmNvbnN0IGNvbXB1dGVyRGVzdHJveWVyID0gY3JlYXRlU2hpcCgnRGVzdHJveWVyJywgNCwgMCwgJ05vJyk7XG5jb25zdCBjb21wdXRlclN1Ym1hcmluZSA9IGNyZWF0ZVNoaXAoJ1N1Ym1hcmluZScsIDMsIDAsICdObycpO1xuY29uc3QgY29tcHV0ZXJQYXRyb2xCb2F0ID0gY3JlYXRlU2hpcCgnUGF0cm9sIEJvYXQnLCAyLCAwLCAnTm8nKTtcblxuZnVuY3Rpb24gY3JlYXRlTG9jYXRpb24oeCwgeSkge1xuXHRyZXR1cm4geyB4LCB5LCBib2F0OiAnbm9uZScsIGF0dGFja2VkOiAnbm8nIH07XG59XG5cbmNvbnN0IGNvbXB1dGVyQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NvbXB1dGVyLWNvbnRhaW5lcicpO1xuXG5mdW5jdGlvbiBjcmVhdGVQbGF5ZXJHYW1lQm9hcmQoKSB7XG5cdGNvbnN0IHBsYXllckdhbWVCb2FyZCA9IFtdO1xuXHRjb25zdCBjb2x1bW5zID0gMTA7XG5cdGNvbnN0IHJvd3MgPSAxMDtcblxuXHRmb3IgKGxldCB4ID0gJ0EnLmNoYXJDb2RlQXQoMCk7IHggPD0gJ0onLmNoYXJDb2RlQXQoMCk7IHgrKykge1xuXHRcdGZvciAobGV0IHkgPSAxOyB5IDw9IDEwOyB5KyspIHtcblx0XHRcdGNvbnN0IGxvY2F0aW9uID0gY3JlYXRlTG9jYXRpb24oU3RyaW5nLmZyb21DaGFyQ29kZSh4KSwgeSk7XG5cdFx0XHRwbGF5ZXJHYW1lQm9hcmQucHVzaChsb2NhdGlvbik7XG5cblx0XHRcdGNvbnN0IHBsYXllckNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwbGF5ZXItY29udGFpbmVyJyk7XG5cdFx0XHRjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0XHRcdGRpdi5pZCA9IFN0cmluZy5mcm9tQ2hhckNvZGUoeCkgKyB5O1xuXHRcdFx0ZGl2LmNsYXNzTGlzdC5hZGQoJ2xvY2F0aW9uJyk7XG5cdFx0XHRwbGF5ZXJDb250YWluZXIuYXBwZW5kQ2hpbGQoZGl2KTtcblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gcGxheWVyR2FtZUJvYXJkO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVDb21wdXRlckxvY2F0aW9uKHgsIHkpIHtcblx0cmV0dXJuIHsgeCwgeSwgYm9hdDogJ25vbmUnLCBhdHRhY2tlZDogJ25vJyB9O1xufVxuXG5mdW5jdGlvbiBjcmVhdGVDb21wdXRlckdhbWVCb2FyZCgpIHtcblx0Y29uc3QgY29tcHV0ZXJHYW1lQm9hcmQgPSBbXTtcblx0Y29uc3QgY29sdW1ucyA9IDEwO1xuXHRjb25zdCByb3dzID0gMTA7XG5cblx0Zm9yIChsZXQgeCA9ICdBJy5jaGFyQ29kZUF0KDApOyB4IDw9ICdKJy5jaGFyQ29kZUF0KDApOyB4KyspIHtcblx0XHRmb3IgKGxldCB5ID0gMTsgeSA8PSAxMDsgeSsrKSB7XG5cdFx0XHRjb25zdCBsb2NhdGlvbiA9IGNyZWF0ZUNvbXB1dGVyTG9jYXRpb24oU3RyaW5nLmZyb21DaGFyQ29kZSh4KSwgeSk7XG5cdFx0XHRjb21wdXRlckdhbWVCb2FyZC5wdXNoKGxvY2F0aW9uKTtcblxuXHRcdFx0Y29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdFx0XHRkaXYuaWQgPSAnY29tcHV0ZXItJyArIFN0cmluZy5mcm9tQ2hhckNvZGUoeCkgKyB5O1xuXHRcdFx0ZGl2LmNsYXNzTGlzdC5hZGQoJ2xvY2F0aW9uJyk7XG5cdFx0XHRjb21wdXRlckNvbnRhaW5lci5hcHBlbmRDaGlsZChkaXYpO1xuXHRcdH1cblx0fVxuXG5cdHJldHVybiBjb21wdXRlckdhbWVCb2FyZDtcbn1cblxuY29uc3QgcGxheWVyR2FtZUJvYXJkID0gY3JlYXRlUGxheWVyR2FtZUJvYXJkKCk7XG5jb25zdCBjb21wdXRlckdhbWVCb2FyZCA9IGNyZWF0ZUNvbXB1dGVyR2FtZUJvYXJkKCk7XG5cbmZ1bmN0aW9uIHJhbmRvbUNvb3JkaW5hdGUoKSB7XG5cdGNvbnN0IHggPSBTdHJpbmcuZnJvbUNoYXJDb2RlKE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKSArICdBJy5jaGFyQ29kZUF0KDApKTtcblx0Y29uc3QgeSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKSArIDE7XG5cdHJldHVybiB7IHgsIHkgfTtcbn1cblxuZnVuY3Rpb24gcGxhY2VDb21wdXRlclNoaXBzKGNvbXB1dGVyR2FtZUJvYXJkLCBzaGlwcykge1xuXHRmb3IgKGNvbnN0IHNoaXAgb2Ygc2hpcHMpIHtcblx0XHRsZXQgdmFsaWRQbGFjZW1lbnQgPSBmYWxzZTtcblx0XHR3aGlsZSAoIXZhbGlkUGxhY2VtZW50KSB7XG5cdFx0XHRjb25zdCB7IHgsIHkgfSA9IHJhbmRvbUNvb3JkaW5hdGUoKTtcblx0XHRcdGlmICh4LmNoYXJDb2RlQXQoMCkgKyBzaGlwLmxlbmd0aCAtIDEgPD0gJ0onLmNoYXJDb2RlQXQoMCkpIHtcblx0XHRcdFx0bGV0IGNhblBsYWNlU2hpcCA9IHRydWU7XG5cdFx0XHRcdGZvciAobGV0IGkgPSB4LmNoYXJDb2RlQXQoMCk7IGkgPD0geC5jaGFyQ29kZUF0KDApICsgc2hpcC5sZW5ndGggLSAxOyBpKyspIHtcblx0XHRcdFx0XHRjb25zdCBsb2NhdGlvblRvQ2hlY2sgPSBjb21wdXRlckdhbWVCb2FyZC5maW5kKFxuXHRcdFx0XHRcdFx0KGxvYykgPT4gbG9jLnggPT09IFN0cmluZy5mcm9tQ2hhckNvZGUoaSkgJiYgbG9jLnkgPT09IHlcblx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdGlmIChsb2NhdGlvblRvQ2hlY2suYm9hdCAhPT0gJ25vbmUnKSB7XG5cdFx0XHRcdFx0XHRjYW5QbGFjZVNoaXAgPSBmYWxzZTtcblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAoY2FuUGxhY2VTaGlwKSB7XG5cdFx0XHRcdFx0Zm9yIChsZXQgaSA9IHguY2hhckNvZGVBdCgwKTsgaSA8PSB4LmNoYXJDb2RlQXQoMCkgKyBzaGlwLmxlbmd0aCAtIDE7IGkrKykge1xuXHRcdFx0XHRcdFx0Y29uc3QgbG9jYXRpb25Ub1BsYWNlID0gY29tcHV0ZXJHYW1lQm9hcmQuZmluZChcblx0XHRcdFx0XHRcdFx0KGxvYykgPT4gbG9jLnggPT09IFN0cmluZy5mcm9tQ2hhckNvZGUoaSkgJiYgbG9jLnkgPT09IHlcblx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0XHRsb2NhdGlvblRvUGxhY2UuYm9hdCA9IHNoaXAubmFtZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0dmFsaWRQbGFjZW1lbnQgPSB0cnVlO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG59XG5cbmNvbnN0IGNvbXB1dGVyU2hpcHMgPSBbXG5cdGNvbXB1dGVyQWlyY3JhZnRDYXJyaWVyLFxuXHRjb21wdXRlckJhdHRsZXNoaXAsXG5cdGNvbXB1dGVyRGVzdHJveWVyLFxuXHRjb21wdXRlclN1Ym1hcmluZSxcblx0Y29tcHV0ZXJQYXRyb2xCb2F0LFxuXTtcblxucGxhY2VDb21wdXRlclNoaXBzKGNvbXB1dGVyR2FtZUJvYXJkLCBjb21wdXRlclNoaXBzKTtcblxuZnVuY3Rpb24gcGxhY2VQbGF5ZXJTaGlwcyhwbGF5ZXJHYW1lQm9hcmQsIHNoaXBzKSB7XG5cdGZvciAoY29uc3Qgc2hpcCBvZiBzaGlwcykge1xuXHRcdGxldCB2YWxpZFBsYWNlbWVudCA9IGZhbHNlO1xuXG5cdFx0d2hpbGUgKCF2YWxpZFBsYWNlbWVudCkge1xuXHRcdFx0Y29uc3QgeCA9IHByb21wdChgRW50ZXIgeC1jb29yZGluYXRlIGZvciAke3NoaXAubmFtZX0gKEEtSik6YCk7XG5cdFx0XHRjb25zdCB5ID0gcGFyc2VJbnQocHJvbXB0KGBFbnRlciB5LWNvb3JkaW5hdGUgZm9yICR7c2hpcC5uYW1lfSAoMS0xMCk6YCkpO1xuXHRcdFx0Y29uc3QgaG9yaXpvbnRhbCA9IGNvbmZpcm0oXG5cdFx0XHRcdGBEbyB5b3Ugd2FudCB0byBwbGFjZSB0aGUgc2hpcCB2ZXJ0aWNhbGx5PyAoT0sgZm9yIFllcywgQ2FuY2VsIGZvciBObylgXG5cdFx0XHQpO1xuXG5cdFx0XHRpZiAoXG5cdFx0XHRcdHggPj0gJ0EnICYmXG5cdFx0XHRcdHggPD0gJ0onICYmXG5cdFx0XHRcdHkgPj0gMSAmJlxuXHRcdFx0XHR5IDw9IDEwXG5cdFx0XHQpIHtcblx0XHRcdFx0Y29uc3QgeFVwcGVyID0geC50b1VwcGVyQ2FzZSgpO1xuXG5cdFx0XHRcdGlmIChob3Jpem9udGFsKSB7XG5cdFx0XHRcdFx0Ly8gQ2hlY2sgaWYgdGhlcmUncyBlbm91Z2ggc3BhY2UgdG8gcGxhY2UgdGhlIHNoaXAgaG9yaXpvbnRhbGx5XG5cdFx0XHRcdFx0aWYgKHhVcHBlci5jaGFyQ29kZUF0KDApICsgc2hpcC5sZW5ndGggLSAxIDw9ICdKJy5jaGFyQ29kZUF0KDApKSB7XG5cdFx0XHRcdFx0XHRsZXQgY2FuUGxhY2VTaGlwID0gdHJ1ZTtcblx0XHRcdFx0XHRcdGZvciAobGV0IGkgPSB4VXBwZXIuY2hhckNvZGVBdCgwKTsgaSA8PSB4VXBwZXIuY2hhckNvZGVBdCgwKSArIHNoaXAubGVuZ3RoIC0gMTsgaSsrKSB7XG5cdFx0XHRcdFx0XHRcdGNvbnN0IGxvY2F0aW9uVG9DaGVjayA9IHBsYXllckdhbWVCb2FyZC5maW5kKFxuXHRcdFx0XHRcdFx0XHRcdChsb2MpID0+IGxvYy54ID09PSBTdHJpbmcuZnJvbUNoYXJDb2RlKGkpICYmIGxvYy55ID09PSB5XG5cdFx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0XHRcdGlmIChsb2NhdGlvblRvQ2hlY2suYm9hdCAhPT0gJ25vbmUnKSB7XG5cdFx0XHRcdFx0XHRcdFx0Y2FuUGxhY2VTaGlwID0gZmFsc2U7XG5cdFx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGlmIChjYW5QbGFjZVNoaXApIHtcblx0XHRcdFx0XHRcdFx0Zm9yIChsZXQgaSA9IHhVcHBlci5jaGFyQ29kZUF0KDApOyBpIDw9IHhVcHBlci5jaGFyQ29kZUF0KDApICsgc2hpcC5sZW5ndGggLSAxOyBpKyspIHtcblx0XHRcdFx0XHRcdFx0XHRjb25zdCBsb2NhdGlvblRvUGxhY2UgPSBwbGF5ZXJHYW1lQm9hcmQuZmluZChcblx0XHRcdFx0XHRcdFx0XHRcdChsb2MpID0+IGxvYy54ID09PSBTdHJpbmcuZnJvbUNoYXJDb2RlKGkpICYmIGxvYy55ID09PSB5XG5cdFx0XHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRcdFx0XHRsb2NhdGlvblRvUGxhY2UuYm9hdCA9IHNoaXAubmFtZTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR2YWxpZFBsYWNlbWVudCA9IHRydWU7XG5cdFx0XHRcdFx0XHRcdGFsZXJ0KGAke3NoaXAubmFtZX0gaGFzIGJlZW4gcGxhY2VkIGF0ICR7eFVwcGVyfSR7eX1gKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0Ly8gQ2hlY2sgaWYgdGhlcmUncyBlbm91Z2ggc3BhY2UgdG8gcGxhY2UgdGhlIHNoaXAgdmVydGljYWxseVxuXHRcdFx0XHRcdGlmICh5ICsgc2hpcC5sZW5ndGggLSAxIDw9IDEwKSB7XG5cdFx0XHRcdFx0XHRsZXQgY2FuUGxhY2VTaGlwID0gdHJ1ZTtcblx0XHRcdFx0XHRcdGZvciAobGV0IGkgPSB5OyBpIDw9IHkgKyBzaGlwLmxlbmd0aCAtIDE7IGkrKykge1xuXHRcdFx0XHRcdFx0XHRjb25zdCBsb2NhdGlvblRvQ2hlY2sgPSBwbGF5ZXJHYW1lQm9hcmQuZmluZChcblx0XHRcdFx0XHRcdFx0XHQobG9jKSA9PiBsb2MueCA9PT0geFVwcGVyICYmIGxvYy55ID09PSBpXG5cdFx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0XHRcdGlmIChsb2NhdGlvblRvQ2hlY2suYm9hdCAhPT0gJ25vbmUnKSB7XG5cdFx0XHRcdFx0XHRcdFx0Y2FuUGxhY2VTaGlwID0gZmFsc2U7XG5cdFx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGlmIChjYW5QbGFjZVNoaXApIHtcblx0XHRcdFx0XHRcdFx0Zm9yIChsZXQgaSA9IHk7IGkgPD0geSArIHNoaXAubGVuZ3RoIC0gMTsgaSsrKSB7XG5cdFx0XHRcdFx0XHRcdFx0Y29uc3QgbG9jYXRpb25Ub1BsYWNlID0gcGxheWVyR2FtZUJvYXJkLmZpbmQoXG5cdFx0XHRcdFx0XHRcdFx0XHQobG9jKSA9PiBsb2MueCA9PT0geFVwcGVyICYmIGxvYy55ID09PSBpXG5cdFx0XHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRcdFx0XHRsb2NhdGlvblRvUGxhY2UuYm9hdCA9IHNoaXAubmFtZTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR2YWxpZFBsYWNlbWVudCA9IHRydWU7XG5cdFx0XHRcdFx0XHRcdGFsZXJ0KGAke3NoaXAubmFtZX0gaGFzIGJlZW4gcGxhY2VkIGF0ICR7eFVwcGVyfSR7eX1gKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cbn1cblxuLy8gQ3JlYXRlIGFuIGFycmF5IG9mIHBsYXllciBzaGlwc1xuY29uc3QgcGxheWVyU2hpcHMgPSBbXG5cdHBsYXllckFpcmNyYWZ0Q2Fycmllcixcblx0cGxheWVyQmF0dGxlc2hpcCxcblx0cGxheWVyRGVzdHJveWVyLFxuXHRwbGF5ZXJTdWJtYXJpbmUsXG5cdHBsYXllclBhdHJvbEJvYXQsXG5dO1xuXG4vLyBQcm9tcHQgdGhlIHBsYXllciB0byBwbGFjZSBlYWNoIHNoaXBcbnBsYWNlUGxheWVyU2hpcHMocGxheWVyR2FtZUJvYXJkLCBwbGF5ZXJTaGlwcyk7XG5cbmNvbnNvbGUubG9nKHBsYXllckdhbWVCb2FyZCk7XG5jb25zb2xlLmxvZyhjb21wdXRlckdhbWVCb2FyZCk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=