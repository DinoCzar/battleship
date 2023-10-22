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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCLEVBQUUsRUFBRSxFQUFFO0FBQ2hDO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCOztBQUU3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7Ozs7OztVQ2hJQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7O1VFdEJBO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiBjcmVhdGVTaGlwKG5hbWUsIGxlbmd0aCwgaGl0cywgc3Vuaykge1xuXHQvLyBDcmVhdGUgYW4gZW1wdHkgb2JqZWN0XG5cdGNvbnN0IHNoaXAgPSB7fTtcblxuXHQvLyBBc3NpZ24gcHJvcGVydGllcyB0byB0aGUgb2JqZWN0XG5cblx0c2hpcC5uYW1lID0gbmFtZTtcblx0c2hpcC5sZW5ndGggPSBsZW5ndGg7XG5cdHNoaXAuaGl0cyA9IGhpdHM7XG5cdHNoaXAuc3VuayA9IHN1bms7XG5cblx0Ly8gRGVmaW5lIGEgbWV0aG9kIGZvciB0aGUgb2JqZWN0XG5cdHNoaXAuaGl0ID0gZnVuY3Rpb24gKCkge1xuXHRcdHNoaXAuaGl0cyArPSAxO1xuICAgICAgICBhbGVydCgoc2hpcC5uYW1lKSArICcgaGFzIGJlZW4gaGl0IScpO1xuXHR9O1xuXG5cdHNoaXAuaXNTdW5rID0gZnVuY3Rpb24gKCkge1xuXHRcdGlmIChzaGlwLmhpdHMgPT09IHNoaXAubGVuZ3RoKSB7XG5cdFx0XHRzaGlwLnN1bmsgPSAnWWVzJztcbiAgICAgICAgICAgIGFsZXJ0KChzaGlwLm5hbWUpICsgJyBoYXMgYmVlbiBzdW5rIScpO1xuXHRcdH1cblx0fTtcblxuXHQvLyBSZXR1cm4gdGhlIG9iamVjdFxuXHRyZXR1cm4gc2hpcDtcbn1cblxuY29uc3QgYWlyY3JhZnRDYXJyaWVyID0gY3JlYXRlU2hpcCgnQWlyY3JhZnQgQ2FycmllcicsIDUsIDAsICdObycpO1xuY29uc3QgYmF0dGxlc2hpcCA9IGNyZWF0ZVNoaXAoJ0JhdHRsZXNoaXAnLCA0LCAwLCAnTm8nKTtcbmNvbnN0IGRlc3Ryb3llciA9IGNyZWF0ZVNoaXAoJ0Rlc3Ryb3llcicsIDQsIDAsICdObycpO1xuY29uc3Qgc3VibWFyaW5lID0gY3JlYXRlU2hpcCgnU3VibWFyaW5lJywgMywgMCwgJ05vJyk7XG5jb25zdCBwYXRyb2xCb2F0ID0gY3JlYXRlU2hpcCgnUGF0cm9sIEJvYXQnLCAyLCAwLCAnTm8nKTtcblxuZnVuY3Rpb24gZ2FtZUJvYXJkKHgsIHksIGJvYXQpIHtcblx0cmV0dXJuIHtcblx0XHR4OiB4LFxuXHRcdHk6IHksXG5cdFx0Ym9hdDogJ25vbmUnLFxuXHRcdGF0dGFja2VkOiAnbm8nLFxuXHR9O1xufVxuXG4vLyBBcnJheXMgdG8gcmVwcmVzZW50IHRoZSBwb3NzaWJsZSB2YWx1ZXMgZm9yICd4JyBhbmQgJ3knXG5jb25zdCB4Q29vcmRpbmF0ZXMgPSBbJ0EnLCAnQicsICdDJywgJ0QnLCAnRScsICdGJywgJ0cnLCAnSCcsICdJJywgJ0onXTtcbmNvbnN0IHlDb29yZGluYXRlcyA9IFsxLCAyLCAzLCA0LCA1LCA2LCA3LCA4LCA5LCAxMF07XG5cbi8vIEFycmF5IHRvIHN0b3JlIHRoZSBjcmVhdGVkIG9iamVjdHNcbmNvbnN0IGNvb3JkaW5hdGVzID0gW107XG5cbmZ1bmN0aW9uIHJlY2VpdmVBdHRhY2soeCwgeSkge1xuICAgIGZvciAoY29uc3QgbG9jYXRpb24gb2YgY29vcmRpbmF0ZXMpIHtcbiAgICAgICAgaWYgKGxvY2F0aW9uLnggPT09IHggJiYgbG9jYXRpb24ueSA9PT0geSkge1xuICAgICAgICAgICAgaWYgKGxvY2F0aW9uLmF0dGFja2VkID09PSAneWVzJykge1xuICAgICAgICAgICAgICAgIC8vIElmIHRoZSBsb2NhdGlvbiBoYXMgYWxyZWFkeSBiZWVuIGF0dGFja2VkLCBkbyBub3RoaW5nXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsb2NhdGlvbi5hdHRhY2tlZCA9ICd5ZXMnO1xuXG4gICAgICAgICAgICBpZiAobG9jYXRpb24uYm9hdCAhPT0gJ25vbmUnKSB7XG4gICAgICAgICAgICAgICAgLy8gRmluZCB0aGUgY29ycmVzcG9uZGluZyBzaGlwIGJ5IG5hbWUgYW5kIGFkZCBhIGhpdFxuICAgICAgICAgICAgICAgIHN3aXRjaCAobG9jYXRpb24uYm9hdCkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdBaXJjcmFmdCBDYXJyaWVyJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGFpcmNyYWZ0Q2Fycmllci5oaXQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFpcmNyYWZ0Q2Fycmllci5pc1N1bmsoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdCYXR0bGVzaGlwJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGJhdHRsZXNoaXAuaGl0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBiYXR0bGVzaGlwLmlzU3VuaygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ0Rlc3Ryb3llcic6XG4gICAgICAgICAgICAgICAgICAgICAgICBkZXN0cm95ZXIuaGl0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZXN0cm95ZXIuaXNTdW5rKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnU3VibWFyaW5lJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1Ym1hcmluZS5oaXQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1Ym1hcmluZS5pc1N1bmsoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdQYXRyb2wgQm9hdCc6XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXRyb2xCb2F0LmhpdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcGF0cm9sQm9hdC5pc1N1bmsoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBhbGVydChcIkl0J3MgYSBtaXNzIVwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cblxuLy8gTmVzdGVkIGZvciBsb29wIHRvIGNyZWF0ZSBvYmplY3RzIGFuZCBkaXYgZWxlbWVudHMgZm9yIGV2ZXJ5IGNvbWJpbmF0aW9uIG9mICd4JyBhbmQgJ3knXG5mb3IgKGNvbnN0IHggb2YgeENvb3JkaW5hdGVzKSB7XG5cdGZvciAoY29uc3QgeSBvZiB5Q29vcmRpbmF0ZXMpIHtcblx0XHRjb25zdCBib2F0ID0gYEJvYXQgYXQgJHt4fSR7eX1gO1xuXHRcdGNvbnN0IGxvY2F0aW9uID0gZ2FtZUJvYXJkKHgsIHksICdub25lJyk7XG5cdFx0Y29vcmRpbmF0ZXMucHVzaChsb2NhdGlvbik7XG5cblx0XHRjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY29udGFpbmVyJyk7XG5cblx0XHQvLyBDcmVhdGUgYSBkaXYgZWxlbWVudCB3aXRoIElEIG9mIHgreVxuXHRcdGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHRcdGRpdi5pZCA9IHggKyB5O1xuXHRcdGRpdi5jbGFzc0xpc3QuYWRkKCdncmlkJyk7IC8vIEFkZCB0aGUgQ1NTIGNsYXNzICdncmlkJyB0byB0aGUgZGl2XG5cblx0XHRkaXYuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRpZiAobG9jYXRpb24uYXR0YWNrZWQgPT09ICd5ZXMnKSB7XG5cdFx0XHRcdC8vIElmIHRoZSBsb2NhdGlvbiBoYXMgYWxyZWFkeSBiZWVuIGF0dGFja2VkLCBkbyBub3RoaW5nXG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0cmVjZWl2ZUF0dGFjayh4LCB5KTtcblx0XHRcdC8vIENoYW5nZSB0aGUgYmFja2dyb3VuZCBjb2xvciB0byByZWQgd2hlbiB0aGUgZGl2IGlzIGNsaWNrZWRcblx0XHRcdGRpdi5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAncmVkJztcblx0XHRcdC8vIFlvdSBjYW4gYWRkIG1vcmUgbG9naWMgaGVyZSB0byBoYW5kbGUgdGhlIGF0dGFjayBvbiB0aGUgc2hpcCwgbWFyayBoaXRzLCBldGMuXG5cdFx0fSk7XG5cblx0XHQvLyBBcHBlbmQgdGhlIGRpdiB0byB0aGUgZG9jdW1lbnQgb3IgYW5vdGhlciBjb250YWluZXJcblx0XHRjb250YWluZXIuYXBwZW5kQ2hpbGQoZGl2KTtcblx0fVxufVxuXG4vLyBOb3csIHRoZSAnb2JqZWN0cycgYXJyYXkgY29udGFpbnMgb2JqZWN0cyBmb3IgZXZlcnkgY29tYmluYXRpb24gb2YgJ3gnIGFuZCAneScsXG4vLyBhbmQgdGhlcmUgaXMgYSBjb3JyZXNwb25kaW5nIGRpdiBlbGVtZW50IHdpdGggYW4gSUQgZm9yIGVhY2ggY29tYmluYXRpb24uXG5cbm1vZHVsZS5leHBvcnRzID0ge1xuXHRjcmVhdGVTaGlwOiBjcmVhdGVTaGlwLFxufTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==