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
        alert(capitalizeFirstLetter(ship.name) + ' has been hit!');
	};

	ship.isSunk = function () {
		if (ship.hits === ship.length) {
			ship.sunk = 'Yes';
            alert(capitalizeFirstLetter(ship.name) + ' has been sunk!');
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
			if (location.boat === 'none') {
				location.attacked = 'yes';
			} else {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEIsRUFBRSxFQUFFLEVBQUU7QUFDaEM7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkI7O0FBRTdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7Ozs7O1VDeEhBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7VUV0QkE7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIGNyZWF0ZVNoaXAobmFtZSwgbGVuZ3RoLCBoaXRzLCBzdW5rKSB7XG5cdC8vIENyZWF0ZSBhbiBlbXB0eSBvYmplY3Rcblx0Y29uc3Qgc2hpcCA9IHt9O1xuXG5cdC8vIEFzc2lnbiBwcm9wZXJ0aWVzIHRvIHRoZSBvYmplY3RcblxuXHRzaGlwLm5hbWUgPSBuYW1lO1xuXHRzaGlwLmxlbmd0aCA9IGxlbmd0aDtcblx0c2hpcC5oaXRzID0gaGl0cztcblx0c2hpcC5zdW5rID0gc3VuaztcblxuXHQvLyBEZWZpbmUgYSBtZXRob2QgZm9yIHRoZSBvYmplY3Rcblx0c2hpcC5oaXQgPSBmdW5jdGlvbiAoKSB7XG5cdFx0c2hpcC5oaXRzICs9IDE7XG4gICAgICAgIGFsZXJ0KGNhcGl0YWxpemVGaXJzdExldHRlcihzaGlwLm5hbWUpICsgJyBoYXMgYmVlbiBoaXQhJyk7XG5cdH07XG5cblx0c2hpcC5pc1N1bmsgPSBmdW5jdGlvbiAoKSB7XG5cdFx0aWYgKHNoaXAuaGl0cyA9PT0gc2hpcC5sZW5ndGgpIHtcblx0XHRcdHNoaXAuc3VuayA9ICdZZXMnO1xuICAgICAgICAgICAgYWxlcnQoY2FwaXRhbGl6ZUZpcnN0TGV0dGVyKHNoaXAubmFtZSkgKyAnIGhhcyBiZWVuIHN1bmshJyk7XG5cdFx0fVxuXHR9O1xuXG5cdC8vIFJldHVybiB0aGUgb2JqZWN0XG5cdHJldHVybiBzaGlwO1xufVxuXG5jb25zdCBhaXJjcmFmdENhcnJpZXIgPSBjcmVhdGVTaGlwKCdBaXJjcmFmdCBDYXJyaWVyJywgNSwgMCwgJ05vJyk7XG5jb25zdCBiYXR0bGVzaGlwID0gY3JlYXRlU2hpcCgnQmF0dGxlc2hpcCcsIDQsIDAsICdObycpO1xuY29uc3QgZGVzdHJveWVyID0gY3JlYXRlU2hpcCgnRGVzdHJveWVyJywgNCwgMCwgJ05vJyk7XG5jb25zdCBzdWJtYXJpbmUgPSBjcmVhdGVTaGlwKCdTdWJtYXJpbmUnLCAzLCAwLCAnTm8nKTtcbmNvbnN0IHBhdHJvbEJvYXQgPSBjcmVhdGVTaGlwKCdQYXRyb2wgQm9hdCcsIDIsIDAsICdObycpO1xuXG5mdW5jdGlvbiBnYW1lQm9hcmQoeCwgeSwgYm9hdCkge1xuXHRyZXR1cm4ge1xuXHRcdHg6IHgsXG5cdFx0eTogeSxcblx0XHRib2F0OiAnbm9uZScsXG5cdFx0YXR0YWNrZWQ6ICdubycsXG5cdH07XG59XG5cbi8vIEFycmF5cyB0byByZXByZXNlbnQgdGhlIHBvc3NpYmxlIHZhbHVlcyBmb3IgJ3gnIGFuZCAneSdcbmNvbnN0IHhDb29yZGluYXRlcyA9IFsnQScsICdCJywgJ0MnLCAnRCcsICdFJywgJ0YnLCAnRycsICdIJywgJ0knLCAnSiddO1xuY29uc3QgeUNvb3JkaW5hdGVzID0gWzEsIDIsIDMsIDQsIDUsIDYsIDcsIDgsIDksIDEwXTtcblxuLy8gQXJyYXkgdG8gc3RvcmUgdGhlIGNyZWF0ZWQgb2JqZWN0c1xuY29uc3QgY29vcmRpbmF0ZXMgPSBbXTtcblxuZnVuY3Rpb24gcmVjZWl2ZUF0dGFjayh4LCB5KSB7XG5cdGZvciAoY29uc3QgbG9jYXRpb24gb2YgY29vcmRpbmF0ZXMpIHtcblx0XHRpZiAobG9jYXRpb24ueCA9PT0geCAmJiBsb2NhdGlvbi55ID09PSB5KSB7XG5cdFx0XHRpZiAobG9jYXRpb24uYm9hdCA9PT0gJ25vbmUnKSB7XG5cdFx0XHRcdGxvY2F0aW9uLmF0dGFja2VkID0gJ3llcyc7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHQvLyBGaW5kIHRoZSBjb3JyZXNwb25kaW5nIHNoaXAgYnkgbmFtZSBhbmQgYWRkIGEgaGl0XG5cdFx0XHRcdHN3aXRjaCAobG9jYXRpb24uYm9hdCkge1xuXHRcdFx0XHRcdGNhc2UgJ0FpcmNyYWZ0IENhcnJpZXInOlxuXHRcdFx0XHRcdFx0YWlyY3JhZnRDYXJyaWVyLmhpdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYWlyY3JhZnRDYXJyaWVyLmlzU3VuaygpO1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0Y2FzZSAnQmF0dGxlc2hpcCc6XG5cdFx0XHRcdFx0XHRiYXR0bGVzaGlwLmhpdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYmF0dGxlc2hpcC5pc1N1bmsoKTtcblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdGNhc2UgJ0Rlc3Ryb3llcic6XG5cdFx0XHRcdFx0XHRkZXN0cm95ZXIuaGl0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZXN0cm95ZXIuaXNTdW5rKCk7XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRjYXNlICdTdWJtYXJpbmUnOlxuXHRcdFx0XHRcdFx0c3VibWFyaW5lLmhpdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc3VibWFyaW5lLmlzU3VuaygpO1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0Y2FzZSAnUGF0cm9sIEJvYXQnOlxuXHRcdFx0XHRcdFx0cGF0cm9sQm9hdC5oaXQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhdHJvbEJvYXQuaXNTdW5rKCk7XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxufVxuXG4vLyBOZXN0ZWQgZm9yIGxvb3AgdG8gY3JlYXRlIG9iamVjdHMgYW5kIGRpdiBlbGVtZW50cyBmb3IgZXZlcnkgY29tYmluYXRpb24gb2YgJ3gnIGFuZCAneSdcbmZvciAoY29uc3QgeCBvZiB4Q29vcmRpbmF0ZXMpIHtcblx0Zm9yIChjb25zdCB5IG9mIHlDb29yZGluYXRlcykge1xuXHRcdGNvbnN0IGJvYXQgPSBgQm9hdCBhdCAke3h9JHt5fWA7XG5cdFx0Y29uc3QgbG9jYXRpb24gPSBnYW1lQm9hcmQoeCwgeSwgJ25vbmUnKTtcblx0XHRjb29yZGluYXRlcy5wdXNoKGxvY2F0aW9uKTtcblxuXHRcdGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjb250YWluZXInKTtcblxuXHRcdC8vIENyZWF0ZSBhIGRpdiBlbGVtZW50IHdpdGggSUQgb2YgeCt5XG5cdFx0Y29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdFx0ZGl2LmlkID0geCArIHk7XG5cdFx0ZGl2LmNsYXNzTGlzdC5hZGQoJ2dyaWQnKTsgLy8gQWRkIHRoZSBDU1MgY2xhc3MgJ2dyaWQnIHRvIHRoZSBkaXZcblxuXHRcdGRpdi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcblx0XHRcdGlmIChsb2NhdGlvbi5hdHRhY2tlZCA9PT0gJ3llcycpIHtcblx0XHRcdFx0Ly8gSWYgdGhlIGxvY2F0aW9uIGhhcyBhbHJlYWR5IGJlZW4gYXR0YWNrZWQsIGRvIG5vdGhpbmdcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHRyZWNlaXZlQXR0YWNrKHgsIHkpO1xuXHRcdFx0Ly8gQ2hhbmdlIHRoZSBiYWNrZ3JvdW5kIGNvbG9yIHRvIHJlZCB3aGVuIHRoZSBkaXYgaXMgY2xpY2tlZFxuXHRcdFx0ZGl2LnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdyZWQnO1xuXHRcdFx0Ly8gWW91IGNhbiBhZGQgbW9yZSBsb2dpYyBoZXJlIHRvIGhhbmRsZSB0aGUgYXR0YWNrIG9uIHRoZSBzaGlwLCBtYXJrIGhpdHMsIGV0Yy5cblx0XHR9KTtcblxuXHRcdC8vIEFwcGVuZCB0aGUgZGl2IHRvIHRoZSBkb2N1bWVudCBvciBhbm90aGVyIGNvbnRhaW5lclxuXHRcdGNvbnRhaW5lci5hcHBlbmRDaGlsZChkaXYpO1xuXHR9XG59XG5cbi8vIE5vdywgdGhlICdvYmplY3RzJyBhcnJheSBjb250YWlucyBvYmplY3RzIGZvciBldmVyeSBjb21iaW5hdGlvbiBvZiAneCcgYW5kICd5Jyxcbi8vIGFuZCB0aGVyZSBpcyBhIGNvcnJlc3BvbmRpbmcgZGl2IGVsZW1lbnQgd2l0aCBhbiBJRCBmb3IgZWFjaCBjb21iaW5hdGlvbi5cblxubW9kdWxlLmV4cG9ydHMgPSB7XG5cdGNyZWF0ZVNoaXA6IGNyZWF0ZVNoaXAsXG59O1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9