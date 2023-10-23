function createShip(name, length, hits, sunk) {
	// Create an empty object
	const ship = {};

	// Assign properties to the object
	ship.name = name;
	ship.length = length;
	ship.hits = hits;
	ship.sunk = sunk;

	// Define a method for the object
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

	// Return the object
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

function createPlayerGameBoard() {
    const playerGameBoard = [];
    const columns = 10;
    const rows = 10;

    for (let x = 1; x <= columns; x++) {
        for (let y = 'A'.charCodeAt(0); y <= 'J'.charCodeAt(0); y++) {
            const location = createLocation(x, String.fromCharCode(y));
            playerGameBoard.push(location);

            // Create a div element for each location and set its id
            const div = document.createElement('div');
            div.id = location.y + location.x;
            document.body.appendChild(div); // You can append it to the body or another container as needed.
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
        }
    }

    return computerGameBoard;
}

const playerGameBoard = createPlayerGameBoard();
const computerGameBoard = createComputerGameBoard();

// Example usage of the playerGameBoard and computerGameBoard:
console.log(playerGameBoard); // Player's game board with x, y, boat, and attacked properties.
console.log(computerGameBoard); // Computer's game board with x, y, boat, and attacked properties.
