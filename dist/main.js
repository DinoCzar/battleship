/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((module) => {

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

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDBEQUEwRCxVQUFVO0FBQ3BFLG1FQUFtRSxVQUFVOztBQUU3RTtBQUNBLHlDQUF5QyxVQUFVOztBQUVuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixnQkFBZ0I7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOLGNBQWMsVUFBVTtBQUN4QjtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsZ0JBQWdCO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTixjQUFjLFVBQVU7QUFDeEI7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esa0JBQWtCLFlBQVk7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBLEdBQUc7QUFDSCxrQkFBa0IsWUFBWTtBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2Y7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Esa0JBQWtCOztBQUVsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxnQkFBZ0I7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCOztBQUU3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBOzs7Ozs7VUN6TkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7OztVRXRCQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gY3JlYXRlU2hpcChuYW1lLCBsZW5ndGgsIGhpdHMsIHN1bmspIHtcblx0Ly8gQ3JlYXRlIGFuIGVtcHR5IG9iamVjdFxuXHRjb25zdCBzaGlwID0ge307XG5cblx0Ly8gQXNzaWduIHByb3BlcnRpZXMgdG8gdGhlIG9iamVjdFxuXHRzaGlwLm5hbWUgPSBuYW1lO1xuXHRzaGlwLmxlbmd0aCA9IGxlbmd0aDtcblx0c2hpcC5oaXRzID0gaGl0cztcblx0c2hpcC5zdW5rID0gc3VuaztcblxuXHQvLyBEZWZpbmUgYSBtZXRob2QgZm9yIHRoZSBvYmplY3Rcblx0c2hpcC5oaXQgPSBmdW5jdGlvbiAoKSB7XG5cdFx0c2hpcC5oaXRzICs9IDE7XG5cdFx0YWxlcnQoc2hpcC5uYW1lICsgJyBoYXMgYmVlbiBoaXQhJyk7XG5cdH07XG5cblx0c2hpcC5pc1N1bmsgPSBmdW5jdGlvbiAoKSB7XG5cdFx0aWYgKHNoaXAuaGl0cyA9PT0gc2hpcC5sZW5ndGgpIHtcblx0XHRcdHNoaXAuc3VuayA9ICdZZXMnO1xuXHRcdFx0YWxlcnQoc2hpcC5uYW1lICsgJyBoYXMgYmVlbiBzdW5rIScpO1xuXHRcdH1cblx0fTtcblxuXHQvLyBSZXR1cm4gdGhlIG9iamVjdFxuXHRyZXR1cm4gc2hpcDtcbn1cblxuY29uc3QgYWlyY3JhZnRDYXJyaWVyID0gY3JlYXRlU2hpcCgnQWlyY3JhZnQgQ2FycmllcicsIDUsIDAsICdObycpO1xuY29uc3QgYmF0dGxlc2hpcCA9IGNyZWF0ZVNoaXAoJ0JhdHRsZXNoaXAnLCA0LCAwLCAnTm8nKTtcbmNvbnN0IGRlc3Ryb3llciA9IGNyZWF0ZVNoaXAoJ0Rlc3Ryb3llcicsIDQsIDAsICdObycpO1xuY29uc3Qgc3VibWFyaW5lID0gY3JlYXRlU2hpcCgnU3VibWFyaW5lJywgMywgMCwgJ05vJyk7XG5jb25zdCBwYXRyb2xCb2F0ID0gY3JlYXRlU2hpcCgnUGF0cm9sIEJvYXQnLCAyLCAwLCAnTm8nKTtcblxuZnVuY3Rpb24gZ2FtZUJvYXJkKHgsIHksIGJvYXQpIHtcblx0cmV0dXJuIHtcblx0XHR4OiB4LFxuXHRcdHk6IHksXG5cdFx0Ym9hdDogJ25vbmUnLFxuXHRcdGF0dGFja2VkOiAnbm8nLFxuXHR9O1xufVxuXG4vLyBBcnJheXMgdG8gcmVwcmVzZW50IHRoZSBwb3NzaWJsZSB2YWx1ZXMgZm9yICd4JyBhbmQgJ3knXG5jb25zdCB4Q29vcmRpbmF0ZXMgPSBbJ0EnLCAnQicsICdDJywgJ0QnLCAnRScsICdGJywgJ0cnLCAnSCcsICdJJywgJ0onXTtcbmNvbnN0IHlDb29yZGluYXRlcyA9IFsxLCAyLCAzLCA0LCA1LCA2LCA3LCA4LCA5LCAxMF07XG5cbi8vIEFycmF5IHRvIHN0b3JlIHRoZSBjcmVhdGVkIG9iamVjdHNcbmNvbnN0IGNvb3JkaW5hdGVzID0gW107XG5cbmZ1bmN0aW9uIHBsYWNlU2hpcChzaGlwKSB7XG5cdGNvbnN0IHNoaXBOYW1lID0gc2hpcC5uYW1lO1xuXHRjb25zdCBzaGlwTGVuZ3RoID0gc2hpcC5sZW5ndGg7XG5cblx0d2hpbGUgKHRydWUpIHtcblx0XHRjb25zdCB4ID0gcHJvbXB0KGBFbnRlciB0aGUgc3RhcnRpbmcgWCBjb29yZGluYXRlIGZvciAke3NoaXBOYW1lfSAoQS1KKTpgKTtcblx0XHRjb25zdCB5ID0gcGFyc2VJbnQocHJvbXB0KGBFbnRlciB0aGUgc3RhcnRpbmcgWSBjb29yZGluYXRlIGZvciAke3NoaXBOYW1lfSAoMS0xMCk6YCkpO1xuXG5cdFx0aWYgKHhDb29yZGluYXRlcy5pbmNsdWRlcyh4KSAmJiB5ID49IDEgJiYgeSA8PSAxMCkge1xuXHRcdFx0Y29uc3QgaXNIb3Jpem9udGFsID0gY29uZmlybShgUGxhY2UgJHtzaGlwTmFtZX0gdmVydGljYWxseT8gQ2xpY2sgT0sgZm9yIFllcywgQ2FuY2VsIGZvciBOby5gKTtcblxuXHRcdFx0aWYgKGlzSG9yaXpvbnRhbCkge1xuXHRcdFx0XHQvLyBDaGVjayBpZiB0aGUgc2hpcCBmaXRzIGhvcml6b250YWxseSBhbmQgaWYgdGhlIGNvb3JkaW5hdGVzIGFyZSBhdmFpbGFibGVcblx0XHRcdFx0aWYgKHhDb29yZGluYXRlcy5pbmRleE9mKHgpICsgc2hpcExlbmd0aCA8PSAxMCAmJiAhY2hlY2tDb29yZGluYXRlc09jY3VwaWVkKHgsIHksIHNoaXBMZW5ndGgsIHRydWUpKSB7XG5cdFx0XHRcdFx0Ly8gUGxhY2UgdGhlIHNoaXAgaG9yaXpvbnRhbGx5XG5cdFx0XHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwTGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHRcdGNvbnN0IHNoaXBYID0geENvb3JkaW5hdGVzW3hDb29yZGluYXRlcy5pbmRleE9mKHgpICsgaV07XG5cdFx0XHRcdFx0XHRjb25zdCBzaGlwWSA9IHk7XG5cdFx0XHRcdFx0XHRjb25zdCBzaGlwTG9jYXRpb24gPSBjb29yZGluYXRlcy5maW5kKGxvYyA9PiBsb2MueCA9PT0gc2hpcFggJiYgbG9jLnkgPT09IHNoaXBZKTtcblx0XHRcdFx0XHRcdHNoaXBMb2NhdGlvbi5ib2F0ID0gc2hpcE5hbWU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGFsZXJ0KGAke3NoaXBOYW1lfSBkb2Vzbid0IGZpdCBhdCB0aGlzIGxvY2F0aW9uIHZlcnRpY2FsbHkgb3IgdGhlIGNvb3JkaW5hdGVzIGFyZSBvY2N1cGllZC4gUGxlYXNlIGNob29zZSBhIGRpZmZlcmVudCBzdGFydGluZyBjb29yZGluYXRlLmApO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHQvLyBDaGVjayBpZiB0aGUgc2hpcCBmaXRzIHZlcnRpY2FsbHkgYW5kIGlmIHRoZSBjb29yZGluYXRlcyBhcmUgYXZhaWxhYmxlXG5cdFx0XHRcdGlmICh5ICsgc2hpcExlbmd0aCAtIDEgPD0gMTAgJiYgIWNoZWNrQ29vcmRpbmF0ZXNPY2N1cGllZCh4LCB5LCBzaGlwTGVuZ3RoLCBmYWxzZSkpIHtcblx0XHRcdFx0XHQvLyBQbGFjZSB0aGUgc2hpcCB2ZXJ0aWNhbGx5XG5cdFx0XHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwTGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHRcdGNvbnN0IHNoaXBYID0geDtcblx0XHRcdFx0XHRcdGNvbnN0IHNoaXBZID0geSArIGk7XG5cdFx0XHRcdFx0XHRjb25zdCBzaGlwTG9jYXRpb24gPSBjb29yZGluYXRlcy5maW5kKGxvYyA9PiBsb2MueCA9PT0gc2hpcFggJiYgbG9jLnkgPT09IHNoaXBZKTtcblx0XHRcdFx0XHRcdHNoaXBMb2NhdGlvbi5ib2F0ID0gc2hpcE5hbWU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGFsZXJ0KGAke3NoaXBOYW1lfSBkb2Vzbid0IGZpdCBhdCB0aGlzIGxvY2F0aW9uIGhvcml6b250YWxseSBvciB0aGUgY29vcmRpbmF0ZXMgYXJlIG9jY3VwaWVkLiBQbGVhc2UgY2hvb3NlIGEgZGlmZmVyZW50IHN0YXJ0aW5nIGNvb3JkaW5hdGUuYCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0YWxlcnQoJ0ludmFsaWQgY29vcmRpbmF0ZXMuIFBsZWFzZSBlbnRlciB2YWxpZCBjb29yZGluYXRlcyAoQS1KIGZvciBYIGFuZCAxLTEwIGZvciBZKS4nKTtcblx0XHR9XG5cdH1cbn1cblxuZnVuY3Rpb24gY2hlY2tDb29yZGluYXRlc09jY3VwaWVkKHgsIHksIGxlbmd0aCwgaXNIb3Jpem9udGFsKSB7XG5cdGlmIChpc0hvcml6b250YWwpIHtcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG5cdFx0XHRjb25zdCBzaGlwWCA9IHhDb29yZGluYXRlc1t4Q29vcmRpbmF0ZXMuaW5kZXhPZih4KSArIGldO1xuXHRcdFx0Y29uc3Qgc2hpcFkgPSB5O1xuXHRcdFx0Y29uc3Qgc2hpcExvY2F0aW9uID0gY29vcmRpbmF0ZXMuZmluZChsb2MgPT4gbG9jLnggPT09IHNoaXBYICYmIGxvYy55ID09PSBzaGlwWSk7XG5cdFx0XHRpZiAoc2hpcExvY2F0aW9uLmJvYXQgIT09ICdub25lJykge1xuXHRcdFx0XHRyZXR1cm4gdHJ1ZTsgLy8gQ29vcmRpbmF0ZXMgYXJlIG9jY3VwaWVkXG5cdFx0XHR9XG5cdFx0fVxuXHR9IGVsc2Uge1xuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcblx0XHRcdGNvbnN0IHNoaXBYID0geDtcblx0XHRcdGNvbnN0IHNoaXBZID0geSArIGk7XG5cdFx0XHRjb25zdCBzaGlwTG9jYXRpb24gPSBjb29yZGluYXRlcy5maW5kKGxvYyA9PiBsb2MueCA9PT0gc2hpcFggJiYgbG9jLnkgPT09IHNoaXBZKTtcblx0XHRcdGlmIChzaGlwTG9jYXRpb24uYm9hdCAhPT0gJ25vbmUnKSB7XG5cdFx0XHRcdHJldHVybiB0cnVlOyAvLyBDb29yZGluYXRlcyBhcmUgb2NjdXBpZWRcblx0XHRcdH1cblx0XHR9XG5cdH1cblx0cmV0dXJuIGZhbHNlOyAvLyBDb29yZGluYXRlcyBhcmUgbm90IG9jY3VwaWVkXG59XG5cbi8vIE5vdywgaW5pdGlhbGl6ZSB0aGUgY29vcmRpbmF0ZXMgYXJyYXkgYW5kIHRoZW4gcHJvbXB0IHRoZSB1c2VyIGZvciBzaGlwIHBsYWNlbWVudCBmb3IgZWFjaCBzaGlwXG5mb3IgKGNvbnN0IHggb2YgeENvb3JkaW5hdGVzKSB7XG5cdGZvciAoY29uc3QgeSBvZiB5Q29vcmRpbmF0ZXMpIHtcblx0XHRjb25zdCBsb2NhdGlvbiA9IGdhbWVCb2FyZCh4LCB5LCAnbm9uZScpO1xuXHRcdGNvb3JkaW5hdGVzLnB1c2gobG9jYXRpb24pO1xuXHR9XG59XG5cbi8vIFByb21wdCB0aGUgdXNlciBmb3Igc2hpcCBwbGFjZW1lbnQgZm9yIGVhY2ggc2hpcFxucGxhY2VTaGlwKGFpcmNyYWZ0Q2Fycmllcik7XG5wbGFjZVNoaXAoYmF0dGxlc2hpcCk7XG5wbGFjZVNoaXAoZGVzdHJveWVyKTtcbnBsYWNlU2hpcChzdWJtYXJpbmUpO1xucGxhY2VTaGlwKHBhdHJvbEJvYXQpO1xuXG5mdW5jdGlvbiByZWNlaXZlQXR0YWNrKHgsIHkpIHtcblx0bGV0IGhpdCA9IGZhbHNlOyAvLyBBIGZsYWcgdG8gdHJhY2sgaWYgdGhlIGF0dGFjayBoaXRzIGFueSBzaGlwXG5cblx0Zm9yIChjb25zdCBsb2NhdGlvbiBvZiBjb29yZGluYXRlcykge1xuXHRcdGlmIChsb2NhdGlvbi54ID09PSB4ICYmIGxvY2F0aW9uLnkgPT09IHkpIHtcblx0XHRcdGlmIChsb2NhdGlvbi5hdHRhY2tlZCA9PT0gJ3llcycpIHtcblx0XHRcdFx0Ly8gSWYgdGhlIGxvY2F0aW9uIGhhcyBhbHJlYWR5IGJlZW4gYXR0YWNrZWQsIGRvIG5vdGhpbmdcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHRsb2NhdGlvbi5hdHRhY2tlZCA9ICd5ZXMnO1xuXG5cdFx0XHRpZiAobG9jYXRpb24uYm9hdCAhPT0gJ25vbmUnKSB7XG5cdFx0XHRcdGhpdCA9IHRydWU7IC8vIFRoZSBhdHRhY2sgaGl0cyBhIHNoaXBcblx0XHRcdFx0Ly8gRmluZCB0aGUgY29ycmVzcG9uZGluZyBzaGlwIGJ5IG5hbWUgYW5kIGFkZCBhIGhpdFxuICAgICAgICAgICAgICAgIC8vIENoYW5nZSB0aGUgYmFja2dyb3VuZCBjb2xvciB0byByZWQgd2hlbiBhIHNoaXAgaXMgaGl0XG5cdFx0XHRcdGNvbnN0IGRpdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHggKyB5KTtcblx0XHRcdFx0ZGl2LnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdyZWQnO1xuXG5cdFx0XHRcdHN3aXRjaCAobG9jYXRpb24uYm9hdCkge1xuXHRcdFx0XHRcdGNhc2UgJ0FpcmNyYWZ0IENhcnJpZXInOlxuXHRcdFx0XHRcdFx0YWlyY3JhZnRDYXJyaWVyLmhpdCgpO1xuXHRcdFx0XHRcdFx0YWlyY3JhZnRDYXJyaWVyLmlzU3VuaygpO1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0Y2FzZSAnQmF0dGxlc2hpcCc6XG5cdFx0XHRcdFx0XHRiYXR0bGVzaGlwLmhpdCgpO1xuXHRcdFx0XHRcdFx0YmF0dGxlc2hpcC5pc1N1bmsoKTtcblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdGNhc2UgJ0Rlc3Ryb3llcic6XG5cdFx0XHRcdFx0XHRkZXN0cm95ZXIuaGl0KCk7XG5cdFx0XHRcdFx0XHRkZXN0cm95ZXIuaXNTdW5rKCk7XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRjYXNlICdTdWJtYXJpbmUnOlxuXHRcdFx0XHRcdFx0c3VibWFyaW5lLmhpdCgpO1xuXHRcdFx0XHRcdFx0c3VibWFyaW5lLmlzU3VuaygpO1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0Y2FzZSAnUGF0cm9sIEJvYXQnOlxuXHRcdFx0XHRcdFx0cGF0cm9sQm9hdC5oaXQoKTtcblx0XHRcdFx0XHRcdHBhdHJvbEJvYXQuaXNTdW5rKCk7XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdGlmICghaGl0KSB7XG5cdFx0Ly8gRGlzcGxheSB0aGUgXCJJdCdzIGEgbWlzcyFcIiBhbGVydCBhbmQgY2hhbmdlIHRoZSBiYWNrZ3JvdW5kIGNvbG9yIHRvIGdyZXkgZm9yIG1pc3Nlc1xuXHRcdGFsZXJ0KFwiSXQncyBhIG1pc3MhXCIpO1xuXHRcdGNvbnN0IGRpdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHggKyB5KTtcblx0XHRkaXYuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ2dyZXknO1xuXHR9XG59XG5cblxuLy8gTmVzdGVkIGZvciBsb29wIHRvIGNyZWF0ZSBvYmplY3RzIGFuZCBkaXYgZWxlbWVudHMgZm9yIGV2ZXJ5IGNvbWJpbmF0aW9uIG9mICd4JyBhbmQgJ3knXG5mb3IgKGNvbnN0IHggb2YgeENvb3JkaW5hdGVzKSB7XG5cdGZvciAoY29uc3QgeSBvZiB5Q29vcmRpbmF0ZXMpIHtcblx0XHRjb25zdCBsb2NhdGlvbiA9IGdhbWVCb2FyZCh4LCB5LCAnbm9uZScpO1xuXHRcdGNvb3JkaW5hdGVzLnB1c2gobG9jYXRpb24pO1xuXG5cdFx0Y29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NvbnRhaW5lcicpO1xuXG5cdFx0Ly8gQ3JlYXRlIGEgZGl2IGVsZW1lbnQgd2l0aCBJRCBvZiB4K3lcblx0XHRjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0XHRkaXYuaWQgPSB4ICsgeTtcblx0XHRkaXYuY2xhc3NMaXN0LmFkZCgnZ3JpZCcpOyAvLyBBZGQgdGhlIENTUyBjbGFzcyAnZ3JpZCcgdG8gdGhlIGRpdlxuXG5cdFx0ZGl2LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuXHRcdFx0aWYgKGxvY2F0aW9uLmF0dGFja2VkID09PSAneWVzJykge1xuXHRcdFx0XHQvLyBJZiB0aGUgbG9jYXRpb24gaGFzIGFscmVhZHkgYmVlbiBhdHRhY2tlZCwgZG8gbm90aGluZ1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdHJlY2VpdmVBdHRhY2soeCwgeSk7XG5cdFx0fSk7XG5cblx0XHQvLyBBcHBlbmQgdGhlIGRpdiB0byB0aGUgZG9jdW1lbnQgb3IgYW5vdGhlciBjb250YWluZXJcblx0XHRjb250YWluZXIuYXBwZW5kQ2hpbGQoZGl2KTtcblx0fVxufVxuXG5cbm1vZHVsZS5leHBvcnRzID0ge1xuXHRjcmVhdGVTaGlwOiBjcmVhdGVTaGlwLFxufTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=