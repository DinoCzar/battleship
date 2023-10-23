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

const computerContainer = document.querySelector('#computer-container');

function createPlayerGameBoard() {
    const playerGameBoard = [];
    const columns = 10;
    const rows = 10;

    for (let x = 1; x <= columns; x++) {
        for (let y = 'A'.charCodeAt(0); y <= 'J'.charCodeAt(0); y++) {
            const location = createLocation(x, String.fromCharCode(y));
            playerGameBoard.push(location);

            // Create a div element for each location, set its id, and add a CSS class
            const playerContainer = document.querySelector('#player-container');
			const div = document.createElement('div');
            div.id = location.y + location.x;
            div.classList.add('location'); // Add the CSS class 'location' to the div
            playerContainer.appendChild(div); // Append the div to the playerContainer
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

            // Create a div element for each location in the computer game board
            const div = document.createElement('div');
            div.id = 'computer-' + location.y + location.x; // Add 'computer-' prefix to the ID
            div.classList.add('location'); // Add the CSS class 'location' to the div
            computerContainer.appendChild(div);
        }
    }

    return computerGameBoard;
}

const playerGameBoard = createPlayerGameBoard();
const computerGameBoard = createComputerGameBoard();

function randomCoordinate() {
    // Generate a random x-coordinate (1-10)
    const x = Math.floor(Math.random() * 10) + 1;
    // Generate a random y-coordinate (A-J)
    const y = String.fromCharCode(Math.floor(Math.random() * 10) + 'A'.charCodeAt(0));
    return { x, y };
}

function placeComputerShips(computerGameBoard, ships) {
    for (const ship of ships) {
        let validPlacement = false;
        while (!validPlacement) {
            // Generate a random starting coordinate
            const { x, y } = randomCoordinate();

            // Check if there's enough space to place the ship horizontally
            if (x + ship.length - 1 <= 10) {
                let canPlaceShip = true;
                // Check each location from the current one to the end
                for (let i = x; i < x + ship.length; i++) {
                    const locationToCheck = computerGameBoard.find(loc => loc.x === i && loc.y === y);
                    if (locationToCheck.boat !== 'none') {
                        canPlaceShip = false;
                        break;
                    }
                }
                if (canPlaceShip) {
                    // Valid placement, update the "boat" property for each location
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

// Create an array of computer ships
const computerShips = [computerAircraftCarrier, computerBattleship, computerDestroyer, computerSubmarine, computerPatrolBoat];

// Automatically place computer ships on the board
placeComputerShips(computerGameBoard, computerShips);


console.log(playerGameBoard)
console.log(computerGameBoard)

