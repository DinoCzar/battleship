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
	if (!gameOver) {
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
  
	  // Check if the game is over (all player ships are sunk)
	  if (!gameOver) {
		// After handling computer's attack, allow the player to make their attack.
		// The player will be able to attack only if the game is not over.
		// For example, you can trigger the player's attack by enabling a button or other UI interaction.
	  }
	}
  }
  
  
  function checkPlayerShipsSunk() {
	const allSunk = playerShips.every((ship) => ship.sunk === 'Yes');
	if (allSunk) {
	  alert("GAME OVER! COMPUTER WINS!");
	  // Optionally, you can reset the game or perform any other actions here.
	}
  }

  function checkComputerShipsSunk() {
	const allSunk = computerShips.every((ship) => ship.sunk === 'Yes');
	if (allSunk) {
	  alert("GAME OVER! YOU WIN!");
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
		alert("It's a miss!");
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
	  alert("GAME OVER! YOU WIN!");
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
  


console.log(playerGameBoard);
console.log(computerGameBoard);
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxVQUFVO0FBQ1Y7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUNBQWlDLHdCQUF3QjtBQUN6RCxrQkFBa0IsU0FBUztBQUMzQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxVQUFVO0FBQ1Y7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUNBQWlDLHdCQUF3QjtBQUN6RCxrQkFBa0IsU0FBUztBQUMzQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhDQUE4QyxXQUFXO0FBQ3pELHVEQUF1RCxXQUFXO0FBQ2xFO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsV0FBVyxxQkFBcUIsT0FBTyxFQUFFLEVBQUU7QUFDM0Q7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQSxzQkFBc0IsMEJBQTBCO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QiwwQkFBMEI7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLFdBQVcscUJBQXFCLE9BQU8sRUFBRSxFQUFFO0FBQzNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQjtBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCOztBQUV4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0I7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRixHQUFHO0FBQ0g7OztBQUdBO0FBQ0EsK0IiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIGNyZWF0ZVNoaXAobmFtZSwgbGVuZ3RoLCBoaXRzLCBzdW5rKSB7XG5cdGNvbnN0IHNoaXAgPSB7fTtcblx0c2hpcC5uYW1lID0gbmFtZTtcblx0c2hpcC5sZW5ndGggPSBsZW5ndGg7XG5cdHNoaXAuaGl0cyA9IGhpdHM7XG5cdHNoaXAuc3VuayA9IHN1bms7XG5cdHNoaXAuaGl0ID0gZnVuY3Rpb24gKCkge1xuXHRcdHNoaXAuaGl0cyArPSAxO1xuXHRcdGFsZXJ0KHNoaXAubmFtZSArICcgaGFzIGJlZW4gaGl0IScpO1xuXHR9O1xuXHRzaGlwLmlzU3VuayA9IGZ1bmN0aW9uICgpIHtcblx0XHRpZiAoc2hpcC5oaXRzID09PSBzaGlwLmxlbmd0aCkge1xuXHRcdFx0c2hpcC5zdW5rID0gJ1llcyc7XG5cdFx0XHRhbGVydChzaGlwLm5hbWUgKyAnIGhhcyBiZWVuIHN1bmshJyk7XG5cdFx0fVxuXHR9O1xuXHRyZXR1cm4gc2hpcDtcbn1cblxuY29uc3QgcGxheWVyQWlyY3JhZnRDYXJyaWVyID0gY3JlYXRlU2hpcCgnQWlyY3JhZnQgQ2FycmllcicsIDUsIDAsICdObycpO1xuY29uc3QgcGxheWVyQmF0dGxlc2hpcCA9IGNyZWF0ZVNoaXAoJ0JhdHRsZXNoaXAnLCA0LCAwLCAnTm8nKTtcbmNvbnN0IHBsYXllckRlc3Ryb3llciA9IGNyZWF0ZVNoaXAoJ0Rlc3Ryb3llcicsIDQsIDAsICdObycpO1xuY29uc3QgcGxheWVyU3VibWFyaW5lID0gY3JlYXRlU2hpcCgnU3VibWFyaW5lJywgMywgMCwgJ05vJyk7XG5jb25zdCBwbGF5ZXJQYXRyb2xCb2F0ID0gY3JlYXRlU2hpcCgnUGF0cm9sIEJvYXQnLCAyLCAwLCAnTm8nKTtcblxuY29uc3QgY29tcHV0ZXJBaXJjcmFmdENhcnJpZXIgPSBjcmVhdGVTaGlwKCdBaXJjcmFmdCBDYXJyaWVyJywgNSwgMCwgJ05vJyk7XG5jb25zdCBjb21wdXRlckJhdHRsZXNoaXAgPSBjcmVhdGVTaGlwKCdCYXR0bGVzaGlwJywgNCwgMCwgJ05vJyk7XG5jb25zdCBjb21wdXRlckRlc3Ryb3llciA9IGNyZWF0ZVNoaXAoJ0Rlc3Ryb3llcicsIDQsIDAsICdObycpO1xuY29uc3QgY29tcHV0ZXJTdWJtYXJpbmUgPSBjcmVhdGVTaGlwKCdTdWJtYXJpbmUnLCAzLCAwLCAnTm8nKTtcbmNvbnN0IGNvbXB1dGVyUGF0cm9sQm9hdCA9IGNyZWF0ZVNoaXAoJ1BhdHJvbCBCb2F0JywgMiwgMCwgJ05vJyk7XG5cbmZ1bmN0aW9uIGNyZWF0ZUxvY2F0aW9uKHgsIHkpIHtcblx0cmV0dXJuIHsgeCwgeSwgYm9hdDogJ25vbmUnLCBhdHRhY2tlZDogJ25vJyB9O1xufVxuXG5jb25zdCBjb21wdXRlckNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjb21wdXRlci1jb250YWluZXInKTtcblxuZnVuY3Rpb24gY3JlYXRlUGxheWVyR2FtZUJvYXJkKCkge1xuXHRjb25zdCBwbGF5ZXJHYW1lQm9hcmQgPSBbXTtcblx0Y29uc3QgY29sdW1ucyA9IDEwO1xuXHRjb25zdCByb3dzID0gMTA7XG5cblx0Zm9yIChsZXQgeCA9ICdBJy5jaGFyQ29kZUF0KDApOyB4IDw9ICdKJy5jaGFyQ29kZUF0KDApOyB4KyspIHtcblx0XHRmb3IgKGxldCB5ID0gMTsgeSA8PSAxMDsgeSsrKSB7XG5cdFx0XHRjb25zdCBsb2NhdGlvbiA9IGNyZWF0ZUxvY2F0aW9uKFN0cmluZy5mcm9tQ2hhckNvZGUoeCksIHkpO1xuXHRcdFx0cGxheWVyR2FtZUJvYXJkLnB1c2gobG9jYXRpb24pO1xuXG5cdFx0XHRjb25zdCBwbGF5ZXJDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcGxheWVyLWNvbnRhaW5lcicpO1xuXHRcdFx0Y29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdFx0XHRkaXYuaWQgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKHgpICsgeTtcblx0XHRcdGRpdi5jbGFzc0xpc3QuYWRkKCdsb2NhdGlvbicpO1xuXHRcdFx0cGxheWVyQ29udGFpbmVyLmFwcGVuZENoaWxkKGRpdik7XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIHBsYXllckdhbWVCb2FyZDtcbn1cblxuZnVuY3Rpb24gY3JlYXRlQ29tcHV0ZXJMb2NhdGlvbih4LCB5KSB7XG5cdHJldHVybiB7IHgsIHksIGJvYXQ6ICdub25lJywgYXR0YWNrZWQ6ICdubycgfTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlQ29tcHV0ZXJHYW1lQm9hcmQoKSB7XG5cdGNvbnN0IGNvbXB1dGVyR2FtZUJvYXJkID0gW107XG5cdGNvbnN0IGNvbHVtbnMgPSAxMDtcblx0Y29uc3Qgcm93cyA9IDEwO1xuXG5cdGZvciAobGV0IHggPSAnQScuY2hhckNvZGVBdCgwKTsgeCA8PSAnSicuY2hhckNvZGVBdCgwKTsgeCsrKSB7XG5cdFx0Zm9yIChsZXQgeSA9IDE7IHkgPD0gMTA7IHkrKykge1xuXHRcdFx0Y29uc3QgbG9jYXRpb24gPSBjcmVhdGVDb21wdXRlckxvY2F0aW9uKFN0cmluZy5mcm9tQ2hhckNvZGUoeCksIHkpO1xuXHRcdFx0Y29tcHV0ZXJHYW1lQm9hcmQucHVzaChsb2NhdGlvbik7XG5cblx0XHRcdGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHRcdFx0ZGl2LmlkID0gJ2NvbXB1dGVyLScgKyBTdHJpbmcuZnJvbUNoYXJDb2RlKHgpICsgeTtcblx0XHRcdGRpdi5jbGFzc0xpc3QuYWRkKCdsb2NhdGlvbicpO1xuXHRcdFx0Y29tcHV0ZXJDb250YWluZXIuYXBwZW5kQ2hpbGQoZGl2KTtcblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gY29tcHV0ZXJHYW1lQm9hcmQ7XG59XG5cbmNvbnN0IHBsYXllckdhbWVCb2FyZCA9IGNyZWF0ZVBsYXllckdhbWVCb2FyZCgpO1xuY29uc3QgY29tcHV0ZXJHYW1lQm9hcmQgPSBjcmVhdGVDb21wdXRlckdhbWVCb2FyZCgpO1xuXG5mdW5jdGlvbiByYW5kb21Db29yZGluYXRlKCkge1xuXHRjb25zdCB4ID0gU3RyaW5nLmZyb21DaGFyQ29kZShcblx0XHRNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCkgKyAnQScuY2hhckNvZGVBdCgwKVxuXHQpO1xuXHRjb25zdCB5ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApICsgMTtcblx0cmV0dXJuIHsgeCwgeSB9O1xufVxuXG5mdW5jdGlvbiBwbGFjZUNvbXB1dGVyU2hpcHMoY29tcHV0ZXJHYW1lQm9hcmQsIHNoaXBzKSB7XG5cdGZvciAoY29uc3Qgc2hpcCBvZiBzaGlwcykge1xuXHRcdGxldCB2YWxpZFBsYWNlbWVudCA9IGZhbHNlO1xuXHRcdHdoaWxlICghdmFsaWRQbGFjZW1lbnQpIHtcblx0XHRcdGNvbnN0IHsgeCwgeSB9ID0gcmFuZG9tQ29vcmRpbmF0ZSgpO1xuXHRcdFx0aWYgKHguY2hhckNvZGVBdCgwKSArIHNoaXAubGVuZ3RoIC0gMSA8PSAnSicuY2hhckNvZGVBdCgwKSkge1xuXHRcdFx0XHRsZXQgY2FuUGxhY2VTaGlwID0gdHJ1ZTtcblx0XHRcdFx0Zm9yIChcblx0XHRcdFx0XHRsZXQgaSA9IHguY2hhckNvZGVBdCgwKTtcblx0XHRcdFx0XHRpIDw9IHguY2hhckNvZGVBdCgwKSArIHNoaXAubGVuZ3RoIC0gMTtcblx0XHRcdFx0XHRpKytcblx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0Y29uc3QgbG9jYXRpb25Ub0NoZWNrID0gY29tcHV0ZXJHYW1lQm9hcmQuZmluZChcblx0XHRcdFx0XHRcdChsb2MpID0+IGxvYy54ID09PSBTdHJpbmcuZnJvbUNoYXJDb2RlKGkpICYmIGxvYy55ID09PSB5XG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRpZiAobG9jYXRpb25Ub0NoZWNrLmJvYXQgIT09ICdub25lJykge1xuXHRcdFx0XHRcdFx0Y2FuUGxhY2VTaGlwID0gZmFsc2U7XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKGNhblBsYWNlU2hpcCkge1xuXHRcdFx0XHRcdGZvciAoXG5cdFx0XHRcdFx0XHRsZXQgaSA9IHguY2hhckNvZGVBdCgwKTtcblx0XHRcdFx0XHRcdGkgPD0geC5jaGFyQ29kZUF0KDApICsgc2hpcC5sZW5ndGggLSAxO1xuXHRcdFx0XHRcdFx0aSsrXG5cdFx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0XHRjb25zdCBsb2NhdGlvblRvUGxhY2UgPSBjb21wdXRlckdhbWVCb2FyZC5maW5kKFxuXHRcdFx0XHRcdFx0XHQobG9jKSA9PiBsb2MueCA9PT0gU3RyaW5nLmZyb21DaGFyQ29kZShpKSAmJiBsb2MueSA9PT0geVxuXHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRcdGxvY2F0aW9uVG9QbGFjZS5ib2F0ID0gc2hpcC5uYW1lO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHR2YWxpZFBsYWNlbWVudCA9IHRydWU7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cbn1cblxuY29uc3QgY29tcHV0ZXJTaGlwcyA9IFtcblx0Y29tcHV0ZXJBaXJjcmFmdENhcnJpZXIsXG5cdGNvbXB1dGVyQmF0dGxlc2hpcCxcblx0Y29tcHV0ZXJEZXN0cm95ZXIsXG5cdGNvbXB1dGVyU3VibWFyaW5lLFxuXHRjb21wdXRlclBhdHJvbEJvYXQsXG5dO1xuXG5wbGFjZUNvbXB1dGVyU2hpcHMoY29tcHV0ZXJHYW1lQm9hcmQsIGNvbXB1dGVyU2hpcHMpO1xuXG5mdW5jdGlvbiBwbGFjZVBsYXllclNoaXBzKHBsYXllckdhbWVCb2FyZCwgc2hpcHMpIHtcblx0Zm9yIChjb25zdCBzaGlwIG9mIHNoaXBzKSB7XG5cdFx0bGV0IHZhbGlkUGxhY2VtZW50ID0gZmFsc2U7XG5cblx0XHR3aGlsZSAoIXZhbGlkUGxhY2VtZW50KSB7XG5cdFx0XHRjb25zdCB4ID0gcHJvbXB0KGBFbnRlciB4LWNvb3JkaW5hdGUgZm9yICR7c2hpcC5uYW1lfSAoQS1KKTpgKTtcblx0XHRcdGNvbnN0IHkgPSBwYXJzZUludChwcm9tcHQoYEVudGVyIHktY29vcmRpbmF0ZSBmb3IgJHtzaGlwLm5hbWV9ICgxLTEwKTpgKSk7XG5cdFx0XHRjb25zdCBob3Jpem9udGFsID0gY29uZmlybShcblx0XHRcdFx0YERvIHlvdSB3YW50IHRvIHBsYWNlIHRoZSBzaGlwIHZlcnRpY2FsbHk/IChPSyBmb3IgWWVzLCBDYW5jZWwgZm9yIE5vKWBcblx0XHRcdCk7XG5cblx0XHRcdGlmICh4ID49ICdBJyAmJiB4IDw9ICdKJyAmJiB5ID49IDEgJiYgeSA8PSAxMCkge1xuXHRcdFx0XHRjb25zdCB4VXBwZXIgPSB4LnRvVXBwZXJDYXNlKCk7XG5cblx0XHRcdFx0aWYgKGhvcml6b250YWwpIHtcblx0XHRcdFx0XHQvLyBDaGVjayBpZiB0aGVyZSdzIGVub3VnaCBzcGFjZSB0byBwbGFjZSB0aGUgc2hpcCBob3Jpem9udGFsbHlcblx0XHRcdFx0XHRpZiAoeFVwcGVyLmNoYXJDb2RlQXQoMCkgKyBzaGlwLmxlbmd0aCAtIDEgPD0gJ0onLmNoYXJDb2RlQXQoMCkpIHtcblx0XHRcdFx0XHRcdGxldCBjYW5QbGFjZVNoaXAgPSB0cnVlO1xuXHRcdFx0XHRcdFx0Zm9yIChcblx0XHRcdFx0XHRcdFx0bGV0IGkgPSB4VXBwZXIuY2hhckNvZGVBdCgwKTtcblx0XHRcdFx0XHRcdFx0aSA8PSB4VXBwZXIuY2hhckNvZGVBdCgwKSArIHNoaXAubGVuZ3RoIC0gMTtcblx0XHRcdFx0XHRcdFx0aSsrXG5cdFx0XHRcdFx0XHQpIHtcblx0XHRcdFx0XHRcdFx0Y29uc3QgbG9jYXRpb25Ub0NoZWNrID0gcGxheWVyR2FtZUJvYXJkLmZpbmQoXG5cdFx0XHRcdFx0XHRcdFx0KGxvYykgPT4gbG9jLnggPT09IFN0cmluZy5mcm9tQ2hhckNvZGUoaSkgJiYgbG9jLnkgPT09IHlcblx0XHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRcdFx0aWYgKGxvY2F0aW9uVG9DaGVjay5ib2F0ICE9PSAnbm9uZScpIHtcblx0XHRcdFx0XHRcdFx0XHRjYW5QbGFjZVNoaXAgPSBmYWxzZTtcblx0XHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0aWYgKGNhblBsYWNlU2hpcCkge1xuXHRcdFx0XHRcdFx0XHRmb3IgKFxuXHRcdFx0XHRcdFx0XHRcdGxldCBpID0geFVwcGVyLmNoYXJDb2RlQXQoMCk7XG5cdFx0XHRcdFx0XHRcdFx0aSA8PSB4VXBwZXIuY2hhckNvZGVBdCgwKSArIHNoaXAubGVuZ3RoIC0gMTtcblx0XHRcdFx0XHRcdFx0XHRpKytcblx0XHRcdFx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0XHRcdFx0Y29uc3QgbG9jYXRpb25Ub1BsYWNlID0gcGxheWVyR2FtZUJvYXJkLmZpbmQoXG5cdFx0XHRcdFx0XHRcdFx0XHQobG9jKSA9PiBsb2MueCA9PT0gU3RyaW5nLmZyb21DaGFyQ29kZShpKSAmJiBsb2MueSA9PT0geVxuXHRcdFx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0XHRcdFx0bG9jYXRpb25Ub1BsYWNlLmJvYXQgPSBzaGlwLm5hbWU7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0dmFsaWRQbGFjZW1lbnQgPSB0cnVlO1xuXHRcdFx0XHRcdFx0XHRhbGVydChgJHtzaGlwLm5hbWV9IGhhcyBiZWVuIHBsYWNlZCBhdCAke3hVcHBlcn0ke3l9YCk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdC8vIENoZWNrIGlmIHRoZXJlJ3MgZW5vdWdoIHNwYWNlIHRvIHBsYWNlIHRoZSBzaGlwIHZlcnRpY2FsbHlcblx0XHRcdFx0XHRpZiAoeSArIHNoaXAubGVuZ3RoIC0gMSA8PSAxMCkge1xuXHRcdFx0XHRcdFx0bGV0IGNhblBsYWNlU2hpcCA9IHRydWU7XG5cdFx0XHRcdFx0XHRmb3IgKGxldCBpID0geTsgaSA8PSB5ICsgc2hpcC5sZW5ndGggLSAxOyBpKyspIHtcblx0XHRcdFx0XHRcdFx0Y29uc3QgbG9jYXRpb25Ub0NoZWNrID0gcGxheWVyR2FtZUJvYXJkLmZpbmQoXG5cdFx0XHRcdFx0XHRcdFx0KGxvYykgPT4gbG9jLnggPT09IHhVcHBlciAmJiBsb2MueSA9PT0gaVxuXHRcdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdFx0XHRpZiAobG9jYXRpb25Ub0NoZWNrLmJvYXQgIT09ICdub25lJykge1xuXHRcdFx0XHRcdFx0XHRcdGNhblBsYWNlU2hpcCA9IGZhbHNlO1xuXHRcdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRpZiAoY2FuUGxhY2VTaGlwKSB7XG5cdFx0XHRcdFx0XHRcdGZvciAobGV0IGkgPSB5OyBpIDw9IHkgKyBzaGlwLmxlbmd0aCAtIDE7IGkrKykge1xuXHRcdFx0XHRcdFx0XHRcdGNvbnN0IGxvY2F0aW9uVG9QbGFjZSA9IHBsYXllckdhbWVCb2FyZC5maW5kKFxuXHRcdFx0XHRcdFx0XHRcdFx0KGxvYykgPT4gbG9jLnggPT09IHhVcHBlciAmJiBsb2MueSA9PT0gaVxuXHRcdFx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0XHRcdFx0bG9jYXRpb25Ub1BsYWNlLmJvYXQgPSBzaGlwLm5hbWU7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0dmFsaWRQbGFjZW1lbnQgPSB0cnVlO1xuXHRcdFx0XHRcdFx0XHRhbGVydChgJHtzaGlwLm5hbWV9IGhhcyBiZWVuIHBsYWNlZCBhdCAke3hVcHBlcn0ke3l9YCk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG59XG5cbi8vIENyZWF0ZSBhbiBhcnJheSBvZiBwbGF5ZXIgc2hpcHNcbmNvbnN0IHBsYXllclNoaXBzID0gW1xuXHRwbGF5ZXJBaXJjcmFmdENhcnJpZXIsXG5cdHBsYXllckJhdHRsZXNoaXAsXG5cdHBsYXllckRlc3Ryb3llcixcblx0cGxheWVyU3VibWFyaW5lLFxuXHRwbGF5ZXJQYXRyb2xCb2F0LFxuXTtcblxuLy8gUHJvbXB0IHRoZSBwbGF5ZXIgdG8gcGxhY2UgZWFjaCBzaGlwXG5wbGFjZVBsYXllclNoaXBzKHBsYXllckdhbWVCb2FyZCwgcGxheWVyU2hpcHMpO1xuXG5mdW5jdGlvbiBjb21wdXRlckF0dGFjaygpIHtcblx0aWYgKCFnYW1lT3Zlcikge1xuXHQgIC8vIEdlbmVyYXRlIGEgcmFuZG9tIGxvY2F0aW9uIHRvIGF0dGFjayBvbiB0aGUgcGxheWVyJ3MgZ2FtZSBib2FyZC5cblx0ICBjb25zdCByYW5kb21QbGF5ZXJMb2NhdGlvbiA9IHBsYXllckdhbWVCb2FyZC5maWx0ZXIobG9jYXRpb24gPT4gbG9jYXRpb24uYXR0YWNrZWQgPT09ICdubycpO1xuXHQgIGNvbnN0IHJhbmRvbUluZGV4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogcmFuZG9tUGxheWVyTG9jYXRpb24ubGVuZ3RoKTtcblx0ICBjb25zdCBsb2NhdGlvblRvQXR0YWNrID0gcmFuZG9tUGxheWVyTG9jYXRpb25bcmFuZG9tSW5kZXhdO1xuICBcblx0ICAvLyBNYXJrIHRoZSBhdHRhY2tlZCBsb2NhdGlvbiBhcyAneWVzJy5cblx0ICBsb2NhdGlvblRvQXR0YWNrLmF0dGFja2VkID0gJ3llcyc7XG4gIFxuXHQgIC8vIEZpbmQgdGhlIGNvcnJlc3BvbmRpbmcgZGl2IG9uIHRoZSBwbGF5ZXIncyBnYW1lIGJvYXJkLlxuXHQgIGNvbnN0IGRpdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGxvY2F0aW9uVG9BdHRhY2sueCArIGxvY2F0aW9uVG9BdHRhY2sueSk7XG4gIFxuXHQgIGlmIChsb2NhdGlvblRvQXR0YWNrLmJvYXQgPT09ICdub25lJykge1xuXHRcdGRpdi5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnZ3JleSc7XG5cdFx0YWxlcnQoXCJDb21wdXRlcidzIGF0dGFjazogSXQncyBhIG1pc3MhXCIpO1xuXHQgIH0gZWxzZSB7XG5cdFx0ZGl2LnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdyZWQnO1xuXHRcdGNvbnN0IHNoaXAgPSBwbGF5ZXJTaGlwcy5maW5kKChzKSA9PiBzLm5hbWUgPT09IGxvY2F0aW9uVG9BdHRhY2suYm9hdCk7XG5cdFx0c2hpcC5oaXQoKTtcblx0XHRzaGlwLmlzU3VuaygpO1xuXHRcdGNoZWNrUGxheWVyU2hpcHNTdW5rKCk7IC8vIENoZWNrIGlmIHBsYXllcidzIHNoaXBzIGFyZSBhbGwgc3VuayBhZnRlciBlYWNoIGF0dGFjay5cblx0ICB9XG4gIFxuXHQgIC8vIENoZWNrIGlmIHRoZSBnYW1lIGlzIG92ZXIgKGFsbCBwbGF5ZXIgc2hpcHMgYXJlIHN1bmspXG5cdCAgaWYgKCFnYW1lT3Zlcikge1xuXHRcdC8vIEFmdGVyIGhhbmRsaW5nIGNvbXB1dGVyJ3MgYXR0YWNrLCBhbGxvdyB0aGUgcGxheWVyIHRvIG1ha2UgdGhlaXIgYXR0YWNrLlxuXHRcdC8vIFRoZSBwbGF5ZXIgd2lsbCBiZSBhYmxlIHRvIGF0dGFjayBvbmx5IGlmIHRoZSBnYW1lIGlzIG5vdCBvdmVyLlxuXHRcdC8vIEZvciBleGFtcGxlLCB5b3UgY2FuIHRyaWdnZXIgdGhlIHBsYXllcidzIGF0dGFjayBieSBlbmFibGluZyBhIGJ1dHRvbiBvciBvdGhlciBVSSBpbnRlcmFjdGlvbi5cblx0ICB9XG5cdH1cbiAgfVxuICBcbiAgXG4gIGZ1bmN0aW9uIGNoZWNrUGxheWVyU2hpcHNTdW5rKCkge1xuXHRjb25zdCBhbGxTdW5rID0gcGxheWVyU2hpcHMuZXZlcnkoKHNoaXApID0+IHNoaXAuc3VuayA9PT0gJ1llcycpO1xuXHRpZiAoYWxsU3Vuaykge1xuXHQgIGFsZXJ0KFwiR0FNRSBPVkVSISBDT01QVVRFUiBXSU5TIVwiKTtcblx0ICAvLyBPcHRpb25hbGx5LCB5b3UgY2FuIHJlc2V0IHRoZSBnYW1lIG9yIHBlcmZvcm0gYW55IG90aGVyIGFjdGlvbnMgaGVyZS5cblx0fVxuICB9XG5cbiAgZnVuY3Rpb24gY2hlY2tDb21wdXRlclNoaXBzU3VuaygpIHtcblx0Y29uc3QgYWxsU3VuayA9IGNvbXB1dGVyU2hpcHMuZXZlcnkoKHNoaXApID0+IHNoaXAuc3VuayA9PT0gJ1llcycpO1xuXHRpZiAoYWxsU3Vuaykge1xuXHQgIGFsZXJ0KFwiR0FNRSBPVkVSISBZT1UgV0lOIVwiKTtcblx0ICAvLyBPcHRpb25hbGx5LCB5b3UgY2FuIHJlc2V0IHRoZSBnYW1lIG9yIHBlcmZvcm0gYW55IG90aGVyIGFjdGlvbnMgaGVyZS5cblx0fVxuICB9XG4gIFxuICBsZXQgZ2FtZU92ZXIgPSBmYWxzZTsgLy8gQWRkIHRoaXMgdmFyaWFibGUgdG8gdHJhY2sgdGhlIGdhbWUgc3RhdGVcblxuICBmdW5jdGlvbiBoYW5kbGVQbGF5ZXJBdHRhY2sobG9jYXRpb24pIHtcblx0aWYgKCFnYW1lT3ZlciAmJiBsb2NhdGlvbi5hdHRhY2tlZCA9PT0gJ25vJykge1xuXHQgIGxvY2F0aW9uLmF0dGFja2VkID0gJ3llcyc7XG5cdCAgY29uc3QgZGl2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbXB1dGVyLScgKyBsb2NhdGlvbi54ICsgbG9jYXRpb24ueSk7XG4gIFxuXHQgIGlmIChsb2NhdGlvbi5ib2F0ID09PSAnbm9uZScpIHtcblx0XHRkaXYuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ2dyZXknO1xuXHRcdGFsZXJ0KFwiSXQncyBhIG1pc3MhXCIpO1xuXHQgIH0gZWxzZSB7XG5cdFx0ZGl2LnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdyZWQnO1xuXHRcdGNvbnN0IHNoaXAgPSBjb21wdXRlclNoaXBzLmZpbmQoKHMpID0+IHMubmFtZSA9PT0gbG9jYXRpb24uYm9hdCk7XG5cdFx0c2hpcC5oaXQoKTtcblx0XHRzaGlwLmlzU3VuaygpO1xuXHRcdGNoZWNrQ29tcHV0ZXJTaGlwc1N1bmsoKTsgLy8gQ2hlY2sgaWYgY29tcHV0ZXIncyBzaGlwcyBhcmUgYWxsIHN1bmsgYWZ0ZXIgZWFjaCBhdHRhY2suXG5cdCAgfVxuICBcblx0ICAvLyBDaGVjayBpZiB0aGUgZ2FtZSBpcyBvdmVyIChhbGwgY29tcHV0ZXIgc2hpcHMgYXJlIHN1bmspXG5cdCAgaWYgKCFnYW1lT3Zlcikge1xuXHRcdC8vIEFmdGVyIGhhbmRsaW5nIHBsYXllcidzIGF0dGFjaywgdHJpZ2dlciBjb21wdXRlcidzIGF0dGFjay5cblx0XHRjb21wdXRlckF0dGFjaygpO1xuXHQgIH1cblx0fVxuICB9XG4gIFxuICBmdW5jdGlvbiBjaGVja0NvbXB1dGVyU2hpcHNTdW5rKCkge1xuXHRjb25zdCBhbGxTdW5rID0gY29tcHV0ZXJTaGlwcy5ldmVyeSgoc2hpcCkgPT4gc2hpcC5zdW5rID09PSAnWWVzJyk7XG5cdGlmIChhbGxTdW5rKSB7XG5cdCAgYWxlcnQoXCJHQU1FIE9WRVIhIFlPVSBXSU4hXCIpO1xuXHQgIGdhbWVPdmVyID0gdHJ1ZTsgLy8gU2V0IHRoZSBnYW1lIG92ZXIgZmxhZyB0byB0cnVlXG5cdCAgLy8gT3B0aW9uYWxseSwgeW91IGNhbiByZXNldCB0aGUgZ2FtZSBvciBwZXJmb3JtIGFueSBvdGhlciBhY3Rpb25zIGhlcmUuXG5cdH1cbiAgfVxuICBcbiAgXG4gIFxuICAvLyBBZGQgYSBjbGljayBldmVudCBsaXN0ZW5lciB0byBlYWNoIGNvbXB1dGVyIGdhbWUgYm9hcmQgZGl2XG4gIGNvbXB1dGVyR2FtZUJvYXJkLmZvckVhY2goKGxvY2F0aW9uKSA9PiB7XG5cdGNvbnN0IGRpdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb21wdXRlci0nICsgbG9jYXRpb24ueCArIGxvY2F0aW9uLnkpO1xuXHRkaXYuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG5cdCAgaGFuZGxlUGxheWVyQXR0YWNrKGxvY2F0aW9uKTtcblx0fSk7XG4gIH0pO1xuICBcblxuXG5jb25zb2xlLmxvZyhwbGF5ZXJHYW1lQm9hcmQpO1xuY29uc29sZS5sb2coY29tcHV0ZXJHYW1lQm9hcmQpOyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==