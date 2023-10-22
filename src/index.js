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

const aircraftCarrier = createShip('Aircraft Carrier', 5, 0, 'No');
const battleship = createShip('Battleship', 4, 0, 'No');
const destroyer = createShip('Destroyer', 4, 0, 'No');
const submarine = createShip('Submarine', 3, 0, 'No');
const patrolBoat = createShip('Patrol Boat', 2, 0, 'No');

function gameBoard(x, y, boat) {
	return {
		x: x,
		y: y,
		boat: 'none',
		attacked: 'no',
	};
}

// Arrays to represent the possible values for 'x' and 'y'
const xCoordinates = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
const yCoordinates = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// Array to store the created objects
const coordinates = [];

function placeShip(ship) {
	const shipName = ship.name;
	const shipLength = ship.length;

	while (true) {
		const x = prompt(`Enter the starting X coordinate for ${shipName} (A-J):`);
		const y = parseInt(prompt(`Enter the starting Y coordinate for ${shipName} (1-10):`));

		if (xCoordinates.includes(x) && y >= 1 && y <= 10) {
			const isHorizontal = confirm(`Place ${shipName} vertically? Click OK for Yes, Cancel for No.`);

			if (isHorizontal) {
				// Check if the ship fits horizontally and if the coordinates are available
				if (xCoordinates.indexOf(x) + shipLength <= 10 && !checkCoordinatesOccupied(x, y, shipLength, true)) {
					// Place the ship horizontally
					for (let i = 0; i < shipLength; i++) {
						const shipX = xCoordinates[xCoordinates.indexOf(x) + i];
						const shipY = y;
						const shipLocation = coordinates.find(loc => loc.x === shipX && loc.y === shipY);
						shipLocation.boat = shipName;
					}
					break;
				} else {
					alert(`${shipName} doesn't fit at this location vertically or the coordinates are occupied. Please choose a different starting coordinate.`);
				}
			} else {
				// Check if the ship fits vertically and if the coordinates are available
				if (y + shipLength - 1 <= 10 && !checkCoordinatesOccupied(x, y, shipLength, false)) {
					// Place the ship vertically
					for (let i = 0; i < shipLength; i++) {
						const shipX = x;
						const shipY = y + i;
						const shipLocation = coordinates.find(loc => loc.x === shipX && loc.y === shipY);
						shipLocation.boat = shipName;
					}
					break;
				} else {
					alert(`${shipName} doesn't fit at this location horizontally or the coordinates are occupied. Please choose a different starting coordinate.`);
				}
			}
		} else {
			alert('Invalid coordinates. Please enter valid coordinates (A-J for X and 1-10 for Y).');
		}
	}
}

function checkCoordinatesOccupied(x, y, length, isHorizontal) {
	if (isHorizontal) {
		for (let i = 0; i < length; i++) {
			const shipX = xCoordinates[xCoordinates.indexOf(x) + i];
			const shipY = y;
			const shipLocation = coordinates.find(loc => loc.x === shipX && loc.y === shipY);
			if (shipLocation.boat !== 'none') {
				return true; // Coordinates are occupied
			}
		}
	} else {
		for (let i = 0; i < length; i++) {
			const shipX = x;
			const shipY = y + i;
			const shipLocation = coordinates.find(loc => loc.x === shipX && loc.y === shipY);
			if (shipLocation.boat !== 'none') {
				return true; // Coordinates are occupied
			}
		}
	}
	return false; // Coordinates are not occupied
}

// Now, initialize the coordinates array and then prompt the user for ship placement for each ship
for (const x of xCoordinates) {
	for (const y of yCoordinates) {
		const location = gameBoard(x, y, 'none');
		coordinates.push(location);
	}
}

// Prompt the user for ship placement for each ship
placeShip(aircraftCarrier);
placeShip(battleship);
placeShip(destroyer);
placeShip(submarine);
placeShip(patrolBoat);

function receiveAttack(x, y) {
	let hit = false; // A flag to track if the attack hits any ship

	for (const location of coordinates) {
		if (location.x === x && location.y === y) {
			if (location.attacked === 'yes') {
				// If the location has already been attacked, do nothing
				return;
			}

			location.attacked = 'yes';

			if (location.boat !== 'none') {
				hit = true; // The attack hits a ship
				// Find the corresponding ship by name and add a hit
                // Change the background color to red when a ship is hit
				const div = document.getElementById(x + y);
				div.style.backgroundColor = 'red';

				switch (location.boat) {
					case 'Aircraft Carrier':
						aircraftCarrier.hit();
						aircraftCarrier.isSunk();
						break;
					case 'Battleship':
						battleship.hit();
						battleship.isSunk();
						break;
					case 'Destroyer':
						destroyer.hit();
						destroyer.isSunk();
						break;
					case 'Submarine':
						submarine.hit();
						submarine.isSunk();
						break;
					case 'Patrol Boat':
						patrolBoat.hit();
						patrolBoat.isSunk();
						break;
				}
			}
		}
	}

	if (!hit) {
		// Display the "It's a miss!" alert and change the background color to grey for misses
		alert("It's a miss!");
		const div = document.getElementById(x + y);
		div.style.backgroundColor = 'grey';
	}
}


// Nested for loop to create objects and div elements for every combination of 'x' and 'y'
for (const x of xCoordinates) {
	for (const y of yCoordinates) {
		const location = gameBoard(x, y, 'none');
		coordinates.push(location);

		const container = document.querySelector('#container');

		// Create a div element with ID of x+y
		const div = document.createElement('div');
		div.id = x + y;
		div.classList.add('grid'); // Add the CSS class 'grid' to the div

		div.addEventListener('click', function () {
			if (location.attacked === 'yes') {
				// If the location has already been attacked, do nothing
				return;
			}

			receiveAttack(x, y);
		});

		// Append the div to the document or another container
		container.appendChild(div);
	}
}


module.exports = {
	createShip: createShip,
};