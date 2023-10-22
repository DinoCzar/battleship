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
        alert((ship.name) + ' has been hit!');
	};

	ship.isSunk = function () {
		if (ship.hits === ship.length) {
			ship.sunk = 'Yes';
            alert((ship.name) + ' has been sunk!');
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

function receiveAttack(x, y) {
    for (const location of coordinates) {
        if (location.x === x && location.y === y) {
            if (location.attacked === 'yes') {
                // If the location has already been attacked, do nothing
                return;
            }

            location.attacked = 'yes';

            if (location.boat !== 'none') {
                // Find the corresponding ship by name and add a hit
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

            } else {
                alert("It's a miss!");
            }
        }
    }
}

// Nested for loop to create objects and div elements for every combination of 'x' and 'y'
for (const x of xCoordinates) {
	for (const y of yCoordinates) {
		const boat = `Boat at ${x}${y}`;
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
			// Change the background color to red when the div is clicked
			div.style.backgroundColor = 'red';
			// You can add more logic here to handle the attack on the ship, mark hits, etc.
		});

		// Append the div to the document or another container
		container.appendChild(div);
	}
}

// Now, the 'objects' array contains objects for every combination of 'x' and 'y',
// and there is a corresponding div element with an ID for each combination.

module.exports = {
	createShip: createShip,
};
