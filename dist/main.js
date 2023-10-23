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

function computerAttack() {
	// Generate a random location to attack on the player's game board.
	const randomPlayerLocation = playerGameBoard.filter(location => location.attacked === 'no');
	const randomIndex = Math.floor(Math.random() * randomPlayerLocation.length);
	const locationToAttack = randomPlayerLocation[randomIndex];
  
	// Mark the attacked location as 'yes'.
	locationToAttack.attacked = 'yes';
  
	// Find the corresponding div on the player's game board.
	const div = document.getElementById(locationToAttack.x + locationToAttack.y);
  
	if (locationToAttack.boat === 'none') {
	  div.style.backgroundColor = 'grey';
	  alert("Computer's attack: It's a miss!");
	} else {
	  div.style.backgroundColor = 'red';
	  const ship = playerShips.find((s) => s.name === locationToAttack.boat);
	  ship.hit();
	  ship.isSunk();
	  checkPlayerShipsSunk(); // Check if player's ships are all sunk after each attack.
	}
  }
  
  
  function checkPlayerShipsSunk() {
	const allSunk = playerShips.every((ship) => ship.sunk === 'Yes');
	if (allSunk) {
	  alert("GAME OVER! COMPUTER WINS!");
	  // Optionally, you can reset the game or perform any other actions here.
	}
  }
  
  function handlePlayerAttack(location) {
	if (location.attacked === 'no') {
	  location.attacked = 'yes';
	  const div = document.getElementById('computer-' + location.x + location.y);
  
	  if (location.boat === 'none') {
		div.style.backgroundColor = 'grey';
		alert("It's a miss!");
	  } else {
		div.style.backgroundColor = 'red';
		const ship = computerShips.find((s) => s.name === location.boat);
		ship.hit();
		ship.isSunk();
	  }
  
	  // After handling player's attack, trigger computer's attack.
	  computerAttack();
	}
  }
  
  
  // Add a click event listener to each computer game board div
  computerGameBoard.forEach((location) => {
	const div = document.getElementById('computer-' + location.x + location.y);
	div.addEventListener('click', () => {
	  handlePlayerAttack(location);
	});
  });
  


