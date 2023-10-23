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
	const x = String.fromCharCode(
		Math.floor(Math.random() * 10) + 'A'.charCodeAt(0)
	);
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
				for (
					let i = x.charCodeAt(0);
					i <= x.charCodeAt(0) + ship.length - 1;
					i++
				) {
					const locationToCheck = computerGameBoard.find(
						(loc) => loc.x === String.fromCharCode(i) && loc.y === y
					);
					if (locationToCheck.boat !== 'none') {
						canPlaceShip = false;
						break;
					}
				}
				if (canPlaceShip) {
					for (
						let i = x.charCodeAt(0);
						i <= x.charCodeAt(0) + ship.length - 1;
						i++
					) {
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

			if (x >= 'A' && x <= 'J' && y >= 1 && y <= 10) {
				const xUpper = x.toUpperCase();

				if (horizontal) {
					// Check if there's enough space to place the ship horizontally
					if (xUpper.charCodeAt(0) + ship.length - 1 <= 'J'.charCodeAt(0)) {
						let canPlaceShip = true;
						for (
							let i = xUpper.charCodeAt(0);
							i <= xUpper.charCodeAt(0) + ship.length - 1;
							i++
						) {
							const locationToCheck = playerGameBoard.find(
								(loc) => loc.x === String.fromCharCode(i) && loc.y === y
							);
							if (locationToCheck.boat !== 'none') {
								canPlaceShip = false;
								break;
							}
						}
						if (canPlaceShip) {
							for (
								let i = xUpper.charCodeAt(0);
								i <= xUpper.charCodeAt(0) + ship.length - 1;
								i++
							) {
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


let previousComputerAttacks = []; // Keep track of the previous computer attacks
let previousHits = []; // Keep track of the previous hit locations

function computerAttack() {
	if (!gameOver) {
		let randomPlayerLocation;

		if (previousComputerAttacks.length > 0) {
			let lastHits = previousHits.slice(previousHits.length - 4); // Get the last 4 hits
			let adjacentLocations = [];

			for (const hit of lastHits) {
				adjacentLocations = adjacentLocations.concat(getAdjacentLocations(hit.x, hit.y));
			}

			randomPlayerLocation = adjacentLocations.find((loc) => loc.attacked === 'no');
		}

		if (!randomPlayerLocation) {
			randomPlayerLocation = playerGameBoard.filter((location) => location.attacked === 'no');
			randomPlayerLocation = randomPlayerLocation[Math.floor(Math.random() * randomPlayerLocation.length)];
		}

		// Mark the attacked location as 'yes'.
		randomPlayerLocation.attacked = 'yes';

		// Store the previous computer attack for reference.
		previousComputerAttacks.push(randomPlayerLocation);
		if (previousComputerAttacks.length > 4) {
			previousComputerAttacks.shift(); // Keep the last 4 attacks in the array
		}

		// Find the corresponding div on the player's game board.
		const div = document.getElementById(randomPlayerLocation.x + randomPlayerLocation.y);

		if (randomPlayerLocation.boat === 'none') {
			div.style.backgroundColor = 'grey';
			alert("Computer's attack: It's a miss!");
		} else {
			div.style.backgroundColor = 'red';
			const ship = playerShips.find((s) => s.name === randomPlayerLocation.boat);
			ship.hit();
			ship.isSunk();
			checkPlayerShipsSunk(); // Check if player's ships are all sunk after each attack.
			// Store the previous hit location for reference.
			previousHits.push(randomPlayerLocation);
		}

		if (!gameOver) {
			// After handling computer's attack, allow the player to make their attack.
		}
	}
}

// Helper function to get adjacent locations
function getAdjacentLocations(x, y) {
	const adjacentLocations = [];

	if (y > 1) {
		adjacentLocations.push(playerGameBoard.find((loc) => loc.x === x && loc.y === y - 1));
	}
	if (y < 10) {
		adjacentLocations.push(playerGameBoard.find((loc) => loc.x === x && loc.y === y + 1));
	}
	if (x > 'A') {
		adjacentLocations.push(playerGameBoard.find((loc) => loc.x === String.fromCharCode(x.charCodeAt(0) - 1) && loc.y === y));
	}
	if (x < 'J') {
		adjacentLocations.push(playerGameBoard.find((loc) => loc.x === String.fromCharCode(x.charCodeAt(0) + 1) && loc.y === y));
	}

	return adjacentLocations;
}



function checkPlayerShipsSunk() {
	const allSunk = playerShips.every((ship) => ship.sunk === 'Yes');
	if (allSunk) {
		alert('GAME OVER! COMPUTER WINS!');
		// Optionally, you can reset the game or perform any other actions here.
	}
}

function checkComputerShipsSunk() {
	const allSunk = computerShips.every((ship) => ship.sunk === 'Yes');
	if (allSunk) {
		alert('GAME OVER! YOU WIN!');
		// Optionally, you can reset the game or perform any other actions here.
	}
}

let gameOver = false; // Add this variable to track the game state

function handlePlayerAttack(location) {
	if (!gameOver && location.attacked === 'no') {
		location.attacked = 'yes';
		const div = document.getElementById('computer-' + location.x + location.y);

		if (location.boat === 'none') {
			div.style.backgroundColor = 'grey';
			alert('Its a miss!');
		} else {
			div.style.backgroundColor = 'red';
			const ship = computerShips.find((s) => s.name === location.boat);
			ship.hit();
			ship.isSunk();
			checkComputerShipsSunk(); // Check if computer's ships are all sunk after each attack.
		}

		// Check if the game is over (all computer ships are sunk)
		if (!gameOver) {
			// After handling player's attack, trigger computer's attack.
			computerAttack();
		}
	}
}

function checkComputerShipsSunk() {
	const allSunk = computerShips.every((ship) => ship.sunk === 'Yes');
	if (allSunk) {
		alert('GAME OVER! YOU WIN!');
		gameOver = true; // Set the game over flag to true
		// Optionally, you can reset the game or perform any other actions here.
	}
}

// Add a click event listener to each computer game board div
computerGameBoard.forEach((location) => {
	const div = document.getElementById('computer-' + location.x + location.y);
	div.addEventListener('click', () => {
		handlePlayerAttack(location);
	});
});

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCO0FBQzdCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CO0FBQ25CO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIGNyZWF0ZVNoaXAobmFtZSwgbGVuZ3RoLCBoaXRzLCBzdW5rKSB7XG5cdGNvbnN0IHNoaXAgPSB7fTtcblx0c2hpcC5uYW1lID0gbmFtZTtcblx0c2hpcC5sZW5ndGggPSBsZW5ndGg7XG5cdHNoaXAuaGl0cyA9IGhpdHM7XG5cdHNoaXAuc3VuayA9IHN1bms7XG5cdHNoaXAuaGl0ID0gZnVuY3Rpb24gKCkge1xuXHRcdHNoaXAuaGl0cyArPSAxO1xuXHRcdGFsZXJ0KHNoaXAubmFtZSArICcgaGFzIGJlZW4gaGl0IScpO1xuXHR9O1xuXHRzaGlwLmlzU3VuayA9IGZ1bmN0aW9uICgpIHtcblx0XHRpZiAoc2hpcC5oaXRzID09PSBzaGlwLmxlbmd0aCkge1xuXHRcdFx0c2hpcC5zdW5rID0gJ1llcyc7XG5cdFx0XHRhbGVydChzaGlwLm5hbWUgKyAnIGhhcyBiZWVuIHN1bmshJyk7XG5cdFx0fVxuXHR9O1xuXHRyZXR1cm4gc2hpcDtcbn1cblxuY29uc3QgcGxheWVyQWlyY3JhZnRDYXJyaWVyID0gY3JlYXRlU2hpcCgnQWlyY3JhZnQgQ2FycmllcicsIDUsIDAsICdObycpO1xuY29uc3QgcGxheWVyQmF0dGxlc2hpcCA9IGNyZWF0ZVNoaXAoJ0JhdHRsZXNoaXAnLCA0LCAwLCAnTm8nKTtcbmNvbnN0IHBsYXllckRlc3Ryb3llciA9IGNyZWF0ZVNoaXAoJ0Rlc3Ryb3llcicsIDQsIDAsICdObycpO1xuY29uc3QgcGxheWVyU3VibWFyaW5lID0gY3JlYXRlU2hpcCgnU3VibWFyaW5lJywgMywgMCwgJ05vJyk7XG5jb25zdCBwbGF5ZXJQYXRyb2xCb2F0ID0gY3JlYXRlU2hpcCgnUGF0cm9sIEJvYXQnLCAyLCAwLCAnTm8nKTtcblxuY29uc3QgY29tcHV0ZXJBaXJjcmFmdENhcnJpZXIgPSBjcmVhdGVTaGlwKCdBaXJjcmFmdCBDYXJyaWVyJywgNSwgMCwgJ05vJyk7XG5jb25zdCBjb21wdXRlckJhdHRsZXNoaXAgPSBjcmVhdGVTaGlwKCdCYXR0bGVzaGlwJywgNCwgMCwgJ05vJyk7XG5jb25zdCBjb21wdXRlckRlc3Ryb3llciA9IGNyZWF0ZVNoaXAoJ0Rlc3Ryb3llcicsIDQsIDAsICdObycpO1xuY29uc3QgY29tcHV0ZXJTdWJtYXJpbmUgPSBjcmVhdGVTaGlwKCdTdWJtYXJpbmUnLCAzLCAwLCAnTm8nKTtcbmNvbnN0IGNvbXB1dGVyUGF0cm9sQm9hdCA9IGNyZWF0ZVNoaXAoJ1BhdHJvbCBCb2F0JywgMiwgMCwgJ05vJyk7XG5cbmZ1bmN0aW9uIGNyZWF0ZUxvY2F0aW9uKHgsIHkpIHtcblx0cmV0dXJuIHsgeCwgeSwgYm9hdDogJ25vbmUnLCBhdHRhY2tlZDogJ25vJyB9O1xufVxuXG5jb25zdCBjb21wdXRlckNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjb21wdXRlci1jb250YWluZXInKTtcblxuZnVuY3Rpb24gY3JlYXRlUGxheWVyR2FtZUJvYXJkKCkge1xuXHRjb25zdCBwbGF5ZXJHYW1lQm9hcmQgPSBbXTtcblx0Y29uc3QgY29sdW1ucyA9IDEwO1xuXHRjb25zdCByb3dzID0gMTA7XG5cblx0Zm9yIChsZXQgeCA9ICdBJy5jaGFyQ29kZUF0KDApOyB4IDw9ICdKJy5jaGFyQ29kZUF0KDApOyB4KyspIHtcblx0XHRmb3IgKGxldCB5ID0gMTsgeSA8PSAxMDsgeSsrKSB7XG5cdFx0XHRjb25zdCBsb2NhdGlvbiA9IGNyZWF0ZUxvY2F0aW9uKFN0cmluZy5mcm9tQ2hhckNvZGUoeCksIHkpO1xuXHRcdFx0cGxheWVyR2FtZUJvYXJkLnB1c2gobG9jYXRpb24pO1xuXG5cdFx0XHRjb25zdCBwbGF5ZXJDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcGxheWVyLWNvbnRhaW5lcicpO1xuXHRcdFx0Y29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdFx0XHRkaXYuaWQgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKHgpICsgeTtcblx0XHRcdGRpdi5jbGFzc0xpc3QuYWRkKCdsb2NhdGlvbicpO1xuXHRcdFx0cGxheWVyQ29udGFpbmVyLmFwcGVuZENoaWxkKGRpdik7XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIHBsYXllckdhbWVCb2FyZDtcbn1cblxuZnVuY3Rpb24gY3JlYXRlQ29tcHV0ZXJMb2NhdGlvbih4LCB5KSB7XG5cdHJldHVybiB7IHgsIHksIGJvYXQ6ICdub25lJywgYXR0YWNrZWQ6ICdubycgfTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlQ29tcHV0ZXJHYW1lQm9hcmQoKSB7XG5cdGNvbnN0IGNvbXB1dGVyR2FtZUJvYXJkID0gW107XG5cdGNvbnN0IGNvbHVtbnMgPSAxMDtcblx0Y29uc3Qgcm93cyA9IDEwO1xuXG5cdGZvciAobGV0IHggPSAnQScuY2hhckNvZGVBdCgwKTsgeCA8PSAnSicuY2hhckNvZGVBdCgwKTsgeCsrKSB7XG5cdFx0Zm9yIChsZXQgeSA9IDE7IHkgPD0gMTA7IHkrKykge1xuXHRcdFx0Y29uc3QgbG9jYXRpb24gPSBjcmVhdGVDb21wdXRlckxvY2F0aW9uKFN0cmluZy5mcm9tQ2hhckNvZGUoeCksIHkpO1xuXHRcdFx0Y29tcHV0ZXJHYW1lQm9hcmQucHVzaChsb2NhdGlvbik7XG5cblx0XHRcdGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHRcdFx0ZGl2LmlkID0gJ2NvbXB1dGVyLScgKyBTdHJpbmcuZnJvbUNoYXJDb2RlKHgpICsgeTtcblx0XHRcdGRpdi5jbGFzc0xpc3QuYWRkKCdsb2NhdGlvbicpO1xuXHRcdFx0Y29tcHV0ZXJDb250YWluZXIuYXBwZW5kQ2hpbGQoZGl2KTtcblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gY29tcHV0ZXJHYW1lQm9hcmQ7XG59XG5cbmNvbnN0IHBsYXllckdhbWVCb2FyZCA9IGNyZWF0ZVBsYXllckdhbWVCb2FyZCgpO1xuY29uc3QgY29tcHV0ZXJHYW1lQm9hcmQgPSBjcmVhdGVDb21wdXRlckdhbWVCb2FyZCgpO1xuXG5mdW5jdGlvbiByYW5kb21Db29yZGluYXRlKCkge1xuXHRjb25zdCB4ID0gU3RyaW5nLmZyb21DaGFyQ29kZShcblx0XHRNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCkgKyAnQScuY2hhckNvZGVBdCgwKVxuXHQpO1xuXHRjb25zdCB5ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApICsgMTtcblx0cmV0dXJuIHsgeCwgeSB9O1xufVxuXG5mdW5jdGlvbiBwbGFjZUNvbXB1dGVyU2hpcHMoY29tcHV0ZXJHYW1lQm9hcmQsIHNoaXBzKSB7XG5cdGZvciAoY29uc3Qgc2hpcCBvZiBzaGlwcykge1xuXHRcdGxldCB2YWxpZFBsYWNlbWVudCA9IGZhbHNlO1xuXHRcdHdoaWxlICghdmFsaWRQbGFjZW1lbnQpIHtcblx0XHRcdGNvbnN0IHsgeCwgeSB9ID0gcmFuZG9tQ29vcmRpbmF0ZSgpO1xuXHRcdFx0aWYgKHguY2hhckNvZGVBdCgwKSArIHNoaXAubGVuZ3RoIC0gMSA8PSAnSicuY2hhckNvZGVBdCgwKSkge1xuXHRcdFx0XHRsZXQgY2FuUGxhY2VTaGlwID0gdHJ1ZTtcblx0XHRcdFx0Zm9yIChcblx0XHRcdFx0XHRsZXQgaSA9IHguY2hhckNvZGVBdCgwKTtcblx0XHRcdFx0XHRpIDw9IHguY2hhckNvZGVBdCgwKSArIHNoaXAubGVuZ3RoIC0gMTtcblx0XHRcdFx0XHRpKytcblx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0Y29uc3QgbG9jYXRpb25Ub0NoZWNrID0gY29tcHV0ZXJHYW1lQm9hcmQuZmluZChcblx0XHRcdFx0XHRcdChsb2MpID0+IGxvYy54ID09PSBTdHJpbmcuZnJvbUNoYXJDb2RlKGkpICYmIGxvYy55ID09PSB5XG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRpZiAobG9jYXRpb25Ub0NoZWNrLmJvYXQgIT09ICdub25lJykge1xuXHRcdFx0XHRcdFx0Y2FuUGxhY2VTaGlwID0gZmFsc2U7XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKGNhblBsYWNlU2hpcCkge1xuXHRcdFx0XHRcdGZvciAoXG5cdFx0XHRcdFx0XHRsZXQgaSA9IHguY2hhckNvZGVBdCgwKTtcblx0XHRcdFx0XHRcdGkgPD0geC5jaGFyQ29kZUF0KDApICsgc2hpcC5sZW5ndGggLSAxO1xuXHRcdFx0XHRcdFx0aSsrXG5cdFx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0XHRjb25zdCBsb2NhdGlvblRvUGxhY2UgPSBjb21wdXRlckdhbWVCb2FyZC5maW5kKFxuXHRcdFx0XHRcdFx0XHQobG9jKSA9PiBsb2MueCA9PT0gU3RyaW5nLmZyb21DaGFyQ29kZShpKSAmJiBsb2MueSA9PT0geVxuXHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRcdGxvY2F0aW9uVG9QbGFjZS5ib2F0ID0gc2hpcC5uYW1lO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHR2YWxpZFBsYWNlbWVudCA9IHRydWU7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cbn1cblxuY29uc3QgY29tcHV0ZXJTaGlwcyA9IFtcblx0Y29tcHV0ZXJBaXJjcmFmdENhcnJpZXIsXG5cdGNvbXB1dGVyQmF0dGxlc2hpcCxcblx0Y29tcHV0ZXJEZXN0cm95ZXIsXG5cdGNvbXB1dGVyU3VibWFyaW5lLFxuXHRjb21wdXRlclBhdHJvbEJvYXQsXG5dO1xuXG5wbGFjZUNvbXB1dGVyU2hpcHMoY29tcHV0ZXJHYW1lQm9hcmQsIGNvbXB1dGVyU2hpcHMpO1xuXG5mdW5jdGlvbiBwbGFjZVBsYXllclNoaXBzKHBsYXllckdhbWVCb2FyZCwgc2hpcHMpIHtcblx0Zm9yIChjb25zdCBzaGlwIG9mIHNoaXBzKSB7XG5cdFx0bGV0IHZhbGlkUGxhY2VtZW50ID0gZmFsc2U7XG5cblx0XHR3aGlsZSAoIXZhbGlkUGxhY2VtZW50KSB7XG5cdFx0XHRjb25zdCB4ID0gcHJvbXB0KGBFbnRlciB4LWNvb3JkaW5hdGUgZm9yICR7c2hpcC5uYW1lfSAoQS1KKTpgKTtcblx0XHRcdGNvbnN0IHkgPSBwYXJzZUludChwcm9tcHQoYEVudGVyIHktY29vcmRpbmF0ZSBmb3IgJHtzaGlwLm5hbWV9ICgxLTEwKTpgKSk7XG5cdFx0XHRjb25zdCBob3Jpem9udGFsID0gY29uZmlybShcblx0XHRcdFx0YERvIHlvdSB3YW50IHRvIHBsYWNlIHRoZSBzaGlwIHZlcnRpY2FsbHk/IChPSyBmb3IgWWVzLCBDYW5jZWwgZm9yIE5vKWBcblx0XHRcdCk7XG5cblx0XHRcdGlmICh4ID49ICdBJyAmJiB4IDw9ICdKJyAmJiB5ID49IDEgJiYgeSA8PSAxMCkge1xuXHRcdFx0XHRjb25zdCB4VXBwZXIgPSB4LnRvVXBwZXJDYXNlKCk7XG5cblx0XHRcdFx0aWYgKGhvcml6b250YWwpIHtcblx0XHRcdFx0XHQvLyBDaGVjayBpZiB0aGVyZSdzIGVub3VnaCBzcGFjZSB0byBwbGFjZSB0aGUgc2hpcCBob3Jpem9udGFsbHlcblx0XHRcdFx0XHRpZiAoeFVwcGVyLmNoYXJDb2RlQXQoMCkgKyBzaGlwLmxlbmd0aCAtIDEgPD0gJ0onLmNoYXJDb2RlQXQoMCkpIHtcblx0XHRcdFx0XHRcdGxldCBjYW5QbGFjZVNoaXAgPSB0cnVlO1xuXHRcdFx0XHRcdFx0Zm9yIChcblx0XHRcdFx0XHRcdFx0bGV0IGkgPSB4VXBwZXIuY2hhckNvZGVBdCgwKTtcblx0XHRcdFx0XHRcdFx0aSA8PSB4VXBwZXIuY2hhckNvZGVBdCgwKSArIHNoaXAubGVuZ3RoIC0gMTtcblx0XHRcdFx0XHRcdFx0aSsrXG5cdFx0XHRcdFx0XHQpIHtcblx0XHRcdFx0XHRcdFx0Y29uc3QgbG9jYXRpb25Ub0NoZWNrID0gcGxheWVyR2FtZUJvYXJkLmZpbmQoXG5cdFx0XHRcdFx0XHRcdFx0KGxvYykgPT4gbG9jLnggPT09IFN0cmluZy5mcm9tQ2hhckNvZGUoaSkgJiYgbG9jLnkgPT09IHlcblx0XHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRcdFx0aWYgKGxvY2F0aW9uVG9DaGVjay5ib2F0ICE9PSAnbm9uZScpIHtcblx0XHRcdFx0XHRcdFx0XHRjYW5QbGFjZVNoaXAgPSBmYWxzZTtcblx0XHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0aWYgKGNhblBsYWNlU2hpcCkge1xuXHRcdFx0XHRcdFx0XHRmb3IgKFxuXHRcdFx0XHRcdFx0XHRcdGxldCBpID0geFVwcGVyLmNoYXJDb2RlQXQoMCk7XG5cdFx0XHRcdFx0XHRcdFx0aSA8PSB4VXBwZXIuY2hhckNvZGVBdCgwKSArIHNoaXAubGVuZ3RoIC0gMTtcblx0XHRcdFx0XHRcdFx0XHRpKytcblx0XHRcdFx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0XHRcdFx0Y29uc3QgbG9jYXRpb25Ub1BsYWNlID0gcGxheWVyR2FtZUJvYXJkLmZpbmQoXG5cdFx0XHRcdFx0XHRcdFx0XHQobG9jKSA9PiBsb2MueCA9PT0gU3RyaW5nLmZyb21DaGFyQ29kZShpKSAmJiBsb2MueSA9PT0geVxuXHRcdFx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0XHRcdFx0bG9jYXRpb25Ub1BsYWNlLmJvYXQgPSBzaGlwLm5hbWU7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0dmFsaWRQbGFjZW1lbnQgPSB0cnVlO1xuXHRcdFx0XHRcdFx0XHRhbGVydChgJHtzaGlwLm5hbWV9IGhhcyBiZWVuIHBsYWNlZCBhdCAke3hVcHBlcn0ke3l9YCk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdC8vIENoZWNrIGlmIHRoZXJlJ3MgZW5vdWdoIHNwYWNlIHRvIHBsYWNlIHRoZSBzaGlwIHZlcnRpY2FsbHlcblx0XHRcdFx0XHRpZiAoeSArIHNoaXAubGVuZ3RoIC0gMSA8PSAxMCkge1xuXHRcdFx0XHRcdFx0bGV0IGNhblBsYWNlU2hpcCA9IHRydWU7XG5cdFx0XHRcdFx0XHRmb3IgKGxldCBpID0geTsgaSA8PSB5ICsgc2hpcC5sZW5ndGggLSAxOyBpKyspIHtcblx0XHRcdFx0XHRcdFx0Y29uc3QgbG9jYXRpb25Ub0NoZWNrID0gcGxheWVyR2FtZUJvYXJkLmZpbmQoXG5cdFx0XHRcdFx0XHRcdFx0KGxvYykgPT4gbG9jLnggPT09IHhVcHBlciAmJiBsb2MueSA9PT0gaVxuXHRcdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdFx0XHRpZiAobG9jYXRpb25Ub0NoZWNrLmJvYXQgIT09ICdub25lJykge1xuXHRcdFx0XHRcdFx0XHRcdGNhblBsYWNlU2hpcCA9IGZhbHNlO1xuXHRcdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRpZiAoY2FuUGxhY2VTaGlwKSB7XG5cdFx0XHRcdFx0XHRcdGZvciAobGV0IGkgPSB5OyBpIDw9IHkgKyBzaGlwLmxlbmd0aCAtIDE7IGkrKykge1xuXHRcdFx0XHRcdFx0XHRcdGNvbnN0IGxvY2F0aW9uVG9QbGFjZSA9IHBsYXllckdhbWVCb2FyZC5maW5kKFxuXHRcdFx0XHRcdFx0XHRcdFx0KGxvYykgPT4gbG9jLnggPT09IHhVcHBlciAmJiBsb2MueSA9PT0gaVxuXHRcdFx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0XHRcdFx0bG9jYXRpb25Ub1BsYWNlLmJvYXQgPSBzaGlwLm5hbWU7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0dmFsaWRQbGFjZW1lbnQgPSB0cnVlO1xuXHRcdFx0XHRcdFx0XHRhbGVydChgJHtzaGlwLm5hbWV9IGhhcyBiZWVuIHBsYWNlZCBhdCAke3hVcHBlcn0ke3l9YCk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG59XG5cbi8vIENyZWF0ZSBhbiBhcnJheSBvZiBwbGF5ZXIgc2hpcHNcbmNvbnN0IHBsYXllclNoaXBzID0gW1xuXHRwbGF5ZXJBaXJjcmFmdENhcnJpZXIsXG5cdHBsYXllckJhdHRsZXNoaXAsXG5cdHBsYXllckRlc3Ryb3llcixcblx0cGxheWVyU3VibWFyaW5lLFxuXHRwbGF5ZXJQYXRyb2xCb2F0LFxuXTtcblxuLy8gUHJvbXB0IHRoZSBwbGF5ZXIgdG8gcGxhY2UgZWFjaCBzaGlwXG5wbGFjZVBsYXllclNoaXBzKHBsYXllckdhbWVCb2FyZCwgcGxheWVyU2hpcHMpO1xuXG5cbmxldCBwcmV2aW91c0NvbXB1dGVyQXR0YWNrcyA9IFtdOyAvLyBLZWVwIHRyYWNrIG9mIHRoZSBwcmV2aW91cyBjb21wdXRlciBhdHRhY2tzXG5sZXQgcHJldmlvdXNIaXRzID0gW107IC8vIEtlZXAgdHJhY2sgb2YgdGhlIHByZXZpb3VzIGhpdCBsb2NhdGlvbnNcblxuZnVuY3Rpb24gY29tcHV0ZXJBdHRhY2soKSB7XG5cdGlmICghZ2FtZU92ZXIpIHtcblx0XHRsZXQgcmFuZG9tUGxheWVyTG9jYXRpb247XG5cblx0XHRpZiAocHJldmlvdXNDb21wdXRlckF0dGFja3MubGVuZ3RoID4gMCkge1xuXHRcdFx0bGV0IGxhc3RIaXRzID0gcHJldmlvdXNIaXRzLnNsaWNlKHByZXZpb3VzSGl0cy5sZW5ndGggLSA0KTsgLy8gR2V0IHRoZSBsYXN0IDQgaGl0c1xuXHRcdFx0bGV0IGFkamFjZW50TG9jYXRpb25zID0gW107XG5cblx0XHRcdGZvciAoY29uc3QgaGl0IG9mIGxhc3RIaXRzKSB7XG5cdFx0XHRcdGFkamFjZW50TG9jYXRpb25zID0gYWRqYWNlbnRMb2NhdGlvbnMuY29uY2F0KGdldEFkamFjZW50TG9jYXRpb25zKGhpdC54LCBoaXQueSkpO1xuXHRcdFx0fVxuXG5cdFx0XHRyYW5kb21QbGF5ZXJMb2NhdGlvbiA9IGFkamFjZW50TG9jYXRpb25zLmZpbmQoKGxvYykgPT4gbG9jLmF0dGFja2VkID09PSAnbm8nKTtcblx0XHR9XG5cblx0XHRpZiAoIXJhbmRvbVBsYXllckxvY2F0aW9uKSB7XG5cdFx0XHRyYW5kb21QbGF5ZXJMb2NhdGlvbiA9IHBsYXllckdhbWVCb2FyZC5maWx0ZXIoKGxvY2F0aW9uKSA9PiBsb2NhdGlvbi5hdHRhY2tlZCA9PT0gJ25vJyk7XG5cdFx0XHRyYW5kb21QbGF5ZXJMb2NhdGlvbiA9IHJhbmRvbVBsYXllckxvY2F0aW9uW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHJhbmRvbVBsYXllckxvY2F0aW9uLmxlbmd0aCldO1xuXHRcdH1cblxuXHRcdC8vIE1hcmsgdGhlIGF0dGFja2VkIGxvY2F0aW9uIGFzICd5ZXMnLlxuXHRcdHJhbmRvbVBsYXllckxvY2F0aW9uLmF0dGFja2VkID0gJ3llcyc7XG5cblx0XHQvLyBTdG9yZSB0aGUgcHJldmlvdXMgY29tcHV0ZXIgYXR0YWNrIGZvciByZWZlcmVuY2UuXG5cdFx0cHJldmlvdXNDb21wdXRlckF0dGFja3MucHVzaChyYW5kb21QbGF5ZXJMb2NhdGlvbik7XG5cdFx0aWYgKHByZXZpb3VzQ29tcHV0ZXJBdHRhY2tzLmxlbmd0aCA+IDQpIHtcblx0XHRcdHByZXZpb3VzQ29tcHV0ZXJBdHRhY2tzLnNoaWZ0KCk7IC8vIEtlZXAgdGhlIGxhc3QgNCBhdHRhY2tzIGluIHRoZSBhcnJheVxuXHRcdH1cblxuXHRcdC8vIEZpbmQgdGhlIGNvcnJlc3BvbmRpbmcgZGl2IG9uIHRoZSBwbGF5ZXIncyBnYW1lIGJvYXJkLlxuXHRcdGNvbnN0IGRpdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHJhbmRvbVBsYXllckxvY2F0aW9uLnggKyByYW5kb21QbGF5ZXJMb2NhdGlvbi55KTtcblxuXHRcdGlmIChyYW5kb21QbGF5ZXJMb2NhdGlvbi5ib2F0ID09PSAnbm9uZScpIHtcblx0XHRcdGRpdi5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnZ3JleSc7XG5cdFx0XHRhbGVydChcIkNvbXB1dGVyJ3MgYXR0YWNrOiBJdCdzIGEgbWlzcyFcIik7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGRpdi5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAncmVkJztcblx0XHRcdGNvbnN0IHNoaXAgPSBwbGF5ZXJTaGlwcy5maW5kKChzKSA9PiBzLm5hbWUgPT09IHJhbmRvbVBsYXllckxvY2F0aW9uLmJvYXQpO1xuXHRcdFx0c2hpcC5oaXQoKTtcblx0XHRcdHNoaXAuaXNTdW5rKCk7XG5cdFx0XHRjaGVja1BsYXllclNoaXBzU3VuaygpOyAvLyBDaGVjayBpZiBwbGF5ZXIncyBzaGlwcyBhcmUgYWxsIHN1bmsgYWZ0ZXIgZWFjaCBhdHRhY2suXG5cdFx0XHQvLyBTdG9yZSB0aGUgcHJldmlvdXMgaGl0IGxvY2F0aW9uIGZvciByZWZlcmVuY2UuXG5cdFx0XHRwcmV2aW91c0hpdHMucHVzaChyYW5kb21QbGF5ZXJMb2NhdGlvbik7XG5cdFx0fVxuXG5cdFx0aWYgKCFnYW1lT3Zlcikge1xuXHRcdFx0Ly8gQWZ0ZXIgaGFuZGxpbmcgY29tcHV0ZXIncyBhdHRhY2ssIGFsbG93IHRoZSBwbGF5ZXIgdG8gbWFrZSB0aGVpciBhdHRhY2suXG5cdFx0fVxuXHR9XG59XG5cbi8vIEhlbHBlciBmdW5jdGlvbiB0byBnZXQgYWRqYWNlbnQgbG9jYXRpb25zXG5mdW5jdGlvbiBnZXRBZGphY2VudExvY2F0aW9ucyh4LCB5KSB7XG5cdGNvbnN0IGFkamFjZW50TG9jYXRpb25zID0gW107XG5cblx0aWYgKHkgPiAxKSB7XG5cdFx0YWRqYWNlbnRMb2NhdGlvbnMucHVzaChwbGF5ZXJHYW1lQm9hcmQuZmluZCgobG9jKSA9PiBsb2MueCA9PT0geCAmJiBsb2MueSA9PT0geSAtIDEpKTtcblx0fVxuXHRpZiAoeSA8IDEwKSB7XG5cdFx0YWRqYWNlbnRMb2NhdGlvbnMucHVzaChwbGF5ZXJHYW1lQm9hcmQuZmluZCgobG9jKSA9PiBsb2MueCA9PT0geCAmJiBsb2MueSA9PT0geSArIDEpKTtcblx0fVxuXHRpZiAoeCA+ICdBJykge1xuXHRcdGFkamFjZW50TG9jYXRpb25zLnB1c2gocGxheWVyR2FtZUJvYXJkLmZpbmQoKGxvYykgPT4gbG9jLnggPT09IFN0cmluZy5mcm9tQ2hhckNvZGUoeC5jaGFyQ29kZUF0KDApIC0gMSkgJiYgbG9jLnkgPT09IHkpKTtcblx0fVxuXHRpZiAoeCA8ICdKJykge1xuXHRcdGFkamFjZW50TG9jYXRpb25zLnB1c2gocGxheWVyR2FtZUJvYXJkLmZpbmQoKGxvYykgPT4gbG9jLnggPT09IFN0cmluZy5mcm9tQ2hhckNvZGUoeC5jaGFyQ29kZUF0KDApICsgMSkgJiYgbG9jLnkgPT09IHkpKTtcblx0fVxuXG5cdHJldHVybiBhZGphY2VudExvY2F0aW9ucztcbn1cblxuXG5cbmZ1bmN0aW9uIGNoZWNrUGxheWVyU2hpcHNTdW5rKCkge1xuXHRjb25zdCBhbGxTdW5rID0gcGxheWVyU2hpcHMuZXZlcnkoKHNoaXApID0+IHNoaXAuc3VuayA9PT0gJ1llcycpO1xuXHRpZiAoYWxsU3Vuaykge1xuXHRcdGFsZXJ0KCdHQU1FIE9WRVIhIENPTVBVVEVSIFdJTlMhJyk7XG5cdFx0Ly8gT3B0aW9uYWxseSwgeW91IGNhbiByZXNldCB0aGUgZ2FtZSBvciBwZXJmb3JtIGFueSBvdGhlciBhY3Rpb25zIGhlcmUuXG5cdH1cbn1cblxuZnVuY3Rpb24gY2hlY2tDb21wdXRlclNoaXBzU3VuaygpIHtcblx0Y29uc3QgYWxsU3VuayA9IGNvbXB1dGVyU2hpcHMuZXZlcnkoKHNoaXApID0+IHNoaXAuc3VuayA9PT0gJ1llcycpO1xuXHRpZiAoYWxsU3Vuaykge1xuXHRcdGFsZXJ0KCdHQU1FIE9WRVIhIFlPVSBXSU4hJyk7XG5cdFx0Ly8gT3B0aW9uYWxseSwgeW91IGNhbiByZXNldCB0aGUgZ2FtZSBvciBwZXJmb3JtIGFueSBvdGhlciBhY3Rpb25zIGhlcmUuXG5cdH1cbn1cblxubGV0IGdhbWVPdmVyID0gZmFsc2U7IC8vIEFkZCB0aGlzIHZhcmlhYmxlIHRvIHRyYWNrIHRoZSBnYW1lIHN0YXRlXG5cbmZ1bmN0aW9uIGhhbmRsZVBsYXllckF0dGFjayhsb2NhdGlvbikge1xuXHRpZiAoIWdhbWVPdmVyICYmIGxvY2F0aW9uLmF0dGFja2VkID09PSAnbm8nKSB7XG5cdFx0bG9jYXRpb24uYXR0YWNrZWQgPSAneWVzJztcblx0XHRjb25zdCBkaXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29tcHV0ZXItJyArIGxvY2F0aW9uLnggKyBsb2NhdGlvbi55KTtcblxuXHRcdGlmIChsb2NhdGlvbi5ib2F0ID09PSAnbm9uZScpIHtcblx0XHRcdGRpdi5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnZ3JleSc7XG5cdFx0XHRhbGVydCgnSXRzIGEgbWlzcyEnKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0ZGl2LnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdyZWQnO1xuXHRcdFx0Y29uc3Qgc2hpcCA9IGNvbXB1dGVyU2hpcHMuZmluZCgocykgPT4gcy5uYW1lID09PSBsb2NhdGlvbi5ib2F0KTtcblx0XHRcdHNoaXAuaGl0KCk7XG5cdFx0XHRzaGlwLmlzU3VuaygpO1xuXHRcdFx0Y2hlY2tDb21wdXRlclNoaXBzU3VuaygpOyAvLyBDaGVjayBpZiBjb21wdXRlcidzIHNoaXBzIGFyZSBhbGwgc3VuayBhZnRlciBlYWNoIGF0dGFjay5cblx0XHR9XG5cblx0XHQvLyBDaGVjayBpZiB0aGUgZ2FtZSBpcyBvdmVyIChhbGwgY29tcHV0ZXIgc2hpcHMgYXJlIHN1bmspXG5cdFx0aWYgKCFnYW1lT3Zlcikge1xuXHRcdFx0Ly8gQWZ0ZXIgaGFuZGxpbmcgcGxheWVyJ3MgYXR0YWNrLCB0cmlnZ2VyIGNvbXB1dGVyJ3MgYXR0YWNrLlxuXHRcdFx0Y29tcHV0ZXJBdHRhY2soKTtcblx0XHR9XG5cdH1cbn1cblxuZnVuY3Rpb24gY2hlY2tDb21wdXRlclNoaXBzU3VuaygpIHtcblx0Y29uc3QgYWxsU3VuayA9IGNvbXB1dGVyU2hpcHMuZXZlcnkoKHNoaXApID0+IHNoaXAuc3VuayA9PT0gJ1llcycpO1xuXHRpZiAoYWxsU3Vuaykge1xuXHRcdGFsZXJ0KCdHQU1FIE9WRVIhIFlPVSBXSU4hJyk7XG5cdFx0Z2FtZU92ZXIgPSB0cnVlOyAvLyBTZXQgdGhlIGdhbWUgb3ZlciBmbGFnIHRvIHRydWVcblx0XHQvLyBPcHRpb25hbGx5LCB5b3UgY2FuIHJlc2V0IHRoZSBnYW1lIG9yIHBlcmZvcm0gYW55IG90aGVyIGFjdGlvbnMgaGVyZS5cblx0fVxufVxuXG4vLyBBZGQgYSBjbGljayBldmVudCBsaXN0ZW5lciB0byBlYWNoIGNvbXB1dGVyIGdhbWUgYm9hcmQgZGl2XG5jb21wdXRlckdhbWVCb2FyZC5mb3JFYWNoKChsb2NhdGlvbikgPT4ge1xuXHRjb25zdCBkaXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29tcHV0ZXItJyArIGxvY2F0aW9uLnggKyBsb2NhdGlvbi55KTtcblx0ZGl2LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuXHRcdGhhbmRsZVBsYXllckF0dGFjayhsb2NhdGlvbik7XG5cdH0pO1xufSk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=