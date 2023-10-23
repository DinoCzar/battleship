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
	console.log('computer attack');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxVQUFVO0FBQ1Y7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUNBQWlDLHdCQUF3QjtBQUN6RCxrQkFBa0IsU0FBUztBQUMzQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxVQUFVO0FBQ1Y7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUNBQWlDLHdCQUF3QjtBQUN6RCxrQkFBa0IsU0FBUztBQUMzQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhDQUE4QyxXQUFXO0FBQ3pELHVEQUF1RCxXQUFXO0FBQ2xFO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsV0FBVyxxQkFBcUIsT0FBTyxFQUFFLEVBQUU7QUFDM0Q7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQSxzQkFBc0IsMEJBQTBCO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QiwwQkFBMEI7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLFdBQVcscUJBQXFCLE9BQU8sRUFBRSxFQUFFO0FBQzNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0YsR0FBRztBQUNIOzs7QUFHQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiBjcmVhdGVTaGlwKG5hbWUsIGxlbmd0aCwgaGl0cywgc3Vuaykge1xuXHRjb25zdCBzaGlwID0ge307XG5cdHNoaXAubmFtZSA9IG5hbWU7XG5cdHNoaXAubGVuZ3RoID0gbGVuZ3RoO1xuXHRzaGlwLmhpdHMgPSBoaXRzO1xuXHRzaGlwLnN1bmsgPSBzdW5rO1xuXHRzaGlwLmhpdCA9IGZ1bmN0aW9uICgpIHtcblx0XHRzaGlwLmhpdHMgKz0gMTtcblx0XHRhbGVydChzaGlwLm5hbWUgKyAnIGhhcyBiZWVuIGhpdCEnKTtcblx0fTtcblx0c2hpcC5pc1N1bmsgPSBmdW5jdGlvbiAoKSB7XG5cdFx0aWYgKHNoaXAuaGl0cyA9PT0gc2hpcC5sZW5ndGgpIHtcblx0XHRcdHNoaXAuc3VuayA9ICdZZXMnO1xuXHRcdFx0YWxlcnQoc2hpcC5uYW1lICsgJyBoYXMgYmVlbiBzdW5rIScpO1xuXHRcdH1cblx0fTtcblx0cmV0dXJuIHNoaXA7XG59XG5cbmNvbnN0IHBsYXllckFpcmNyYWZ0Q2FycmllciA9IGNyZWF0ZVNoaXAoJ0FpcmNyYWZ0IENhcnJpZXInLCA1LCAwLCAnTm8nKTtcbmNvbnN0IHBsYXllckJhdHRsZXNoaXAgPSBjcmVhdGVTaGlwKCdCYXR0bGVzaGlwJywgNCwgMCwgJ05vJyk7XG5jb25zdCBwbGF5ZXJEZXN0cm95ZXIgPSBjcmVhdGVTaGlwKCdEZXN0cm95ZXInLCA0LCAwLCAnTm8nKTtcbmNvbnN0IHBsYXllclN1Ym1hcmluZSA9IGNyZWF0ZVNoaXAoJ1N1Ym1hcmluZScsIDMsIDAsICdObycpO1xuY29uc3QgcGxheWVyUGF0cm9sQm9hdCA9IGNyZWF0ZVNoaXAoJ1BhdHJvbCBCb2F0JywgMiwgMCwgJ05vJyk7XG5cbmNvbnN0IGNvbXB1dGVyQWlyY3JhZnRDYXJyaWVyID0gY3JlYXRlU2hpcCgnQWlyY3JhZnQgQ2FycmllcicsIDUsIDAsICdObycpO1xuY29uc3QgY29tcHV0ZXJCYXR0bGVzaGlwID0gY3JlYXRlU2hpcCgnQmF0dGxlc2hpcCcsIDQsIDAsICdObycpO1xuY29uc3QgY29tcHV0ZXJEZXN0cm95ZXIgPSBjcmVhdGVTaGlwKCdEZXN0cm95ZXInLCA0LCAwLCAnTm8nKTtcbmNvbnN0IGNvbXB1dGVyU3VibWFyaW5lID0gY3JlYXRlU2hpcCgnU3VibWFyaW5lJywgMywgMCwgJ05vJyk7XG5jb25zdCBjb21wdXRlclBhdHJvbEJvYXQgPSBjcmVhdGVTaGlwKCdQYXRyb2wgQm9hdCcsIDIsIDAsICdObycpO1xuXG5mdW5jdGlvbiBjcmVhdGVMb2NhdGlvbih4LCB5KSB7XG5cdHJldHVybiB7IHgsIHksIGJvYXQ6ICdub25lJywgYXR0YWNrZWQ6ICdubycgfTtcbn1cblxuY29uc3QgY29tcHV0ZXJDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY29tcHV0ZXItY29udGFpbmVyJyk7XG5cbmZ1bmN0aW9uIGNyZWF0ZVBsYXllckdhbWVCb2FyZCgpIHtcblx0Y29uc3QgcGxheWVyR2FtZUJvYXJkID0gW107XG5cdGNvbnN0IGNvbHVtbnMgPSAxMDtcblx0Y29uc3Qgcm93cyA9IDEwO1xuXG5cdGZvciAobGV0IHggPSAnQScuY2hhckNvZGVBdCgwKTsgeCA8PSAnSicuY2hhckNvZGVBdCgwKTsgeCsrKSB7XG5cdFx0Zm9yIChsZXQgeSA9IDE7IHkgPD0gMTA7IHkrKykge1xuXHRcdFx0Y29uc3QgbG9jYXRpb24gPSBjcmVhdGVMb2NhdGlvbihTdHJpbmcuZnJvbUNoYXJDb2RlKHgpLCB5KTtcblx0XHRcdHBsYXllckdhbWVCb2FyZC5wdXNoKGxvY2F0aW9uKTtcblxuXHRcdFx0Y29uc3QgcGxheWVyQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3BsYXllci1jb250YWluZXInKTtcblx0XHRcdGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHRcdFx0ZGl2LmlkID0gU3RyaW5nLmZyb21DaGFyQ29kZSh4KSArIHk7XG5cdFx0XHRkaXYuY2xhc3NMaXN0LmFkZCgnbG9jYXRpb24nKTtcblx0XHRcdHBsYXllckNvbnRhaW5lci5hcHBlbmRDaGlsZChkaXYpO1xuXHRcdH1cblx0fVxuXG5cdHJldHVybiBwbGF5ZXJHYW1lQm9hcmQ7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUNvbXB1dGVyTG9jYXRpb24oeCwgeSkge1xuXHRyZXR1cm4geyB4LCB5LCBib2F0OiAnbm9uZScsIGF0dGFja2VkOiAnbm8nIH07XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUNvbXB1dGVyR2FtZUJvYXJkKCkge1xuXHRjb25zdCBjb21wdXRlckdhbWVCb2FyZCA9IFtdO1xuXHRjb25zdCBjb2x1bW5zID0gMTA7XG5cdGNvbnN0IHJvd3MgPSAxMDtcblxuXHRmb3IgKGxldCB4ID0gJ0EnLmNoYXJDb2RlQXQoMCk7IHggPD0gJ0onLmNoYXJDb2RlQXQoMCk7IHgrKykge1xuXHRcdGZvciAobGV0IHkgPSAxOyB5IDw9IDEwOyB5KyspIHtcblx0XHRcdGNvbnN0IGxvY2F0aW9uID0gY3JlYXRlQ29tcHV0ZXJMb2NhdGlvbihTdHJpbmcuZnJvbUNoYXJDb2RlKHgpLCB5KTtcblx0XHRcdGNvbXB1dGVyR2FtZUJvYXJkLnB1c2gobG9jYXRpb24pO1xuXG5cdFx0XHRjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0XHRcdGRpdi5pZCA9ICdjb21wdXRlci0nICsgU3RyaW5nLmZyb21DaGFyQ29kZSh4KSArIHk7XG5cdFx0XHRkaXYuY2xhc3NMaXN0LmFkZCgnbG9jYXRpb24nKTtcblx0XHRcdGNvbXB1dGVyQ29udGFpbmVyLmFwcGVuZENoaWxkKGRpdik7XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIGNvbXB1dGVyR2FtZUJvYXJkO1xufVxuXG5jb25zdCBwbGF5ZXJHYW1lQm9hcmQgPSBjcmVhdGVQbGF5ZXJHYW1lQm9hcmQoKTtcbmNvbnN0IGNvbXB1dGVyR2FtZUJvYXJkID0gY3JlYXRlQ29tcHV0ZXJHYW1lQm9hcmQoKTtcblxuZnVuY3Rpb24gcmFuZG9tQ29vcmRpbmF0ZSgpIHtcblx0Y29uc3QgeCA9IFN0cmluZy5mcm9tQ2hhckNvZGUoXG5cdFx0TWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApICsgJ0EnLmNoYXJDb2RlQXQoMClcblx0KTtcblx0Y29uc3QgeSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKSArIDE7XG5cdHJldHVybiB7IHgsIHkgfTtcbn1cblxuZnVuY3Rpb24gcGxhY2VDb21wdXRlclNoaXBzKGNvbXB1dGVyR2FtZUJvYXJkLCBzaGlwcykge1xuXHRmb3IgKGNvbnN0IHNoaXAgb2Ygc2hpcHMpIHtcblx0XHRsZXQgdmFsaWRQbGFjZW1lbnQgPSBmYWxzZTtcblx0XHR3aGlsZSAoIXZhbGlkUGxhY2VtZW50KSB7XG5cdFx0XHRjb25zdCB7IHgsIHkgfSA9IHJhbmRvbUNvb3JkaW5hdGUoKTtcblx0XHRcdGlmICh4LmNoYXJDb2RlQXQoMCkgKyBzaGlwLmxlbmd0aCAtIDEgPD0gJ0onLmNoYXJDb2RlQXQoMCkpIHtcblx0XHRcdFx0bGV0IGNhblBsYWNlU2hpcCA9IHRydWU7XG5cdFx0XHRcdGZvciAoXG5cdFx0XHRcdFx0bGV0IGkgPSB4LmNoYXJDb2RlQXQoMCk7XG5cdFx0XHRcdFx0aSA8PSB4LmNoYXJDb2RlQXQoMCkgKyBzaGlwLmxlbmd0aCAtIDE7XG5cdFx0XHRcdFx0aSsrXG5cdFx0XHRcdCkge1xuXHRcdFx0XHRcdGNvbnN0IGxvY2F0aW9uVG9DaGVjayA9IGNvbXB1dGVyR2FtZUJvYXJkLmZpbmQoXG5cdFx0XHRcdFx0XHQobG9jKSA9PiBsb2MueCA9PT0gU3RyaW5nLmZyb21DaGFyQ29kZShpKSAmJiBsb2MueSA9PT0geVxuXHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0aWYgKGxvY2F0aW9uVG9DaGVjay5ib2F0ICE9PSAnbm9uZScpIHtcblx0XHRcdFx0XHRcdGNhblBsYWNlU2hpcCA9IGZhbHNlO1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdGlmIChjYW5QbGFjZVNoaXApIHtcblx0XHRcdFx0XHRmb3IgKFxuXHRcdFx0XHRcdFx0bGV0IGkgPSB4LmNoYXJDb2RlQXQoMCk7XG5cdFx0XHRcdFx0XHRpIDw9IHguY2hhckNvZGVBdCgwKSArIHNoaXAubGVuZ3RoIC0gMTtcblx0XHRcdFx0XHRcdGkrK1xuXHRcdFx0XHRcdCkge1xuXHRcdFx0XHRcdFx0Y29uc3QgbG9jYXRpb25Ub1BsYWNlID0gY29tcHV0ZXJHYW1lQm9hcmQuZmluZChcblx0XHRcdFx0XHRcdFx0KGxvYykgPT4gbG9jLnggPT09IFN0cmluZy5mcm9tQ2hhckNvZGUoaSkgJiYgbG9jLnkgPT09IHlcblx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0XHRsb2NhdGlvblRvUGxhY2UuYm9hdCA9IHNoaXAubmFtZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0dmFsaWRQbGFjZW1lbnQgPSB0cnVlO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG59XG5cbmNvbnN0IGNvbXB1dGVyU2hpcHMgPSBbXG5cdGNvbXB1dGVyQWlyY3JhZnRDYXJyaWVyLFxuXHRjb21wdXRlckJhdHRsZXNoaXAsXG5cdGNvbXB1dGVyRGVzdHJveWVyLFxuXHRjb21wdXRlclN1Ym1hcmluZSxcblx0Y29tcHV0ZXJQYXRyb2xCb2F0LFxuXTtcblxucGxhY2VDb21wdXRlclNoaXBzKGNvbXB1dGVyR2FtZUJvYXJkLCBjb21wdXRlclNoaXBzKTtcblxuZnVuY3Rpb24gcGxhY2VQbGF5ZXJTaGlwcyhwbGF5ZXJHYW1lQm9hcmQsIHNoaXBzKSB7XG5cdGZvciAoY29uc3Qgc2hpcCBvZiBzaGlwcykge1xuXHRcdGxldCB2YWxpZFBsYWNlbWVudCA9IGZhbHNlO1xuXG5cdFx0d2hpbGUgKCF2YWxpZFBsYWNlbWVudCkge1xuXHRcdFx0Y29uc3QgeCA9IHByb21wdChgRW50ZXIgeC1jb29yZGluYXRlIGZvciAke3NoaXAubmFtZX0gKEEtSik6YCk7XG5cdFx0XHRjb25zdCB5ID0gcGFyc2VJbnQocHJvbXB0KGBFbnRlciB5LWNvb3JkaW5hdGUgZm9yICR7c2hpcC5uYW1lfSAoMS0xMCk6YCkpO1xuXHRcdFx0Y29uc3QgaG9yaXpvbnRhbCA9IGNvbmZpcm0oXG5cdFx0XHRcdGBEbyB5b3Ugd2FudCB0byBwbGFjZSB0aGUgc2hpcCB2ZXJ0aWNhbGx5PyAoT0sgZm9yIFllcywgQ2FuY2VsIGZvciBObylgXG5cdFx0XHQpO1xuXG5cdFx0XHRpZiAoeCA+PSAnQScgJiYgeCA8PSAnSicgJiYgeSA+PSAxICYmIHkgPD0gMTApIHtcblx0XHRcdFx0Y29uc3QgeFVwcGVyID0geC50b1VwcGVyQ2FzZSgpO1xuXG5cdFx0XHRcdGlmIChob3Jpem9udGFsKSB7XG5cdFx0XHRcdFx0Ly8gQ2hlY2sgaWYgdGhlcmUncyBlbm91Z2ggc3BhY2UgdG8gcGxhY2UgdGhlIHNoaXAgaG9yaXpvbnRhbGx5XG5cdFx0XHRcdFx0aWYgKHhVcHBlci5jaGFyQ29kZUF0KDApICsgc2hpcC5sZW5ndGggLSAxIDw9ICdKJy5jaGFyQ29kZUF0KDApKSB7XG5cdFx0XHRcdFx0XHRsZXQgY2FuUGxhY2VTaGlwID0gdHJ1ZTtcblx0XHRcdFx0XHRcdGZvciAoXG5cdFx0XHRcdFx0XHRcdGxldCBpID0geFVwcGVyLmNoYXJDb2RlQXQoMCk7XG5cdFx0XHRcdFx0XHRcdGkgPD0geFVwcGVyLmNoYXJDb2RlQXQoMCkgKyBzaGlwLmxlbmd0aCAtIDE7XG5cdFx0XHRcdFx0XHRcdGkrK1xuXHRcdFx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0XHRcdGNvbnN0IGxvY2F0aW9uVG9DaGVjayA9IHBsYXllckdhbWVCb2FyZC5maW5kKFxuXHRcdFx0XHRcdFx0XHRcdChsb2MpID0+IGxvYy54ID09PSBTdHJpbmcuZnJvbUNoYXJDb2RlKGkpICYmIGxvYy55ID09PSB5XG5cdFx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0XHRcdGlmIChsb2NhdGlvblRvQ2hlY2suYm9hdCAhPT0gJ25vbmUnKSB7XG5cdFx0XHRcdFx0XHRcdFx0Y2FuUGxhY2VTaGlwID0gZmFsc2U7XG5cdFx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGlmIChjYW5QbGFjZVNoaXApIHtcblx0XHRcdFx0XHRcdFx0Zm9yIChcblx0XHRcdFx0XHRcdFx0XHRsZXQgaSA9IHhVcHBlci5jaGFyQ29kZUF0KDApO1xuXHRcdFx0XHRcdFx0XHRcdGkgPD0geFVwcGVyLmNoYXJDb2RlQXQoMCkgKyBzaGlwLmxlbmd0aCAtIDE7XG5cdFx0XHRcdFx0XHRcdFx0aSsrXG5cdFx0XHRcdFx0XHRcdCkge1xuXHRcdFx0XHRcdFx0XHRcdGNvbnN0IGxvY2F0aW9uVG9QbGFjZSA9IHBsYXllckdhbWVCb2FyZC5maW5kKFxuXHRcdFx0XHRcdFx0XHRcdFx0KGxvYykgPT4gbG9jLnggPT09IFN0cmluZy5mcm9tQ2hhckNvZGUoaSkgJiYgbG9jLnkgPT09IHlcblx0XHRcdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdFx0XHRcdGxvY2F0aW9uVG9QbGFjZS5ib2F0ID0gc2hpcC5uYW1lO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdHZhbGlkUGxhY2VtZW50ID0gdHJ1ZTtcblx0XHRcdFx0XHRcdFx0YWxlcnQoYCR7c2hpcC5uYW1lfSBoYXMgYmVlbiBwbGFjZWQgYXQgJHt4VXBwZXJ9JHt5fWApO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHQvLyBDaGVjayBpZiB0aGVyZSdzIGVub3VnaCBzcGFjZSB0byBwbGFjZSB0aGUgc2hpcCB2ZXJ0aWNhbGx5XG5cdFx0XHRcdFx0aWYgKHkgKyBzaGlwLmxlbmd0aCAtIDEgPD0gMTApIHtcblx0XHRcdFx0XHRcdGxldCBjYW5QbGFjZVNoaXAgPSB0cnVlO1xuXHRcdFx0XHRcdFx0Zm9yIChsZXQgaSA9IHk7IGkgPD0geSArIHNoaXAubGVuZ3RoIC0gMTsgaSsrKSB7XG5cdFx0XHRcdFx0XHRcdGNvbnN0IGxvY2F0aW9uVG9DaGVjayA9IHBsYXllckdhbWVCb2FyZC5maW5kKFxuXHRcdFx0XHRcdFx0XHRcdChsb2MpID0+IGxvYy54ID09PSB4VXBwZXIgJiYgbG9jLnkgPT09IGlcblx0XHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRcdFx0aWYgKGxvY2F0aW9uVG9DaGVjay5ib2F0ICE9PSAnbm9uZScpIHtcblx0XHRcdFx0XHRcdFx0XHRjYW5QbGFjZVNoaXAgPSBmYWxzZTtcblx0XHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0aWYgKGNhblBsYWNlU2hpcCkge1xuXHRcdFx0XHRcdFx0XHRmb3IgKGxldCBpID0geTsgaSA8PSB5ICsgc2hpcC5sZW5ndGggLSAxOyBpKyspIHtcblx0XHRcdFx0XHRcdFx0XHRjb25zdCBsb2NhdGlvblRvUGxhY2UgPSBwbGF5ZXJHYW1lQm9hcmQuZmluZChcblx0XHRcdFx0XHRcdFx0XHRcdChsb2MpID0+IGxvYy54ID09PSB4VXBwZXIgJiYgbG9jLnkgPT09IGlcblx0XHRcdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdFx0XHRcdGxvY2F0aW9uVG9QbGFjZS5ib2F0ID0gc2hpcC5uYW1lO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdHZhbGlkUGxhY2VtZW50ID0gdHJ1ZTtcblx0XHRcdFx0XHRcdFx0YWxlcnQoYCR7c2hpcC5uYW1lfSBoYXMgYmVlbiBwbGFjZWQgYXQgJHt4VXBwZXJ9JHt5fWApO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxufVxuXG4vLyBDcmVhdGUgYW4gYXJyYXkgb2YgcGxheWVyIHNoaXBzXG5jb25zdCBwbGF5ZXJTaGlwcyA9IFtcblx0cGxheWVyQWlyY3JhZnRDYXJyaWVyLFxuXHRwbGF5ZXJCYXR0bGVzaGlwLFxuXHRwbGF5ZXJEZXN0cm95ZXIsXG5cdHBsYXllclN1Ym1hcmluZSxcblx0cGxheWVyUGF0cm9sQm9hdCxcbl07XG5cbi8vIFByb21wdCB0aGUgcGxheWVyIHRvIHBsYWNlIGVhY2ggc2hpcFxucGxhY2VQbGF5ZXJTaGlwcyhwbGF5ZXJHYW1lQm9hcmQsIHBsYXllclNoaXBzKTtcblxuZnVuY3Rpb24gY29tcHV0ZXJBdHRhY2soKSB7XG5cdGNvbnNvbGUubG9nKCdjb21wdXRlciBhdHRhY2snKTtcbiAgfVxuICBcbiAgZnVuY3Rpb24gaGFuZGxlUGxheWVyQXR0YWNrKGxvY2F0aW9uKSB7XG5cdGlmIChsb2NhdGlvbi5hdHRhY2tlZCA9PT0gJ25vJykge1xuXHQgIGxvY2F0aW9uLmF0dGFja2VkID0gJ3llcyc7XG5cdCAgY29uc3QgZGl2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbXB1dGVyLScgKyBsb2NhdGlvbi54ICsgbG9jYXRpb24ueSk7XG4gIFxuXHQgIGlmIChsb2NhdGlvbi5ib2F0ID09PSAnbm9uZScpIHtcblx0XHRkaXYuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ2dyZXknO1xuXHRcdGFsZXJ0KFwiSXQncyBhIG1pc3MhXCIpO1xuXHQgIH0gZWxzZSB7XG5cdFx0ZGl2LnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdyZWQnO1xuXHRcdGNvbnN0IHNoaXAgPSBjb21wdXRlclNoaXBzLmZpbmQoKHMpID0+IHMubmFtZSA9PT0gbG9jYXRpb24uYm9hdCk7XG5cdFx0c2hpcC5oaXQoKTtcblx0XHRzaGlwLmlzU3VuaygpO1xuXHQgIH1cbiAgXG5cdCAgLy8gQWZ0ZXIgaGFuZGxpbmcgcGxheWVyJ3MgYXR0YWNrLCB0cmlnZ2VyIGNvbXB1dGVyJ3MgYXR0YWNrLlxuXHQgIGNvbXB1dGVyQXR0YWNrKCk7XG5cdH1cbiAgfVxuICBcbiAgLy8gQWRkIGEgY2xpY2sgZXZlbnQgbGlzdGVuZXIgdG8gZWFjaCBjb21wdXRlciBnYW1lIGJvYXJkIGRpdlxuICBjb21wdXRlckdhbWVCb2FyZC5mb3JFYWNoKChsb2NhdGlvbikgPT4ge1xuXHRjb25zdCBkaXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29tcHV0ZXItJyArIGxvY2F0aW9uLnggKyBsb2NhdGlvbi55KTtcblx0ZGl2LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuXHQgIGhhbmRsZVBsYXllckF0dGFjayhsb2NhdGlvbik7XG5cdH0pO1xuICB9KTtcbiAgXG5cblxuY29uc29sZS5sb2cocGxheWVyR2FtZUJvYXJkKTtcbmNvbnNvbGUubG9nKGNvbXB1dGVyR2FtZUJvYXJkKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==