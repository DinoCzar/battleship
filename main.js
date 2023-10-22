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

// Function to prompt the user for ship placement
function placeShip(ship) {
	const shipName = ship.name;
	const shipLength = ship.length;

	while (true) {
		const x = prompt(`Enter the starting X coordinate for ${shipName} (A-J):`);
		const y = parseInt(prompt(`Enter the starting Y coordinate for ${shipName} (1-10):`));

		if (xCoordinates.includes(x) && y >= 1 && y <= 10) {
			const isHorizontal = confirm(`Place ${shipName} horizontally? Click OK for Yes, Cancel for No.`);

			if (isHorizontal) {
				// Check if the ship fits horizontally
				if (xCoordinates.indexOf(x) + shipLength <= 10) {
					// Place the ship horizontally
					for (let i = 0; i < shipLength; i++) {
						const shipX = xCoordinates[xCoordinates.indexOf(x) + i];
						const shipY = y;
						const shipLocation = coordinates.find(loc => loc.x === shipX && loc.y === shipY);
						shipLocation.boat = shipName;
					}
					break;
				} else {
					alert(`${shipName} doesn't fit at this location horizontally. Please choose a different starting coordinate.`);
				}
			} else {
				// Check if the ship fits vertically
				if (y + shipLength - 1 <= 10) {
					// Place the ship vertically
					for (let i = 0; i < shipLength; i++) {
						const shipX = x;
						const shipY = y + i;
						const shipLocation = coordinates.find(loc => loc.x === shipX && loc.y === shipY);
						shipLocation.boat = shipName;
					}
					break;
				} else {
					alert(`${shipName} doesn't fit at this location vertically. Please choose a different starting coordinate.`);
				}
			}
		} else {
			alert('Invalid coordinates. Please enter valid coordinates (A-J for X and 1-10 for Y).');
		}
	}
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsMERBQTBELFVBQVU7QUFDcEUsbUVBQW1FLFVBQVU7O0FBRTdFO0FBQ0EseUNBQXlDLFVBQVU7O0FBRW5EO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLGdCQUFnQjtBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ04sY0FBYyxVQUFVO0FBQ3hCO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixnQkFBZ0I7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOLGNBQWMsVUFBVTtBQUN4QjtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2Qjs7QUFFN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7Ozs7OztVQ3pMQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7O1VFdEJBO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiBjcmVhdGVTaGlwKG5hbWUsIGxlbmd0aCwgaGl0cywgc3Vuaykge1xuXHQvLyBDcmVhdGUgYW4gZW1wdHkgb2JqZWN0XG5cdGNvbnN0IHNoaXAgPSB7fTtcblxuXHQvLyBBc3NpZ24gcHJvcGVydGllcyB0byB0aGUgb2JqZWN0XG5cdHNoaXAubmFtZSA9IG5hbWU7XG5cdHNoaXAubGVuZ3RoID0gbGVuZ3RoO1xuXHRzaGlwLmhpdHMgPSBoaXRzO1xuXHRzaGlwLnN1bmsgPSBzdW5rO1xuXG5cdC8vIERlZmluZSBhIG1ldGhvZCBmb3IgdGhlIG9iamVjdFxuXHRzaGlwLmhpdCA9IGZ1bmN0aW9uICgpIHtcblx0XHRzaGlwLmhpdHMgKz0gMTtcblx0XHRhbGVydChzaGlwLm5hbWUgKyAnIGhhcyBiZWVuIGhpdCEnKTtcblx0fTtcblxuXHRzaGlwLmlzU3VuayA9IGZ1bmN0aW9uICgpIHtcblx0XHRpZiAoc2hpcC5oaXRzID09PSBzaGlwLmxlbmd0aCkge1xuXHRcdFx0c2hpcC5zdW5rID0gJ1llcyc7XG5cdFx0XHRhbGVydChzaGlwLm5hbWUgKyAnIGhhcyBiZWVuIHN1bmshJyk7XG5cdFx0fVxuXHR9O1xuXG5cdC8vIFJldHVybiB0aGUgb2JqZWN0XG5cdHJldHVybiBzaGlwO1xufVxuXG5jb25zdCBhaXJjcmFmdENhcnJpZXIgPSBjcmVhdGVTaGlwKCdBaXJjcmFmdCBDYXJyaWVyJywgNSwgMCwgJ05vJyk7XG5jb25zdCBiYXR0bGVzaGlwID0gY3JlYXRlU2hpcCgnQmF0dGxlc2hpcCcsIDQsIDAsICdObycpO1xuY29uc3QgZGVzdHJveWVyID0gY3JlYXRlU2hpcCgnRGVzdHJveWVyJywgNCwgMCwgJ05vJyk7XG5jb25zdCBzdWJtYXJpbmUgPSBjcmVhdGVTaGlwKCdTdWJtYXJpbmUnLCAzLCAwLCAnTm8nKTtcbmNvbnN0IHBhdHJvbEJvYXQgPSBjcmVhdGVTaGlwKCdQYXRyb2wgQm9hdCcsIDIsIDAsICdObycpO1xuXG5mdW5jdGlvbiBnYW1lQm9hcmQoeCwgeSwgYm9hdCkge1xuXHRyZXR1cm4ge1xuXHRcdHg6IHgsXG5cdFx0eTogeSxcblx0XHRib2F0OiAnbm9uZScsXG5cdFx0YXR0YWNrZWQ6ICdubycsXG5cdH07XG59XG5cbi8vIEFycmF5cyB0byByZXByZXNlbnQgdGhlIHBvc3NpYmxlIHZhbHVlcyBmb3IgJ3gnIGFuZCAneSdcbmNvbnN0IHhDb29yZGluYXRlcyA9IFsnQScsICdCJywgJ0MnLCAnRCcsICdFJywgJ0YnLCAnRycsICdIJywgJ0knLCAnSiddO1xuY29uc3QgeUNvb3JkaW5hdGVzID0gWzEsIDIsIDMsIDQsIDUsIDYsIDcsIDgsIDksIDEwXTtcblxuLy8gQXJyYXkgdG8gc3RvcmUgdGhlIGNyZWF0ZWQgb2JqZWN0c1xuY29uc3QgY29vcmRpbmF0ZXMgPSBbXTtcblxuLy8gRnVuY3Rpb24gdG8gcHJvbXB0IHRoZSB1c2VyIGZvciBzaGlwIHBsYWNlbWVudFxuZnVuY3Rpb24gcGxhY2VTaGlwKHNoaXApIHtcblx0Y29uc3Qgc2hpcE5hbWUgPSBzaGlwLm5hbWU7XG5cdGNvbnN0IHNoaXBMZW5ndGggPSBzaGlwLmxlbmd0aDtcblxuXHR3aGlsZSAodHJ1ZSkge1xuXHRcdGNvbnN0IHggPSBwcm9tcHQoYEVudGVyIHRoZSBzdGFydGluZyBYIGNvb3JkaW5hdGUgZm9yICR7c2hpcE5hbWV9IChBLUopOmApO1xuXHRcdGNvbnN0IHkgPSBwYXJzZUludChwcm9tcHQoYEVudGVyIHRoZSBzdGFydGluZyBZIGNvb3JkaW5hdGUgZm9yICR7c2hpcE5hbWV9ICgxLTEwKTpgKSk7XG5cblx0XHRpZiAoeENvb3JkaW5hdGVzLmluY2x1ZGVzKHgpICYmIHkgPj0gMSAmJiB5IDw9IDEwKSB7XG5cdFx0XHRjb25zdCBpc0hvcml6b250YWwgPSBjb25maXJtKGBQbGFjZSAke3NoaXBOYW1lfSBob3Jpem9udGFsbHk/IENsaWNrIE9LIGZvciBZZXMsIENhbmNlbCBmb3IgTm8uYCk7XG5cblx0XHRcdGlmIChpc0hvcml6b250YWwpIHtcblx0XHRcdFx0Ly8gQ2hlY2sgaWYgdGhlIHNoaXAgZml0cyBob3Jpem9udGFsbHlcblx0XHRcdFx0aWYgKHhDb29yZGluYXRlcy5pbmRleE9mKHgpICsgc2hpcExlbmd0aCA8PSAxMCkge1xuXHRcdFx0XHRcdC8vIFBsYWNlIHRoZSBzaGlwIGhvcml6b250YWxseVxuXHRcdFx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcExlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdFx0XHRjb25zdCBzaGlwWCA9IHhDb29yZGluYXRlc1t4Q29vcmRpbmF0ZXMuaW5kZXhPZih4KSArIGldO1xuXHRcdFx0XHRcdFx0Y29uc3Qgc2hpcFkgPSB5O1xuXHRcdFx0XHRcdFx0Y29uc3Qgc2hpcExvY2F0aW9uID0gY29vcmRpbmF0ZXMuZmluZChsb2MgPT4gbG9jLnggPT09IHNoaXBYICYmIGxvYy55ID09PSBzaGlwWSk7XG5cdFx0XHRcdFx0XHRzaGlwTG9jYXRpb24uYm9hdCA9IHNoaXBOYW1lO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRhbGVydChgJHtzaGlwTmFtZX0gZG9lc24ndCBmaXQgYXQgdGhpcyBsb2NhdGlvbiBob3Jpem9udGFsbHkuIFBsZWFzZSBjaG9vc2UgYSBkaWZmZXJlbnQgc3RhcnRpbmcgY29vcmRpbmF0ZS5gKTtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Ly8gQ2hlY2sgaWYgdGhlIHNoaXAgZml0cyB2ZXJ0aWNhbGx5XG5cdFx0XHRcdGlmICh5ICsgc2hpcExlbmd0aCAtIDEgPD0gMTApIHtcblx0XHRcdFx0XHQvLyBQbGFjZSB0aGUgc2hpcCB2ZXJ0aWNhbGx5XG5cdFx0XHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwTGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHRcdGNvbnN0IHNoaXBYID0geDtcblx0XHRcdFx0XHRcdGNvbnN0IHNoaXBZID0geSArIGk7XG5cdFx0XHRcdFx0XHRjb25zdCBzaGlwTG9jYXRpb24gPSBjb29yZGluYXRlcy5maW5kKGxvYyA9PiBsb2MueCA9PT0gc2hpcFggJiYgbG9jLnkgPT09IHNoaXBZKTtcblx0XHRcdFx0XHRcdHNoaXBMb2NhdGlvbi5ib2F0ID0gc2hpcE5hbWU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGFsZXJ0KGAke3NoaXBOYW1lfSBkb2Vzbid0IGZpdCBhdCB0aGlzIGxvY2F0aW9uIHZlcnRpY2FsbHkuIFBsZWFzZSBjaG9vc2UgYSBkaWZmZXJlbnQgc3RhcnRpbmcgY29vcmRpbmF0ZS5gKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRhbGVydCgnSW52YWxpZCBjb29yZGluYXRlcy4gUGxlYXNlIGVudGVyIHZhbGlkIGNvb3JkaW5hdGVzIChBLUogZm9yIFggYW5kIDEtMTAgZm9yIFkpLicpO1xuXHRcdH1cblx0fVxufVxuXG4vLyBOb3csIGluaXRpYWxpemUgdGhlIGNvb3JkaW5hdGVzIGFycmF5IGFuZCB0aGVuIHByb21wdCB0aGUgdXNlciBmb3Igc2hpcCBwbGFjZW1lbnQgZm9yIGVhY2ggc2hpcFxuZm9yIChjb25zdCB4IG9mIHhDb29yZGluYXRlcykge1xuXHRmb3IgKGNvbnN0IHkgb2YgeUNvb3JkaW5hdGVzKSB7XG5cdFx0Y29uc3QgbG9jYXRpb24gPSBnYW1lQm9hcmQoeCwgeSwgJ25vbmUnKTtcblx0XHRjb29yZGluYXRlcy5wdXNoKGxvY2F0aW9uKTtcblx0fVxufVxuXG4vLyBQcm9tcHQgdGhlIHVzZXIgZm9yIHNoaXAgcGxhY2VtZW50IGZvciBlYWNoIHNoaXBcbnBsYWNlU2hpcChhaXJjcmFmdENhcnJpZXIpO1xucGxhY2VTaGlwKGJhdHRsZXNoaXApO1xucGxhY2VTaGlwKGRlc3Ryb3llcik7XG5wbGFjZVNoaXAoc3VibWFyaW5lKTtcbnBsYWNlU2hpcChwYXRyb2xCb2F0KTtcblxuZnVuY3Rpb24gcmVjZWl2ZUF0dGFjayh4LCB5KSB7XG5cdGZvciAoY29uc3QgbG9jYXRpb24gb2YgY29vcmRpbmF0ZXMpIHtcblx0XHRpZiAobG9jYXRpb24ueCA9PT0geCAmJiBsb2NhdGlvbi55ID09PSB5KSB7XG5cdFx0XHRpZiAobG9jYXRpb24uYXR0YWNrZWQgPT09ICd5ZXMnKSB7XG5cdFx0XHRcdC8vIElmIHRoZSBsb2NhdGlvbiBoYXMgYWxyZWFkeSBiZWVuIGF0dGFja2VkLCBkbyBub3RoaW5nXG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0bG9jYXRpb24uYXR0YWNrZWQgPSAneWVzJztcblxuXHRcdFx0aWYgKGxvY2F0aW9uLmJvYXQgIT09ICdub25lJykge1xuXHRcdFx0XHQvLyBGaW5kIHRoZSBjb3JyZXNwb25kaW5nIHNoaXAgYnkgbmFtZSBhbmQgYWRkIGEgaGl0XG5cdFx0XHRcdHN3aXRjaCAobG9jYXRpb24uYm9hdCkge1xuXHRcdFx0XHRcdGNhc2UgJ0FpcmNyYWZ0IENhcnJpZXInOlxuXHRcdFx0XHRcdFx0YWlyY3JhZnRDYXJyaWVyLmhpdCgpO1xuXHRcdFx0XHRcdFx0YWlyY3JhZnRDYXJyaWVyLmlzU3VuaygpO1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0Y2FzZSAnQmF0dGxlc2hpcCc6XG5cdFx0XHRcdFx0XHRiYXR0bGVzaGlwLmhpdCgpO1xuXHRcdFx0XHRcdFx0YmF0dGxlc2hpcC5pc1N1bmsoKTtcblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdGNhc2UgJ0Rlc3Ryb3llcic6XG5cdFx0XHRcdFx0XHRkZXN0cm95ZXIuaGl0KCk7XG5cdFx0XHRcdFx0XHRkZXN0cm95ZXIuaXNTdW5rKCk7XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRjYXNlICdTdWJtYXJpbmUnOlxuXHRcdFx0XHRcdFx0c3VibWFyaW5lLmhpdCgpO1xuXHRcdFx0XHRcdFx0c3VibWFyaW5lLmlzU3VuaygpO1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0Y2FzZSAnUGF0cm9sIEJvYXQnOlxuXHRcdFx0XHRcdFx0cGF0cm9sQm9hdC5oaXQoKTtcblx0XHRcdFx0XHRcdHBhdHJvbEJvYXQuaXNTdW5rKCk7XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0YWxlcnQoXCJJdCdzIGEgbWlzcyFcIik7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG59XG5cbi8vIE5lc3RlZCBmb3IgbG9vcCB0byBjcmVhdGUgb2JqZWN0cyBhbmQgZGl2IGVsZW1lbnRzIGZvciBldmVyeSBjb21iaW5hdGlvbiBvZiAneCcgYW5kICd5J1xuZm9yIChjb25zdCB4IG9mIHhDb29yZGluYXRlcykge1xuXHRmb3IgKGNvbnN0IHkgb2YgeUNvb3JkaW5hdGVzKSB7XG5cdFx0Y29uc3QgbG9jYXRpb24gPSBnYW1lQm9hcmQoeCwgeSwgJ25vbmUnKTtcblx0XHRjb29yZGluYXRlcy5wdXNoKGxvY2F0aW9uKTtcblxuXHRcdGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjb250YWluZXInKTtcblxuXHRcdC8vIENyZWF0ZSBhIGRpdiBlbGVtZW50IHdpdGggSUQgb2YgeCt5XG5cdFx0Y29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdFx0ZGl2LmlkID0geCArIHk7XG5cdFx0ZGl2LmNsYXNzTGlzdC5hZGQoJ2dyaWQnKTsgLy8gQWRkIHRoZSBDU1MgY2xhc3MgJ2dyaWQnIHRvIHRoZSBkaXZcblxuXHRcdGRpdi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcblx0XHRcdGlmIChsb2NhdGlvbi5hdHRhY2tlZCA9PT0gJ3llcycpIHtcblx0XHRcdFx0Ly8gSWYgdGhlIGxvY2F0aW9uIGhhcyBhbHJlYWR5IGJlZW4gYXR0YWNrZWQsIGRvIG5vdGhpbmdcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHRyZWNlaXZlQXR0YWNrKHgsIHkpO1xuXHRcdFx0Ly8gQ2hhbmdlIHRoZSBiYWNrZ3JvdW5kIGNvbG9yIHRvIHJlZCB3aGVuIHRoZSBkaXYgaXMgY2xpY2tlZFxuXHRcdFx0ZGl2LnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdyZWQnO1xuXHRcdFx0Ly8gWW91IGNhbiBhZGQgbW9yZSBsb2dpYyBoZXJlIHRvIGhhbmRsZSB0aGUgYXR0YWNrIG9uIHRoZSBzaGlwLCBtYXJrIGhpdHMsIGV0Yy5cblx0XHR9KTtcblxuXHRcdC8vIEFwcGVuZCB0aGUgZGl2IHRvIHRoZSBkb2N1bWVudCBvciBhbm90aGVyIGNvbnRhaW5lclxuXHRcdGNvbnRhaW5lci5hcHBlbmRDaGlsZChkaXYpO1xuXHR9XG59XG5cblxubW9kdWxlLmV4cG9ydHMgPSB7XG5cdGNyZWF0ZVNoaXA6IGNyZWF0ZVNoaXAsXG59O1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9