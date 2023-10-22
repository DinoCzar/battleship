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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQixFQUFFLEVBQUUsRUFBRTtBQUNoQztBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2Qjs7QUFFN0Isd0JBQXdCO0FBQ3hCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7Ozs7OztVQzdFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7O1VFdEJBO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiBjcmVhdGVTaGlwKG5hbWUsIGxlbmd0aCwgaGl0cywgc3Vuaykge1xuXHQvLyBDcmVhdGUgYW4gZW1wdHkgb2JqZWN0XG5cdGNvbnN0IHNoaXAgPSB7fTtcblxuXHQvLyBBc3NpZ24gcHJvcGVydGllcyB0byB0aGUgb2JqZWN0XG5cblx0c2hpcC5uYW1lID0gbmFtZTtcblx0c2hpcC5sZW5ndGggPSBsZW5ndGg7XG5cdHNoaXAuaGl0cyA9IGhpdHM7XG5cdHNoaXAuc3VuayA9IHN1bms7XG5cblx0Ly8gRGVmaW5lIGEgbWV0aG9kIGZvciB0aGUgb2JqZWN0XG5cdHNoaXAuaGl0ID0gZnVuY3Rpb24gKCkge1xuXHRcdHNoaXAuaGl0cyArPSAxO1xuXHR9O1xuXG5cdHNoaXAuaXNTdW5rID0gZnVuY3Rpb24gKCkge1xuXHRcdGlmIChzaGlwLmhpdHMgPT09IHNoaXAubGVuZ3RoKSB7XG5cdFx0XHRzaGlwLnN1bmsgPSAnWWVzJztcblx0XHR9XG5cdH07XG5cblx0Ly8gUmV0dXJuIHRoZSBvYmplY3Rcblx0cmV0dXJuIHNoaXA7XG59XG5cbmNyZWF0ZVNoaXAoJ0FpcmNyYWZ0IENhcnJpZXInLCA1LCAwLCAnTm8nKTtcbmNyZWF0ZVNoaXAoJ0JhdHRsZXNoaXAnLCA0LCAwLCAnTm8nKTtcbmNyZWF0ZVNoaXAoJ0Rlc3Ryb3llcicsIDQsIDAsICdObycpO1xuY3JlYXRlU2hpcCgnU3VibWFyaW5lJywgMywgMCwgJ05vJyk7XG5jcmVhdGVTaGlwKCdQYXRyb2wgQm9hdCcsIDIsIDAsICdObycpO1xuXG5mdW5jdGlvbiBnYW1lQm9hcmQoeCwgeSwgYm9hdCkge1xuXHRyZXR1cm4ge1xuXHRcdHg6IHgsXG5cdFx0eTogeSxcblx0XHRib2F0OiBib2F0LFxuXHRcdGF0dGFja2VkOiBmYWxzZSxcblx0fTtcbn1cblxuLy8gQXJyYXlzIHRvIHJlcHJlc2VudCB0aGUgcG9zc2libGUgdmFsdWVzIGZvciAneCcgYW5kICd5J1xuY29uc3QgeENvb3JkaW5hdGVzID0gWydBJywgJ0InLCAnQycsICdEJywgJ0UnLCAnRicsICdHJywgJ0gnLCAnSScsICdKJ107XG5jb25zdCB5Q29vcmRpbmF0ZXMgPSBbMSwgMiwgMywgNCwgNSwgNiwgNywgOCwgOSwgMTBdO1xuXG4vLyBBcnJheSB0byBzdG9yZSB0aGUgY3JlYXRlZCBvYmplY3RzXG5jb25zdCBjb29yZGluYXRlcyA9IFtdO1xuXG4vLyBOZXN0ZWQgZm9yIGxvb3AgdG8gY3JlYXRlIG9iamVjdHMgYW5kIGRpdiBlbGVtZW50cyBmb3IgZXZlcnkgY29tYmluYXRpb24gb2YgJ3gnIGFuZCAneSdcbmZvciAoY29uc3QgeCBvZiB4Q29vcmRpbmF0ZXMpIHtcblx0Zm9yIChjb25zdCB5IG9mIHlDb29yZGluYXRlcykge1xuXHRcdGNvbnN0IGJvYXQgPSBgQm9hdCBhdCAke3h9JHt5fWA7XG5cdFx0Y29uc3QgbG9jYXRpb24gPSBnYW1lQm9hcmQoeCwgeSwgJ25vbmUnKTtcblx0XHRjb29yZGluYXRlcy5wdXNoKGxvY2F0aW9uKTtcblxuICAgICAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY29udGFpbmVyJyk7XG5cblx0XHQvLyBDcmVhdGUgYSBkaXYgZWxlbWVudCB3aXRoIElEIG9mIHgreVxuXHRcdGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHRcdGRpdi5pZCA9IHggKyB5O1xuXHRcdGRpdi5jbGFzc0xpc3QuYWRkKCdncmlkJyk7IC8vIEFkZCB0aGUgQ1NTIGNsYXNzICdncmlkJyB0byB0aGUgZGl2XG5cblx0XHRkaXYuY2xhc3NMaXN0LmFkZCh5KTsgLy8gQWRkIGEgY2xhc3MgYmFzZWQgb24gJ3knIHZhbHVlIHRvIHRoZSBkaXZcblx0XHQvLyBZb3UgY2FuIGFwcGVuZCBhZGRpdGlvbmFsIGNvbnRlbnQgb3IgcHJvcGVydGllcyB0byB0aGUgZGl2IGlmIG5lZWRlZFxuXHRcdC8vIEZvciBleGFtcGxlLCBkaXYudGV4dENvbnRlbnQgPSAnU29tZSB0ZXh0JztcblxuXHRcdC8vIEFwcGVuZCB0aGUgZGl2IHRvIHRoZSBkb2N1bWVudCBvciBhbm90aGVyIGNvbnRhaW5lclxuXHRcdGNvbnRhaW5lci5hcHBlbmRDaGlsZChkaXYpO1xuXHR9XG59XG5cbi8vIE5vdywgdGhlICdvYmplY3RzJyBhcnJheSBjb250YWlucyBvYmplY3RzIGZvciBldmVyeSBjb21iaW5hdGlvbiBvZiAneCcgYW5kICd5Jyxcbi8vIGFuZCB0aGVyZSBpcyBhIGNvcnJlc3BvbmRpbmcgZGl2IGVsZW1lbnQgd2l0aCBhbiBJRCBmb3IgZWFjaCBjb21iaW5hdGlvbi5cbmNvbnNvbGUubG9nKGNvb3JkaW5hdGVzKTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG5cdGNyZWF0ZVNoaXA6IGNyZWF0ZVNoaXAsXG59O1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9