console.log(playerGameBoard);
console.log(computerGameBoard);

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxVQUFVO0FBQ1Y7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUNBQWlDLHdCQUF3QjtBQUN6RCxrQkFBa0IsU0FBUztBQUMzQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxVQUFVO0FBQ1Y7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUNBQWlDLHdCQUF3QjtBQUN6RCxrQkFBa0IsU0FBUztBQUMzQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhDQUE4QyxXQUFXO0FBQ3pELHVEQUF1RCxXQUFXO0FBQ2xFO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsV0FBVyxxQkFBcUIsT0FBTyxFQUFFLEVBQUU7QUFDM0Q7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQSxzQkFBc0IsMEJBQTBCO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QiwwQkFBMEI7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLFdBQVcscUJBQXFCLE9BQU8sRUFBRSxFQUFFO0FBQzNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkI7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGLEdBQUc7QUFDSDs7O0FBR0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gY3JlYXRlU2hpcChuYW1lLCBsZW5ndGgsIGhpdHMsIHN1bmspIHtcblx0Y29uc3Qgc2hpcCA9IHt9O1xuXHRzaGlwLm5hbWUgPSBuYW1lO1xuXHRzaGlwLmxlbmd0aCA9IGxlbmd0aDtcblx0c2hpcC5oaXRzID0gaGl0cztcblx0c2hpcC5zdW5rID0gc3Vuaztcblx0c2hpcC5oaXQgPSBmdW5jdGlvbiAoKSB7XG5cdFx0c2hpcC5oaXRzICs9IDE7XG5cdFx0YWxlcnQoc2hpcC5uYW1lICsgJyBoYXMgYmVlbiBoaXQhJyk7XG5cdH07XG5cdHNoaXAuaXNTdW5rID0gZnVuY3Rpb24gKCkge1xuXHRcdGlmIChzaGlwLmhpdHMgPT09IHNoaXAubGVuZ3RoKSB7XG5cdFx0XHRzaGlwLnN1bmsgPSAnWWVzJztcblx0XHRcdGFsZXJ0KHNoaXAubmFtZSArICcgaGFzIGJlZW4gc3VuayEnKTtcblx0XHR9XG5cdH07XG5cdHJldHVybiBzaGlwO1xufVxuXG5jb25zdCBwbGF5ZXJBaXJjcmFmdENhcnJpZXIgPSBjcmVhdGVTaGlwKCdBaXJjcmFmdCBDYXJyaWVyJywgNSwgMCwgJ05vJyk7XG5jb25zdCBwbGF5ZXJCYXR0bGVzaGlwID0gY3JlYXRlU2hpcCgnQmF0dGxlc2hpcCcsIDQsIDAsICdObycpO1xuY29uc3QgcGxheWVyRGVzdHJveWVyID0gY3JlYXRlU2hpcCgnRGVzdHJveWVyJywgNCwgMCwgJ05vJyk7XG5jb25zdCBwbGF5ZXJTdWJtYXJpbmUgPSBjcmVhdGVTaGlwKCdTdWJtYXJpbmUnLCAzLCAwLCAnTm8nKTtcbmNvbnN0IHBsYXllclBhdHJvbEJvYXQgPSBjcmVhdGVTaGlwKCdQYXRyb2wgQm9hdCcsIDIsIDAsICdObycpO1xuXG5jb25zdCBjb21wdXRlckFpcmNyYWZ0Q2FycmllciA9IGNyZWF0ZVNoaXAoJ0FpcmNyYWZ0IENhcnJpZXInLCA1LCAwLCAnTm8nKTtcbmNvbnN0IGNvbXB1dGVyQmF0dGxlc2hpcCA9IGNyZWF0ZVNoaXAoJ0JhdHRsZXNoaXAnLCA0LCAwLCAnTm8nKTtcbmNvbnN0IGNvbXB1dGVyRGVzdHJveWVyID0gY3JlYXRlU2hpcCgnRGVzdHJveWVyJywgNCwgMCwgJ05vJyk7XG5jb25zdCBjb21wdXRlclN1Ym1hcmluZSA9IGNyZWF0ZVNoaXAoJ1N1Ym1hcmluZScsIDMsIDAsICdObycpO1xuY29uc3QgY29tcHV0ZXJQYXRyb2xCb2F0ID0gY3JlYXRlU2hpcCgnUGF0cm9sIEJvYXQnLCAyLCAwLCAnTm8nKTtcblxuZnVuY3Rpb24gY3JlYXRlTG9jYXRpb24oeCwgeSkge1xuXHRyZXR1cm4geyB4LCB5LCBib2F0OiAnbm9uZScsIGF0dGFja2VkOiAnbm8nIH07XG59XG5cbmNvbnN0IGNvbXB1dGVyQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NvbXB1dGVyLWNvbnRhaW5lcicpO1xuXG5mdW5jdGlvbiBjcmVhdGVQbGF5ZXJHYW1lQm9hcmQoKSB7XG5cdGNvbnN0IHBsYXllckdhbWVCb2FyZCA9IFtdO1xuXHRjb25zdCBjb2x1bW5zID0gMTA7XG5cdGNvbnN0IHJvd3MgPSAxMDtcblxuXHRmb3IgKGxldCB4ID0gJ0EnLmNoYXJDb2RlQXQoMCk7IHggPD0gJ0onLmNoYXJDb2RlQXQoMCk7IHgrKykge1xuXHRcdGZvciAobGV0IHkgPSAxOyB5IDw9IDEwOyB5KyspIHtcblx0XHRcdGNvbnN0IGxvY2F0aW9uID0gY3JlYXRlTG9jYXRpb24oU3RyaW5nLmZyb21DaGFyQ29kZSh4KSwgeSk7XG5cdFx0XHRwbGF5ZXJHYW1lQm9hcmQucHVzaChsb2NhdGlvbik7XG5cblx0XHRcdGNvbnN0IHBsYXllckNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwbGF5ZXItY29udGFpbmVyJyk7XG5cdFx0XHRjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0XHRcdGRpdi5pZCA9IFN0cmluZy5mcm9tQ2hhckNvZGUoeCkgKyB5O1xuXHRcdFx0ZGl2LmNsYXNzTGlzdC5hZGQoJ2xvY2F0aW9uJyk7XG5cdFx0XHRwbGF5ZXJDb250YWluZXIuYXBwZW5kQ2hpbGQoZGl2KTtcblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gcGxheWVyR2FtZUJvYXJkO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVDb21wdXRlckxvY2F0aW9uKHgsIHkpIHtcblx0cmV0dXJuIHsgeCwgeSwgYm9hdDogJ25vbmUnLCBhdHRhY2tlZDogJ25vJyB9O1xufVxuXG5mdW5jdGlvbiBjcmVhdGVDb21wdXRlckdhbWVCb2FyZCgpIHtcblx0Y29uc3QgY29tcHV0ZXJHYW1lQm9hcmQgPSBbXTtcblx0Y29uc3QgY29sdW1ucyA9IDEwO1xuXHRjb25zdCByb3dzID0gMTA7XG5cblx0Zm9yIChsZXQgeCA9ICdBJy5jaGFyQ29kZUF0KDApOyB4IDw9ICdKJy5jaGFyQ29kZUF0KDApOyB4KyspIHtcblx0XHRmb3IgKGxldCB5ID0gMTsgeSA8PSAxMDsgeSsrKSB7XG5cdFx0XHRjb25zdCBsb2NhdGlvbiA9IGNyZWF0ZUNvbXB1dGVyTG9jYXRpb24oU3RyaW5nLmZyb21DaGFyQ29kZSh4KSwgeSk7XG5cdFx0XHRjb21wdXRlckdhbWVCb2FyZC5wdXNoKGxvY2F0aW9uKTtcblxuXHRcdFx0Y29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdFx0XHRkaXYuaWQgPSAnY29tcHV0ZXItJyArIFN0cmluZy5mcm9tQ2hhckNvZGUoeCkgKyB5O1xuXHRcdFx0ZGl2LmNsYXNzTGlzdC5hZGQoJ2xvY2F0aW9uJyk7XG5cdFx0XHRjb21wdXRlckNvbnRhaW5lci5hcHBlbmRDaGlsZChkaXYpO1xuXHRcdH1cblx0fVxuXG5cdHJldHVybiBjb21wdXRlckdhbWVCb2FyZDtcbn1cblxuY29uc3QgcGxheWVyR2FtZUJvYXJkID0gY3JlYXRlUGxheWVyR2FtZUJvYXJkKCk7XG5jb25zdCBjb21wdXRlckdhbWVCb2FyZCA9IGNyZWF0ZUNvbXB1dGVyR2FtZUJvYXJkKCk7XG5cbmZ1bmN0aW9uIHJhbmRvbUNvb3JkaW5hdGUoKSB7XG5cdGNvbnN0IHggPSBTdHJpbmcuZnJvbUNoYXJDb2RlKFxuXHRcdE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKSArICdBJy5jaGFyQ29kZUF0KDApXG5cdCk7XG5cdGNvbnN0IHkgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCkgKyAxO1xuXHRyZXR1cm4geyB4LCB5IH07XG59XG5cbmZ1bmN0aW9uIHBsYWNlQ29tcHV0ZXJTaGlwcyhjb21wdXRlckdhbWVCb2FyZCwgc2hpcHMpIHtcblx0Zm9yIChjb25zdCBzaGlwIG9mIHNoaXBzKSB7XG5cdFx0bGV0IHZhbGlkUGxhY2VtZW50ID0gZmFsc2U7XG5cdFx0d2hpbGUgKCF2YWxpZFBsYWNlbWVudCkge1xuXHRcdFx0Y29uc3QgeyB4LCB5IH0gPSByYW5kb21Db29yZGluYXRlKCk7XG5cdFx0XHRpZiAoeC5jaGFyQ29kZUF0KDApICsgc2hpcC5sZW5ndGggLSAxIDw9ICdKJy5jaGFyQ29kZUF0KDApKSB7XG5cdFx0XHRcdGxldCBjYW5QbGFjZVNoaXAgPSB0cnVlO1xuXHRcdFx0XHRmb3IgKFxuXHRcdFx0XHRcdGxldCBpID0geC5jaGFyQ29kZUF0KDApO1xuXHRcdFx0XHRcdGkgPD0geC5jaGFyQ29kZUF0KDApICsgc2hpcC5sZW5ndGggLSAxO1xuXHRcdFx0XHRcdGkrK1xuXHRcdFx0XHQpIHtcblx0XHRcdFx0XHRjb25zdCBsb2NhdGlvblRvQ2hlY2sgPSBjb21wdXRlckdhbWVCb2FyZC5maW5kKFxuXHRcdFx0XHRcdFx0KGxvYykgPT4gbG9jLnggPT09IFN0cmluZy5mcm9tQ2hhckNvZGUoaSkgJiYgbG9jLnkgPT09IHlcblx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdGlmIChsb2NhdGlvblRvQ2hlY2suYm9hdCAhPT0gJ25vbmUnKSB7XG5cdFx0XHRcdFx0XHRjYW5QbGFjZVNoaXAgPSBmYWxzZTtcblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAoY2FuUGxhY2VTaGlwKSB7XG5cdFx0XHRcdFx0Zm9yIChcblx0XHRcdFx0XHRcdGxldCBpID0geC5jaGFyQ29kZUF0KDApO1xuXHRcdFx0XHRcdFx0aSA8PSB4LmNoYXJDb2RlQXQoMCkgKyBzaGlwLmxlbmd0aCAtIDE7XG5cdFx0XHRcdFx0XHRpKytcblx0XHRcdFx0XHQpIHtcblx0XHRcdFx0XHRcdGNvbnN0IGxvY2F0aW9uVG9QbGFjZSA9IGNvbXB1dGVyR2FtZUJvYXJkLmZpbmQoXG5cdFx0XHRcdFx0XHRcdChsb2MpID0+IGxvYy54ID09PSBTdHJpbmcuZnJvbUNoYXJDb2RlKGkpICYmIGxvYy55ID09PSB5XG5cdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdFx0bG9jYXRpb25Ub1BsYWNlLmJvYXQgPSBzaGlwLm5hbWU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHZhbGlkUGxhY2VtZW50ID0gdHJ1ZTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxufVxuXG5jb25zdCBjb21wdXRlclNoaXBzID0gW1xuXHRjb21wdXRlckFpcmNyYWZ0Q2Fycmllcixcblx0Y29tcHV0ZXJCYXR0bGVzaGlwLFxuXHRjb21wdXRlckRlc3Ryb3llcixcblx0Y29tcHV0ZXJTdWJtYXJpbmUsXG5cdGNvbXB1dGVyUGF0cm9sQm9hdCxcbl07XG5cbnBsYWNlQ29tcHV0ZXJTaGlwcyhjb21wdXRlckdhbWVCb2FyZCwgY29tcHV0ZXJTaGlwcyk7XG5cbmZ1bmN0aW9uIHBsYWNlUGxheWVyU2hpcHMocGxheWVyR2FtZUJvYXJkLCBzaGlwcykge1xuXHRmb3IgKGNvbnN0IHNoaXAgb2Ygc2hpcHMpIHtcblx0XHRsZXQgdmFsaWRQbGFjZW1lbnQgPSBmYWxzZTtcblxuXHRcdHdoaWxlICghdmFsaWRQbGFjZW1lbnQpIHtcblx0XHRcdGNvbnN0IHggPSBwcm9tcHQoYEVudGVyIHgtY29vcmRpbmF0ZSBmb3IgJHtzaGlwLm5hbWV9IChBLUopOmApO1xuXHRcdFx0Y29uc3QgeSA9IHBhcnNlSW50KHByb21wdChgRW50ZXIgeS1jb29yZGluYXRlIGZvciAke3NoaXAubmFtZX0gKDEtMTApOmApKTtcblx0XHRcdGNvbnN0IGhvcml6b250YWwgPSBjb25maXJtKFxuXHRcdFx0XHRgRG8geW91IHdhbnQgdG8gcGxhY2UgdGhlIHNoaXAgdmVydGljYWxseT8gKE9LIGZvciBZZXMsIENhbmNlbCBmb3IgTm8pYFxuXHRcdFx0KTtcblxuXHRcdFx0aWYgKHggPj0gJ0EnICYmIHggPD0gJ0onICYmIHkgPj0gMSAmJiB5IDw9IDEwKSB7XG5cdFx0XHRcdGNvbnN0IHhVcHBlciA9IHgudG9VcHBlckNhc2UoKTtcblxuXHRcdFx0XHRpZiAoaG9yaXpvbnRhbCkge1xuXHRcdFx0XHRcdC8vIENoZWNrIGlmIHRoZXJlJ3MgZW5vdWdoIHNwYWNlIHRvIHBsYWNlIHRoZSBzaGlwIGhvcml6b250YWxseVxuXHRcdFx0XHRcdGlmICh4VXBwZXIuY2hhckNvZGVBdCgwKSArIHNoaXAubGVuZ3RoIC0gMSA8PSAnSicuY2hhckNvZGVBdCgwKSkge1xuXHRcdFx0XHRcdFx0bGV0IGNhblBsYWNlU2hpcCA9IHRydWU7XG5cdFx0XHRcdFx0XHRmb3IgKFxuXHRcdFx0XHRcdFx0XHRsZXQgaSA9IHhVcHBlci5jaGFyQ29kZUF0KDApO1xuXHRcdFx0XHRcdFx0XHRpIDw9IHhVcHBlci5jaGFyQ29kZUF0KDApICsgc2hpcC5sZW5ndGggLSAxO1xuXHRcdFx0XHRcdFx0XHRpKytcblx0XHRcdFx0XHRcdCkge1xuXHRcdFx0XHRcdFx0XHRjb25zdCBsb2NhdGlvblRvQ2hlY2sgPSBwbGF5ZXJHYW1lQm9hcmQuZmluZChcblx0XHRcdFx0XHRcdFx0XHQobG9jKSA9PiBsb2MueCA9PT0gU3RyaW5nLmZyb21DaGFyQ29kZShpKSAmJiBsb2MueSA9PT0geVxuXHRcdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdFx0XHRpZiAobG9jYXRpb25Ub0NoZWNrLmJvYXQgIT09ICdub25lJykge1xuXHRcdFx0XHRcdFx0XHRcdGNhblBsYWNlU2hpcCA9IGZhbHNlO1xuXHRcdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRpZiAoY2FuUGxhY2VTaGlwKSB7XG5cdFx0XHRcdFx0XHRcdGZvciAoXG5cdFx0XHRcdFx0XHRcdFx0bGV0IGkgPSB4VXBwZXIuY2hhckNvZGVBdCgwKTtcblx0XHRcdFx0XHRcdFx0XHRpIDw9IHhVcHBlci5jaGFyQ29kZUF0KDApICsgc2hpcC5sZW5ndGggLSAxO1xuXHRcdFx0XHRcdFx0XHRcdGkrK1xuXHRcdFx0XHRcdFx0XHQpIHtcblx0XHRcdFx0XHRcdFx0XHRjb25zdCBsb2NhdGlvblRvUGxhY2UgPSBwbGF5ZXJHYW1lQm9hcmQuZmluZChcblx0XHRcdFx0XHRcdFx0XHRcdChsb2MpID0+IGxvYy54ID09PSBTdHJpbmcuZnJvbUNoYXJDb2RlKGkpICYmIGxvYy55ID09PSB5XG5cdFx0XHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRcdFx0XHRsb2NhdGlvblRvUGxhY2UuYm9hdCA9IHNoaXAubmFtZTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR2YWxpZFBsYWNlbWVudCA9IHRydWU7XG5cdFx0XHRcdFx0XHRcdGFsZXJ0KGAke3NoaXAubmFtZX0gaGFzIGJlZW4gcGxhY2VkIGF0ICR7eFVwcGVyfSR7eX1gKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0Ly8gQ2hlY2sgaWYgdGhlcmUncyBlbm91Z2ggc3BhY2UgdG8gcGxhY2UgdGhlIHNoaXAgdmVydGljYWxseVxuXHRcdFx0XHRcdGlmICh5ICsgc2hpcC5sZW5ndGggLSAxIDw9IDEwKSB7XG5cdFx0XHRcdFx0XHRsZXQgY2FuUGxhY2VTaGlwID0gdHJ1ZTtcblx0XHRcdFx0XHRcdGZvciAobGV0IGkgPSB5OyBpIDw9IHkgKyBzaGlwLmxlbmd0aCAtIDE7IGkrKykge1xuXHRcdFx0XHRcdFx0XHRjb25zdCBsb2NhdGlvblRvQ2hlY2sgPSBwbGF5ZXJHYW1lQm9hcmQuZmluZChcblx0XHRcdFx0XHRcdFx0XHQobG9jKSA9PiBsb2MueCA9PT0geFVwcGVyICYmIGxvYy55ID09PSBpXG5cdFx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0XHRcdGlmIChsb2NhdGlvblRvQ2hlY2suYm9hdCAhPT0gJ25vbmUnKSB7XG5cdFx0XHRcdFx0XHRcdFx0Y2FuUGxhY2VTaGlwID0gZmFsc2U7XG5cdFx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGlmIChjYW5QbGFjZVNoaXApIHtcblx0XHRcdFx0XHRcdFx0Zm9yIChsZXQgaSA9IHk7IGkgPD0geSArIHNoaXAubGVuZ3RoIC0gMTsgaSsrKSB7XG5cdFx0XHRcdFx0XHRcdFx0Y29uc3QgbG9jYXRpb25Ub1BsYWNlID0gcGxheWVyR2FtZUJvYXJkLmZpbmQoXG5cdFx0XHRcdFx0XHRcdFx0XHQobG9jKSA9PiBsb2MueCA9PT0geFVwcGVyICYmIGxvYy55ID09PSBpXG5cdFx0XHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRcdFx0XHRsb2NhdGlvblRvUGxhY2UuYm9hdCA9IHNoaXAubmFtZTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR2YWxpZFBsYWNlbWVudCA9IHRydWU7XG5cdFx0XHRcdFx0XHRcdGFsZXJ0KGAke3NoaXAubmFtZX0gaGFzIGJlZW4gcGxhY2VkIGF0ICR7eFVwcGVyfSR7eX1gKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cbn1cblxuLy8gQ3JlYXRlIGFuIGFycmF5IG9mIHBsYXllciBzaGlwc1xuY29uc3QgcGxheWVyU2hpcHMgPSBbXG5cdHBsYXllckFpcmNyYWZ0Q2Fycmllcixcblx0cGxheWVyQmF0dGxlc2hpcCxcblx0cGxheWVyRGVzdHJveWVyLFxuXHRwbGF5ZXJTdWJtYXJpbmUsXG5cdHBsYXllclBhdHJvbEJvYXQsXG5dO1xuXG4vLyBQcm9tcHQgdGhlIHBsYXllciB0byBwbGFjZSBlYWNoIHNoaXBcbnBsYWNlUGxheWVyU2hpcHMocGxheWVyR2FtZUJvYXJkLCBwbGF5ZXJTaGlwcyk7XG5cbmZ1bmN0aW9uIGNvbXB1dGVyQXR0YWNrKCkge1xuXHQvLyBHZW5lcmF0ZSBhIHJhbmRvbSBsb2NhdGlvbiB0byBhdHRhY2sgb24gdGhlIHBsYXllcidzIGdhbWUgYm9hcmQuXG5cdGNvbnN0IHJhbmRvbVBsYXllckxvY2F0aW9uID0gcGxheWVyR2FtZUJvYXJkLmZpbHRlcihsb2NhdGlvbiA9PiBsb2NhdGlvbi5hdHRhY2tlZCA9PT0gJ25vJyk7XG5cdGNvbnN0IHJhbmRvbUluZGV4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogcmFuZG9tUGxheWVyTG9jYXRpb24ubGVuZ3RoKTtcblx0Y29uc3QgbG9jYXRpb25Ub0F0dGFjayA9IHJhbmRvbVBsYXllckxvY2F0aW9uW3JhbmRvbUluZGV4XTtcbiAgXG5cdC8vIE1hcmsgdGhlIGF0dGFja2VkIGxvY2F0aW9uIGFzICd5ZXMnLlxuXHRsb2NhdGlvblRvQXR0YWNrLmF0dGFja2VkID0gJ3llcyc7XG4gIFxuXHQvLyBGaW5kIHRoZSBjb3JyZXNwb25kaW5nIGRpdiBvbiB0aGUgcGxheWVyJ3MgZ2FtZSBib2FyZC5cblx0Y29uc3QgZGl2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQobG9jYXRpb25Ub0F0dGFjay54ICsgbG9jYXRpb25Ub0F0dGFjay55KTtcbiAgXG5cdGlmIChsb2NhdGlvblRvQXR0YWNrLmJvYXQgPT09ICdub25lJykge1xuXHQgIGRpdi5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnZ3JleSc7XG5cdCAgYWxlcnQoXCJDb21wdXRlcidzIGF0dGFjazogSXQncyBhIG1pc3MhXCIpO1xuXHR9IGVsc2Uge1xuXHQgIGRpdi5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAncmVkJztcblx0ICBjb25zdCBzaGlwID0gcGxheWVyU2hpcHMuZmluZCgocykgPT4gcy5uYW1lID09PSBsb2NhdGlvblRvQXR0YWNrLmJvYXQpO1xuXHQgIHNoaXAuaGl0KCk7XG5cdCAgc2hpcC5pc1N1bmsoKTtcblx0ICBjaGVja1BsYXllclNoaXBzU3VuaygpOyAvLyBDaGVjayBpZiBwbGF5ZXIncyBzaGlwcyBhcmUgYWxsIHN1bmsgYWZ0ZXIgZWFjaCBhdHRhY2suXG5cdH1cbiAgfVxuICBcbiAgXG4gIGZ1bmN0aW9uIGNoZWNrUGxheWVyU2hpcHNTdW5rKCkge1xuXHRjb25zdCBhbGxTdW5rID0gcGxheWVyU2hpcHMuZXZlcnkoKHNoaXApID0+IHNoaXAuc3VuayA9PT0gJ1llcycpO1xuXHRpZiAoYWxsU3Vuaykge1xuXHQgIGFsZXJ0KFwiR0FNRSBPVkVSISBDT01QVVRFUiBXSU5TIVwiKTtcblx0ICAvLyBPcHRpb25hbGx5LCB5b3UgY2FuIHJlc2V0IHRoZSBnYW1lIG9yIHBlcmZvcm0gYW55IG90aGVyIGFjdGlvbnMgaGVyZS5cblx0fVxuICB9XG4gIFxuICBmdW5jdGlvbiBoYW5kbGVQbGF5ZXJBdHRhY2sobG9jYXRpb24pIHtcblx0aWYgKGxvY2F0aW9uLmF0dGFja2VkID09PSAnbm8nKSB7XG5cdCAgbG9jYXRpb24uYXR0YWNrZWQgPSAneWVzJztcblx0ICBjb25zdCBkaXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29tcHV0ZXItJyArIGxvY2F0aW9uLnggKyBsb2NhdGlvbi55KTtcbiAgXG5cdCAgaWYgKGxvY2F0aW9uLmJvYXQgPT09ICdub25lJykge1xuXHRcdGRpdi5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnZ3JleSc7XG5cdFx0YWxlcnQoXCJJdCdzIGEgbWlzcyFcIik7XG5cdCAgfSBlbHNlIHtcblx0XHRkaXYuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ3JlZCc7XG5cdFx0Y29uc3Qgc2hpcCA9IGNvbXB1dGVyU2hpcHMuZmluZCgocykgPT4gcy5uYW1lID09PSBsb2NhdGlvbi5ib2F0KTtcblx0XHRzaGlwLmhpdCgpO1xuXHRcdHNoaXAuaXNTdW5rKCk7XG5cdCAgfVxuICBcblx0ICAvLyBBZnRlciBoYW5kbGluZyBwbGF5ZXIncyBhdHRhY2ssIHRyaWdnZXIgY29tcHV0ZXIncyBhdHRhY2suXG5cdCAgY29tcHV0ZXJBdHRhY2soKTtcblx0fVxuICB9XG4gIFxuICBcbiAgLy8gQWRkIGEgY2xpY2sgZXZlbnQgbGlzdGVuZXIgdG8gZWFjaCBjb21wdXRlciBnYW1lIGJvYXJkIGRpdlxuICBjb21wdXRlckdhbWVCb2FyZC5mb3JFYWNoKChsb2NhdGlvbikgPT4ge1xuXHRjb25zdCBkaXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29tcHV0ZXItJyArIGxvY2F0aW9uLnggKyBsb2NhdGlvbi55KTtcblx0ZGl2LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuXHQgIGhhbmRsZVBsYXllckF0dGFjayhsb2NhdGlvbik7XG5cdH0pO1xuICB9KTtcbiAgXG5cblxuY29uc29sZS5sb2cocGxheWVyR2FtZUJvYXJkKTtcbmNvbnNvbGUubG9nKGNvbXB1dGVyR2FtZUJvYXJkKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==