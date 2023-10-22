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
	};

	ship.isSunk = function () {
		if (ship.hits === ship.length) {
			ship.sunk = 'Yes';
		}
	};

	// Return the object
	return ship;
}

createShip('Aircraft Carrier', 5, 0, 'No');
createShip('Battleship', 4, 0, 'No');
createShip('Destroyer', 4, 0, 'No');
createShip('Submarine', 3, 0, 'No');
createShip('Patrol Boat', 2, 0, 'No');

function gameBoard(x, y, boat) {
	return {
		x: x,
		y: y,
		boat: boat,
		attacked: false,
	};
}

// Arrays to represent the possible values for 'x' and 'y'
const xCoordinates = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
const yCoordinates = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// Array to store the created objects
const coordinates = [];

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

		div.classList.add(y); // Add a class based on 'y' value to the div
		// You can append additional content or properties to the div if needed
		// For example, div.textContent = 'Some text';

		// Append the div to the document or another container
		container.appendChild(div);
	}
}

// Now, the 'objects' array contains objects for every combination of 'x' and 'y',
// and there is a corresponding div element with an ID for each combination.
console.log(coordinates);

module.exports = {
	createShip: createShip,
};
