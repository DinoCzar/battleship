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

let previousComputerAttack = null; // Keep track of the previous computer attack

function computerAttack() {
	if (!gameOver) {
		// Generate a random location to attack on the player's game board.
		let randomPlayerLocation;

		if (previousComputerAttack) {
			// If the previous attack was a hit, attack an adjacent square to it.
			const adjacentLocations = getAdjacentLocations(previousComputerAttack.x, previousComputerAttack.y);
			randomPlayerLocation = adjacentLocations.find((loc) => loc.attacked === 'no');
		}

		if (!randomPlayerLocation) {
			// If there's no adjacent square to attack, attack a random location.
			randomPlayerLocation = playerGameBoard.filter((location) => location.attacked === 'no');
			randomPlayerLocation = randomPlayerLocation[Math.floor(Math.random() * randomPlayerLocation.length)];
		}

		// Mark the attacked location as 'yes'.
		randomPlayerLocation.attacked = 'yes';

		// Store the previous computer attack for reference.
		previousComputerAttack = randomPlayerLocation;

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
		}

		// Check if the game is over (all player ships are sunk)
		if (!gameOver) {
			// After handling computer's attack, allow the player to make their attack.
			// The player will be able to attack only if the game is not over.
			// For example, you can trigger the player's attack by enabling a button or other UI interaction.
		}
	}
}

// Helper function to get adjacent locations
function getAdjacentLocations(x, y) {
	const adjacentLocations = [];

	// Check north
	if (y > 1) {
		adjacentLocations.push(playerGameBoard.find((loc) => loc.x === x && loc.y === y - 1));
	}
	// Check south
	if (y < 10) {
		adjacentLocations.push(playerGameBoard.find((loc) => loc.x === x && loc.y === y + 1));
	}
	// Check west
	if (x > 'A') {
		adjacentLocations.push(playerGameBoard.find((loc) => loc.x === String.fromCharCode(x.charCodeAt(0) - 1) && loc.y === y));
	}
	// Check east
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
