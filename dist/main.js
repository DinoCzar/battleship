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
			const isHorizontal = confirm(`Place ${shipName} horizontally? Click OK for Yes, Cancel for No.`);

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
					alert(`${shipName} doesn't fit at this location horizontally or the coordinates are occupied. Please choose a different starting coordinate.`);
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
					alert(`${shipName} doesn't fit at this location vertically or the coordinates are occupied. Please choose a different starting coordinate.`);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDBEQUEwRCxVQUFVO0FBQ3BFLG1FQUFtRSxVQUFVOztBQUU3RTtBQUNBLHlDQUF5QyxVQUFVOztBQUVuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixnQkFBZ0I7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOLGNBQWMsVUFBVTtBQUN4QjtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsZ0JBQWdCO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTixjQUFjLFVBQVU7QUFDeEI7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esa0JBQWtCLFlBQVk7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBLEdBQUc7QUFDSCxrQkFBa0IsWUFBWTtBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2Y7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCOztBQUU3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBOzs7Ozs7VUMvTUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7OztVRXRCQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gY3JlYXRlU2hpcChuYW1lLCBsZW5ndGgsIGhpdHMsIHN1bmspIHtcblx0Ly8gQ3JlYXRlIGFuIGVtcHR5IG9iamVjdFxuXHRjb25zdCBzaGlwID0ge307XG5cblx0Ly8gQXNzaWduIHByb3BlcnRpZXMgdG8gdGhlIG9iamVjdFxuXHRzaGlwLm5hbWUgPSBuYW1lO1xuXHRzaGlwLmxlbmd0aCA9IGxlbmd0aDtcblx0c2hpcC5oaXRzID0gaGl0cztcblx0c2hpcC5zdW5rID0gc3VuaztcblxuXHQvLyBEZWZpbmUgYSBtZXRob2QgZm9yIHRoZSBvYmplY3Rcblx0c2hpcC5oaXQgPSBmdW5jdGlvbiAoKSB7XG5cdFx0c2hpcC5oaXRzICs9IDE7XG5cdFx0YWxlcnQoc2hpcC5uYW1lICsgJyBoYXMgYmVlbiBoaXQhJyk7XG5cdH07XG5cblx0c2hpcC5pc1N1bmsgPSBmdW5jdGlvbiAoKSB7XG5cdFx0aWYgKHNoaXAuaGl0cyA9PT0gc2hpcC5sZW5ndGgpIHtcblx0XHRcdHNoaXAuc3VuayA9ICdZZXMnO1xuXHRcdFx0YWxlcnQoc2hpcC5uYW1lICsgJyBoYXMgYmVlbiBzdW5rIScpO1xuXHRcdH1cblx0fTtcblxuXHQvLyBSZXR1cm4gdGhlIG9iamVjdFxuXHRyZXR1cm4gc2hpcDtcbn1cblxuY29uc3QgYWlyY3JhZnRDYXJyaWVyID0gY3JlYXRlU2hpcCgnQWlyY3JhZnQgQ2FycmllcicsIDUsIDAsICdObycpO1xuY29uc3QgYmF0dGxlc2hpcCA9IGNyZWF0ZVNoaXAoJ0JhdHRsZXNoaXAnLCA0LCAwLCAnTm8nKTtcbmNvbnN0IGRlc3Ryb3llciA9IGNyZWF0ZVNoaXAoJ0Rlc3Ryb3llcicsIDQsIDAsICdObycpO1xuY29uc3Qgc3VibWFyaW5lID0gY3JlYXRlU2hpcCgnU3VibWFyaW5lJywgMywgMCwgJ05vJyk7XG5jb25zdCBwYXRyb2xCb2F0ID0gY3JlYXRlU2hpcCgnUGF0cm9sIEJvYXQnLCAyLCAwLCAnTm8nKTtcblxuZnVuY3Rpb24gZ2FtZUJvYXJkKHgsIHksIGJvYXQpIHtcblx0cmV0dXJuIHtcblx0XHR4OiB4LFxuXHRcdHk6IHksXG5cdFx0Ym9hdDogJ25vbmUnLFxuXHRcdGF0dGFja2VkOiAnbm8nLFxuXHR9O1xufVxuXG4vLyBBcnJheXMgdG8gcmVwcmVzZW50IHRoZSBwb3NzaWJsZSB2YWx1ZXMgZm9yICd4JyBhbmQgJ3knXG5jb25zdCB4Q29vcmRpbmF0ZXMgPSBbJ0EnLCAnQicsICdDJywgJ0QnLCAnRScsICdGJywgJ0cnLCAnSCcsICdJJywgJ0onXTtcbmNvbnN0IHlDb29yZGluYXRlcyA9IFsxLCAyLCAzLCA0LCA1LCA2LCA3LCA4LCA5LCAxMF07XG5cbi8vIEFycmF5IHRvIHN0b3JlIHRoZSBjcmVhdGVkIG9iamVjdHNcbmNvbnN0IGNvb3JkaW5hdGVzID0gW107XG5cbmZ1bmN0aW9uIHBsYWNlU2hpcChzaGlwKSB7XG5cdGNvbnN0IHNoaXBOYW1lID0gc2hpcC5uYW1lO1xuXHRjb25zdCBzaGlwTGVuZ3RoID0gc2hpcC5sZW5ndGg7XG5cblx0d2hpbGUgKHRydWUpIHtcblx0XHRjb25zdCB4ID0gcHJvbXB0KGBFbnRlciB0aGUgc3RhcnRpbmcgWCBjb29yZGluYXRlIGZvciAke3NoaXBOYW1lfSAoQS1KKTpgKTtcblx0XHRjb25zdCB5ID0gcGFyc2VJbnQocHJvbXB0KGBFbnRlciB0aGUgc3RhcnRpbmcgWSBjb29yZGluYXRlIGZvciAke3NoaXBOYW1lfSAoMS0xMCk6YCkpO1xuXG5cdFx0aWYgKHhDb29yZGluYXRlcy5pbmNsdWRlcyh4KSAmJiB5ID49IDEgJiYgeSA8PSAxMCkge1xuXHRcdFx0Y29uc3QgaXNIb3Jpem9udGFsID0gY29uZmlybShgUGxhY2UgJHtzaGlwTmFtZX0gaG9yaXpvbnRhbGx5PyBDbGljayBPSyBmb3IgWWVzLCBDYW5jZWwgZm9yIE5vLmApO1xuXG5cdFx0XHRpZiAoaXNIb3Jpem9udGFsKSB7XG5cdFx0XHRcdC8vIENoZWNrIGlmIHRoZSBzaGlwIGZpdHMgaG9yaXpvbnRhbGx5IGFuZCBpZiB0aGUgY29vcmRpbmF0ZXMgYXJlIGF2YWlsYWJsZVxuXHRcdFx0XHRpZiAoeENvb3JkaW5hdGVzLmluZGV4T2YoeCkgKyBzaGlwTGVuZ3RoIDw9IDEwICYmICFjaGVja0Nvb3JkaW5hdGVzT2NjdXBpZWQoeCwgeSwgc2hpcExlbmd0aCwgdHJ1ZSkpIHtcblx0XHRcdFx0XHQvLyBQbGFjZSB0aGUgc2hpcCBob3Jpem9udGFsbHlcblx0XHRcdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHNoaXBMZW5ndGg7IGkrKykge1xuXHRcdFx0XHRcdFx0Y29uc3Qgc2hpcFggPSB4Q29vcmRpbmF0ZXNbeENvb3JkaW5hdGVzLmluZGV4T2YoeCkgKyBpXTtcblx0XHRcdFx0XHRcdGNvbnN0IHNoaXBZID0geTtcblx0XHRcdFx0XHRcdGNvbnN0IHNoaXBMb2NhdGlvbiA9IGNvb3JkaW5hdGVzLmZpbmQobG9jID0+IGxvYy54ID09PSBzaGlwWCAmJiBsb2MueSA9PT0gc2hpcFkpO1xuXHRcdFx0XHRcdFx0c2hpcExvY2F0aW9uLmJvYXQgPSBzaGlwTmFtZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0YWxlcnQoYCR7c2hpcE5hbWV9IGRvZXNuJ3QgZml0IGF0IHRoaXMgbG9jYXRpb24gaG9yaXpvbnRhbGx5IG9yIHRoZSBjb29yZGluYXRlcyBhcmUgb2NjdXBpZWQuIFBsZWFzZSBjaG9vc2UgYSBkaWZmZXJlbnQgc3RhcnRpbmcgY29vcmRpbmF0ZS5gKTtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Ly8gQ2hlY2sgaWYgdGhlIHNoaXAgZml0cyB2ZXJ0aWNhbGx5IGFuZCBpZiB0aGUgY29vcmRpbmF0ZXMgYXJlIGF2YWlsYWJsZVxuXHRcdFx0XHRpZiAoeSArIHNoaXBMZW5ndGggLSAxIDw9IDEwICYmICFjaGVja0Nvb3JkaW5hdGVzT2NjdXBpZWQoeCwgeSwgc2hpcExlbmd0aCwgZmFsc2UpKSB7XG5cdFx0XHRcdFx0Ly8gUGxhY2UgdGhlIHNoaXAgdmVydGljYWxseVxuXHRcdFx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcExlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdFx0XHRjb25zdCBzaGlwWCA9IHg7XG5cdFx0XHRcdFx0XHRjb25zdCBzaGlwWSA9IHkgKyBpO1xuXHRcdFx0XHRcdFx0Y29uc3Qgc2hpcExvY2F0aW9uID0gY29vcmRpbmF0ZXMuZmluZChsb2MgPT4gbG9jLnggPT09IHNoaXBYICYmIGxvYy55ID09PSBzaGlwWSk7XG5cdFx0XHRcdFx0XHRzaGlwTG9jYXRpb24uYm9hdCA9IHNoaXBOYW1lO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRhbGVydChgJHtzaGlwTmFtZX0gZG9lc24ndCBmaXQgYXQgdGhpcyBsb2NhdGlvbiB2ZXJ0aWNhbGx5IG9yIHRoZSBjb29yZGluYXRlcyBhcmUgb2NjdXBpZWQuIFBsZWFzZSBjaG9vc2UgYSBkaWZmZXJlbnQgc3RhcnRpbmcgY29vcmRpbmF0ZS5gKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRhbGVydCgnSW52YWxpZCBjb29yZGluYXRlcy4gUGxlYXNlIGVudGVyIHZhbGlkIGNvb3JkaW5hdGVzIChBLUogZm9yIFggYW5kIDEtMTAgZm9yIFkpLicpO1xuXHRcdH1cblx0fVxufVxuXG5mdW5jdGlvbiBjaGVja0Nvb3JkaW5hdGVzT2NjdXBpZWQoeCwgeSwgbGVuZ3RoLCBpc0hvcml6b250YWwpIHtcblx0aWYgKGlzSG9yaXpvbnRhbCkge1xuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcblx0XHRcdGNvbnN0IHNoaXBYID0geENvb3JkaW5hdGVzW3hDb29yZGluYXRlcy5pbmRleE9mKHgpICsgaV07XG5cdFx0XHRjb25zdCBzaGlwWSA9IHk7XG5cdFx0XHRjb25zdCBzaGlwTG9jYXRpb24gPSBjb29yZGluYXRlcy5maW5kKGxvYyA9PiBsb2MueCA9PT0gc2hpcFggJiYgbG9jLnkgPT09IHNoaXBZKTtcblx0XHRcdGlmIChzaGlwTG9jYXRpb24uYm9hdCAhPT0gJ25vbmUnKSB7XG5cdFx0XHRcdHJldHVybiB0cnVlOyAvLyBDb29yZGluYXRlcyBhcmUgb2NjdXBpZWRcblx0XHRcdH1cblx0XHR9XG5cdH0gZWxzZSB7XG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuXHRcdFx0Y29uc3Qgc2hpcFggPSB4O1xuXHRcdFx0Y29uc3Qgc2hpcFkgPSB5ICsgaTtcblx0XHRcdGNvbnN0IHNoaXBMb2NhdGlvbiA9IGNvb3JkaW5hdGVzLmZpbmQobG9jID0+IGxvYy54ID09PSBzaGlwWCAmJiBsb2MueSA9PT0gc2hpcFkpO1xuXHRcdFx0aWYgKHNoaXBMb2NhdGlvbi5ib2F0ICE9PSAnbm9uZScpIHtcblx0XHRcdFx0cmV0dXJuIHRydWU7IC8vIENvb3JkaW5hdGVzIGFyZSBvY2N1cGllZFxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXHRyZXR1cm4gZmFsc2U7IC8vIENvb3JkaW5hdGVzIGFyZSBub3Qgb2NjdXBpZWRcbn1cblxuLy8gTm93LCBpbml0aWFsaXplIHRoZSBjb29yZGluYXRlcyBhcnJheSBhbmQgdGhlbiBwcm9tcHQgdGhlIHVzZXIgZm9yIHNoaXAgcGxhY2VtZW50IGZvciBlYWNoIHNoaXBcbmZvciAoY29uc3QgeCBvZiB4Q29vcmRpbmF0ZXMpIHtcblx0Zm9yIChjb25zdCB5IG9mIHlDb29yZGluYXRlcykge1xuXHRcdGNvbnN0IGxvY2F0aW9uID0gZ2FtZUJvYXJkKHgsIHksICdub25lJyk7XG5cdFx0Y29vcmRpbmF0ZXMucHVzaChsb2NhdGlvbik7XG5cdH1cbn1cblxuLy8gUHJvbXB0IHRoZSB1c2VyIGZvciBzaGlwIHBsYWNlbWVudCBmb3IgZWFjaCBzaGlwXG5wbGFjZVNoaXAoYWlyY3JhZnRDYXJyaWVyKTtcbnBsYWNlU2hpcChiYXR0bGVzaGlwKTtcbnBsYWNlU2hpcChkZXN0cm95ZXIpO1xucGxhY2VTaGlwKHN1Ym1hcmluZSk7XG5wbGFjZVNoaXAocGF0cm9sQm9hdCk7XG5cbmZ1bmN0aW9uIHJlY2VpdmVBdHRhY2soeCwgeSkge1xuXHRmb3IgKGNvbnN0IGxvY2F0aW9uIG9mIGNvb3JkaW5hdGVzKSB7XG5cdFx0aWYgKGxvY2F0aW9uLnggPT09IHggJiYgbG9jYXRpb24ueSA9PT0geSkge1xuXHRcdFx0aWYgKGxvY2F0aW9uLmF0dGFja2VkID09PSAneWVzJykge1xuXHRcdFx0XHQvLyBJZiB0aGUgbG9jYXRpb24gaGFzIGFscmVhZHkgYmVlbiBhdHRhY2tlZCwgZG8gbm90aGluZ1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdGxvY2F0aW9uLmF0dGFja2VkID0gJ3llcyc7XG5cblx0XHRcdGlmIChsb2NhdGlvbi5ib2F0ICE9PSAnbm9uZScpIHtcblx0XHRcdFx0Ly8gRmluZCB0aGUgY29ycmVzcG9uZGluZyBzaGlwIGJ5IG5hbWUgYW5kIGFkZCBhIGhpdFxuXHRcdFx0XHRzd2l0Y2ggKGxvY2F0aW9uLmJvYXQpIHtcblx0XHRcdFx0XHRjYXNlICdBaXJjcmFmdCBDYXJyaWVyJzpcblx0XHRcdFx0XHRcdGFpcmNyYWZ0Q2Fycmllci5oaXQoKTtcblx0XHRcdFx0XHRcdGFpcmNyYWZ0Q2Fycmllci5pc1N1bmsoKTtcblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdGNhc2UgJ0JhdHRsZXNoaXAnOlxuXHRcdFx0XHRcdFx0YmF0dGxlc2hpcC5oaXQoKTtcblx0XHRcdFx0XHRcdGJhdHRsZXNoaXAuaXNTdW5rKCk7XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRjYXNlICdEZXN0cm95ZXInOlxuXHRcdFx0XHRcdFx0ZGVzdHJveWVyLmhpdCgpO1xuXHRcdFx0XHRcdFx0ZGVzdHJveWVyLmlzU3VuaygpO1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0Y2FzZSAnU3VibWFyaW5lJzpcblx0XHRcdFx0XHRcdHN1Ym1hcmluZS5oaXQoKTtcblx0XHRcdFx0XHRcdHN1Ym1hcmluZS5pc1N1bmsoKTtcblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdGNhc2UgJ1BhdHJvbCBCb2F0Jzpcblx0XHRcdFx0XHRcdHBhdHJvbEJvYXQuaGl0KCk7XG5cdFx0XHRcdFx0XHRwYXRyb2xCb2F0LmlzU3VuaygpO1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGFsZXJ0KFwiSXQncyBhIG1pc3MhXCIpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxufVxuXG4vLyBOZXN0ZWQgZm9yIGxvb3AgdG8gY3JlYXRlIG9iamVjdHMgYW5kIGRpdiBlbGVtZW50cyBmb3IgZXZlcnkgY29tYmluYXRpb24gb2YgJ3gnIGFuZCAneSdcbmZvciAoY29uc3QgeCBvZiB4Q29vcmRpbmF0ZXMpIHtcblx0Zm9yIChjb25zdCB5IG9mIHlDb29yZGluYXRlcykge1xuXHRcdGNvbnN0IGxvY2F0aW9uID0gZ2FtZUJvYXJkKHgsIHksICdub25lJyk7XG5cdFx0Y29vcmRpbmF0ZXMucHVzaChsb2NhdGlvbik7XG5cblx0XHRjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY29udGFpbmVyJyk7XG5cblx0XHQvLyBDcmVhdGUgYSBkaXYgZWxlbWVudCB3aXRoIElEIG9mIHgreVxuXHRcdGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHRcdGRpdi5pZCA9IHggKyB5O1xuXHRcdGRpdi5jbGFzc0xpc3QuYWRkKCdncmlkJyk7IC8vIEFkZCB0aGUgQ1NTIGNsYXNzICdncmlkJyB0byB0aGUgZGl2XG5cblx0XHRkaXYuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRpZiAobG9jYXRpb24uYXR0YWNrZWQgPT09ICd5ZXMnKSB7XG5cdFx0XHRcdC8vIElmIHRoZSBsb2NhdGlvbiBoYXMgYWxyZWFkeSBiZWVuIGF0dGFja2VkLCBkbyBub3RoaW5nXG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0cmVjZWl2ZUF0dGFjayh4LCB5KTtcblx0XHRcdC8vIENoYW5nZSB0aGUgYmFja2dyb3VuZCBjb2xvciB0byByZWQgd2hlbiB0aGUgZGl2IGlzIGNsaWNrZWRcblx0XHRcdGRpdi5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAncmVkJztcblx0XHRcdC8vIFlvdSBjYW4gYWRkIG1vcmUgbG9naWMgaGVyZSB0byBoYW5kbGUgdGhlIGF0dGFjayBvbiB0aGUgc2hpcCwgbWFyayBoaXRzLCBldGMuXG5cdFx0fSk7XG5cblx0XHQvLyBBcHBlbmQgdGhlIGRpdiB0byB0aGUgZG9jdW1lbnQgb3IgYW5vdGhlciBjb250YWluZXJcblx0XHRjb250YWluZXIuYXBwZW5kQ2hpbGQoZGl2KTtcblx0fVxufVxuXG5cbm1vZHVsZS5leHBvcnRzID0ge1xuXHRjcmVhdGVTaGlwOiBjcmVhdGVTaGlwLFxufTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=