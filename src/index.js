
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

function placePlayerShips(playerGameBoard, ships) {
    for (const ship of ships) {
        let validPlacement = false;

        while (!validPlacement) {
            const x = parseInt(prompt(`Enter x-coordinate for ${ship.name} (1-10):`));
            const y = prompt(`Enter y-coordinate for ${ship.name} (A-J):`);
            const horizontal = confirm(`Do you want to place the ship vertically? (OK for Yes, Cancel for No)`);

            if (x >= 1 && x <= 10 && y >= 'A' && y <= 'J') {
                const yUpper = y.toUpperCase();

                if (horizontal) {
                    // Check if there's enough space to place the ship vertically
                    if (x + ship.length - 1 <= 10) {
                        let canPlaceShip = true;
                        for (let i = x; i < x + ship.length; i++) {
                            const locationToCheck = playerGameBoard.find(loc => loc.x === i && loc.y === yUpper);
                            if (locationToCheck.boat !== 'none') {
                                canPlaceShip = false;
                                break;
                            }
                        }
                        if (canPlaceShip) {
                            for (let i = x; i < x + ship.length; i++) {
                                const locationToPlace = playerGameBoard.find(loc => loc.x === i && loc.y === yUpper);
                                locationToPlace.boat = ship.name;
                            }
                            validPlacement = true;
                            alert(`${ship.name} has been placed at ${x}${yUpper}`);
                        }
                    }
                } else {
                    // Check if there's enough space to place the ship vertically
                    if (String.fromCharCode(yUpper.charCodeAt(0) + ship.length - 1) <= 'J') {
                        let canPlaceShip = true;
                        for (let i = yUpper.charCodeAt(0); i < yUpper.charCodeAt(0) + ship.length; i++) {
                            const locationToCheck = playerGameBoard.find(loc => loc.x === x && loc.y === String.fromCharCode(i));
                            if (locationToCheck.boat !== 'none') {
                                canPlaceShip = false;
                                break;
                            }
                        }
                        if (canPlaceShip) {
                            for (let i = yUpper.charCodeAt(0); i < yUpper.charCodeAt(0) + ship.length; i++) {
                                const locationToPlace = playerGameBoard.find(loc => loc.x === x && loc.y === String.fromCharCode(i));
                                locationToPlace.boat = ship.name;
                            }
                            validPlacement = true;
                            alert(`${ship.name} has been placed at ${x}${yUpper}`);
                        }
                    }
                }
            }
        }
    }
}

// Create an array of player ships
const playerShips = [playerAircraftCarrier, playerBattleship, playerDestroyer, playerSubmarine, playerPatrolBoat];

// Prompt the player to place each ship
placePlayerShips(playerGameBoard, playerShips);


console.log(playerGameBoard);
console.log(computerGameBoard);