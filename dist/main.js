/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
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


/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxhQUFhO0FBQ2I7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsb0JBQW9CLGNBQWM7QUFDbEMsd0NBQXdDLHdCQUF3QjtBQUNoRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkNBQTJDO0FBQzNDLDhDQUE4QztBQUM5QztBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxhQUFhO0FBQ2I7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsb0JBQW9CLGNBQWM7QUFDbEMsd0NBQXdDLHdCQUF3QjtBQUNoRTtBQUNBOztBQUVBO0FBQ0E7QUFDQSw0REFBNEQ7QUFDNUQsMkNBQTJDO0FBQzNDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLE9BQU87O0FBRTNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0NBQWdDLHFCQUFxQjtBQUNyRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0NBQW9DLHFCQUFxQjtBQUN6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiBjcmVhdGVTaGlwKG5hbWUsIGxlbmd0aCwgaGl0cywgc3Vuaykge1xuXHQvLyBDcmVhdGUgYW4gZW1wdHkgb2JqZWN0XG5cdGNvbnN0IHNoaXAgPSB7fTtcblxuXHQvLyBBc3NpZ24gcHJvcGVydGllcyB0byB0aGUgb2JqZWN0XG5cdHNoaXAubmFtZSA9IG5hbWU7XG5cdHNoaXAubGVuZ3RoID0gbGVuZ3RoO1xuXHRzaGlwLmhpdHMgPSBoaXRzO1xuXHRzaGlwLnN1bmsgPSBzdW5rO1xuXG5cdC8vIERlZmluZSBhIG1ldGhvZCBmb3IgdGhlIG9iamVjdFxuXHRzaGlwLmhpdCA9IGZ1bmN0aW9uICgpIHtcblx0XHRzaGlwLmhpdHMgKz0gMTtcblx0XHRhbGVydChzaGlwLm5hbWUgKyAnIGhhcyBiZWVuIGhpdCEnKTtcblx0fTtcblxuXHRzaGlwLmlzU3VuayA9IGZ1bmN0aW9uICgpIHtcblx0XHRpZiAoc2hpcC5oaXRzID09PSBzaGlwLmxlbmd0aCkge1xuXHRcdFx0c2hpcC5zdW5rID0gJ1llcyc7XG5cdFx0XHRhbGVydChzaGlwLm5hbWUgKyAnIGhhcyBiZWVuIHN1bmshJyk7XG5cdFx0fVxuXHR9O1xuXG5cdC8vIFJldHVybiB0aGUgb2JqZWN0XG5cdHJldHVybiBzaGlwO1xufVxuXG5jb25zdCBwbGF5ZXJBaXJjcmFmdENhcnJpZXIgPSBjcmVhdGVTaGlwKCdBaXJjcmFmdCBDYXJyaWVyJywgNSwgMCwgJ05vJyk7XG5jb25zdCBwbGF5ZXJCYXR0bGVzaGlwID0gY3JlYXRlU2hpcCgnQmF0dGxlc2hpcCcsIDQsIDAsICdObycpO1xuY29uc3QgcGxheWVyRGVzdHJveWVyID0gY3JlYXRlU2hpcCgnRGVzdHJveWVyJywgNCwgMCwgJ05vJyk7XG5jb25zdCBwbGF5ZXJTdWJtYXJpbmUgPSBjcmVhdGVTaGlwKCdTdWJtYXJpbmUnLCAzLCAwLCAnTm8nKTtcbmNvbnN0IHBsYXllclBhdHJvbEJvYXQgPSBjcmVhdGVTaGlwKCdQYXRyb2wgQm9hdCcsIDIsIDAsICdObycpO1xuXG5jb25zdCBjb21wdXRlckFpcmNyYWZ0Q2FycmllciA9IGNyZWF0ZVNoaXAoJ0FpcmNyYWZ0IENhcnJpZXInLCA1LCAwLCAnTm8nKTtcbmNvbnN0IGNvbXB1dGVyQmF0dGxlc2hpcCA9IGNyZWF0ZVNoaXAoJ0JhdHRsZXNoaXAnLCA0LCAwLCAnTm8nKTtcbmNvbnN0IGNvbXB1dGVyRGVzdHJveWVyID0gY3JlYXRlU2hpcCgnRGVzdHJveWVyJywgNCwgMCwgJ05vJyk7XG5jb25zdCBjb21wdXRlclN1Ym1hcmluZSA9IGNyZWF0ZVNoaXAoJ1N1Ym1hcmluZScsIDMsIDAsICdObycpO1xuY29uc3QgY29tcHV0ZXJQYXRyb2xCb2F0ID0gY3JlYXRlU2hpcCgnUGF0cm9sIEJvYXQnLCAyLCAwLCAnTm8nKTtcblxuZnVuY3Rpb24gY3JlYXRlTG9jYXRpb24oeCwgeSkge1xuICAgIHJldHVybiB7IHgsIHksIGJvYXQ6ICdub25lJywgYXR0YWNrZWQ6ICdubycgfTtcbn1cblxuY29uc3QgY29tcHV0ZXJDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY29tcHV0ZXItY29udGFpbmVyJyk7XG5cbmZ1bmN0aW9uIGNyZWF0ZVBsYXllckdhbWVCb2FyZCgpIHtcbiAgICBjb25zdCBwbGF5ZXJHYW1lQm9hcmQgPSBbXTtcbiAgICBjb25zdCBjb2x1bW5zID0gMTA7XG4gICAgY29uc3Qgcm93cyA9IDEwO1xuXG4gICAgZm9yIChsZXQgeCA9IDE7IHggPD0gY29sdW1uczsgeCsrKSB7XG4gICAgICAgIGZvciAobGV0IHkgPSAnQScuY2hhckNvZGVBdCgwKTsgeSA8PSAnSicuY2hhckNvZGVBdCgwKTsgeSsrKSB7XG4gICAgICAgICAgICBjb25zdCBsb2NhdGlvbiA9IGNyZWF0ZUxvY2F0aW9uKHgsIFN0cmluZy5mcm9tQ2hhckNvZGUoeSkpO1xuICAgICAgICAgICAgcGxheWVyR2FtZUJvYXJkLnB1c2gobG9jYXRpb24pO1xuXG4gICAgICAgICAgICAvLyBDcmVhdGUgYSBkaXYgZWxlbWVudCBmb3IgZWFjaCBsb2NhdGlvbiwgc2V0IGl0cyBpZCwgYW5kIGFkZCBhIENTUyBjbGFzc1xuICAgICAgICAgICAgY29uc3QgcGxheWVyQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3BsYXllci1jb250YWluZXInKTtcblx0XHRcdGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgZGl2LmlkID0gbG9jYXRpb24ueSArIGxvY2F0aW9uLng7XG4gICAgICAgICAgICBkaXYuY2xhc3NMaXN0LmFkZCgnbG9jYXRpb24nKTsgLy8gQWRkIHRoZSBDU1MgY2xhc3MgJ2xvY2F0aW9uJyB0byB0aGUgZGl2XG4gICAgICAgICAgICBwbGF5ZXJDb250YWluZXIuYXBwZW5kQ2hpbGQoZGl2KTsgLy8gQXBwZW5kIHRoZSBkaXYgdG8gdGhlIHBsYXllckNvbnRhaW5lclxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHBsYXllckdhbWVCb2FyZDtcbn1cblxuZnVuY3Rpb24gY3JlYXRlQ29tcHV0ZXJMb2NhdGlvbih4LCB5KSB7XG4gICAgcmV0dXJuIHsgeCwgeSwgYm9hdDogJ25vbmUnLCBhdHRhY2tlZDogJ25vJyB9O1xufVxuXG5mdW5jdGlvbiBjcmVhdGVDb21wdXRlckdhbWVCb2FyZCgpIHtcbiAgICBjb25zdCBjb21wdXRlckdhbWVCb2FyZCA9IFtdO1xuICAgIGNvbnN0IGNvbHVtbnMgPSAxMDtcbiAgICBjb25zdCByb3dzID0gMTA7XG5cbiAgICBmb3IgKGxldCB4ID0gMTsgeCA8PSBjb2x1bW5zOyB4KyspIHtcbiAgICAgICAgZm9yIChsZXQgeSA9ICdBJy5jaGFyQ29kZUF0KDApOyB5IDw9ICdKJy5jaGFyQ29kZUF0KDApOyB5KyspIHtcbiAgICAgICAgICAgIGNvbnN0IGxvY2F0aW9uID0gY3JlYXRlQ29tcHV0ZXJMb2NhdGlvbih4LCBTdHJpbmcuZnJvbUNoYXJDb2RlKHkpKTtcbiAgICAgICAgICAgIGNvbXB1dGVyR2FtZUJvYXJkLnB1c2gobG9jYXRpb24pO1xuXG4gICAgICAgICAgICAvLyBDcmVhdGUgYSBkaXYgZWxlbWVudCBmb3IgZWFjaCBsb2NhdGlvbiBpbiB0aGUgY29tcHV0ZXIgZ2FtZSBib2FyZFxuICAgICAgICAgICAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBkaXYuaWQgPSAnY29tcHV0ZXItJyArIGxvY2F0aW9uLnkgKyBsb2NhdGlvbi54OyAvLyBBZGQgJ2NvbXB1dGVyLScgcHJlZml4IHRvIHRoZSBJRFxuICAgICAgICAgICAgZGl2LmNsYXNzTGlzdC5hZGQoJ2xvY2F0aW9uJyk7IC8vIEFkZCB0aGUgQ1NTIGNsYXNzICdsb2NhdGlvbicgdG8gdGhlIGRpdlxuICAgICAgICAgICAgY29tcHV0ZXJDb250YWluZXIuYXBwZW5kQ2hpbGQoZGl2KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBjb21wdXRlckdhbWVCb2FyZDtcbn1cblxuY29uc3QgcGxheWVyR2FtZUJvYXJkID0gY3JlYXRlUGxheWVyR2FtZUJvYXJkKCk7XG5jb25zdCBjb21wdXRlckdhbWVCb2FyZCA9IGNyZWF0ZUNvbXB1dGVyR2FtZUJvYXJkKCk7XG5cbmZ1bmN0aW9uIHJhbmRvbUNvb3JkaW5hdGUoKSB7XG4gICAgLy8gR2VuZXJhdGUgYSByYW5kb20geC1jb29yZGluYXRlICgxLTEwKVxuICAgIGNvbnN0IHggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCkgKyAxO1xuICAgIC8vIEdlbmVyYXRlIGEgcmFuZG9tIHktY29vcmRpbmF0ZSAoQS1KKVxuICAgIGNvbnN0IHkgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKSArICdBJy5jaGFyQ29kZUF0KDApKTtcbiAgICByZXR1cm4geyB4LCB5IH07XG59XG5cbmZ1bmN0aW9uIHBsYWNlQ29tcHV0ZXJTaGlwcyhjb21wdXRlckdhbWVCb2FyZCwgc2hpcHMpIHtcbiAgICBmb3IgKGNvbnN0IHNoaXAgb2Ygc2hpcHMpIHtcbiAgICAgICAgbGV0IHZhbGlkUGxhY2VtZW50ID0gZmFsc2U7XG4gICAgICAgIHdoaWxlICghdmFsaWRQbGFjZW1lbnQpIHtcbiAgICAgICAgICAgIC8vIEdlbmVyYXRlIGEgcmFuZG9tIHN0YXJ0aW5nIGNvb3JkaW5hdGVcbiAgICAgICAgICAgIGNvbnN0IHsgeCwgeSB9ID0gcmFuZG9tQ29vcmRpbmF0ZSgpO1xuXG4gICAgICAgICAgICAvLyBDaGVjayBpZiB0aGVyZSdzIGVub3VnaCBzcGFjZSB0byBwbGFjZSB0aGUgc2hpcCBob3Jpem9udGFsbHlcbiAgICAgICAgICAgIGlmICh4ICsgc2hpcC5sZW5ndGggLSAxIDw9IDEwKSB7XG4gICAgICAgICAgICAgICAgbGV0IGNhblBsYWNlU2hpcCA9IHRydWU7XG4gICAgICAgICAgICAgICAgLy8gQ2hlY2sgZWFjaCBsb2NhdGlvbiBmcm9tIHRoZSBjdXJyZW50IG9uZSB0byB0aGUgZW5kXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IHg7IGkgPCB4ICsgc2hpcC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBsb2NhdGlvblRvQ2hlY2sgPSBjb21wdXRlckdhbWVCb2FyZC5maW5kKGxvYyA9PiBsb2MueCA9PT0gaSAmJiBsb2MueSA9PT0geSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChsb2NhdGlvblRvQ2hlY2suYm9hdCAhPT0gJ25vbmUnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYW5QbGFjZVNoaXAgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChjYW5QbGFjZVNoaXApIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gVmFsaWQgcGxhY2VtZW50LCB1cGRhdGUgdGhlIFwiYm9hdFwiIHByb3BlcnR5IGZvciBlYWNoIGxvY2F0aW9uXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSB4OyBpIDwgeCArIHNoaXAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGxvY2F0aW9uVG9QbGFjZSA9IGNvbXB1dGVyR2FtZUJvYXJkLmZpbmQobG9jID0+IGxvYy54ID09PSBpICYmIGxvYy55ID09PSB5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvY2F0aW9uVG9QbGFjZS5ib2F0ID0gc2hpcC5uYW1lO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHZhbGlkUGxhY2VtZW50ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5cbi8vIENyZWF0ZSBhbiBhcnJheSBvZiBjb21wdXRlciBzaGlwc1xuY29uc3QgY29tcHV0ZXJTaGlwcyA9IFtjb21wdXRlckFpcmNyYWZ0Q2FycmllciwgY29tcHV0ZXJCYXR0bGVzaGlwLCBjb21wdXRlckRlc3Ryb3llciwgY29tcHV0ZXJTdWJtYXJpbmUsIGNvbXB1dGVyUGF0cm9sQm9hdF07XG5cbi8vIEF1dG9tYXRpY2FsbHkgcGxhY2UgY29tcHV0ZXIgc2hpcHMgb24gdGhlIGJvYXJkXG5wbGFjZUNvbXB1dGVyU2hpcHMoY29tcHV0ZXJHYW1lQm9hcmQsIGNvbXB1dGVyU2hpcHMpO1xuXG5cbmNvbnNvbGUubG9nKHBsYXllckdhbWVCb2FyZClcbmNvbnNvbGUubG9nKGNvbXB1dGVyR2FtZUJvYXJkKVxuXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=