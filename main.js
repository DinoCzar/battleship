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
            div.id = location.x + location.y;
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
            div.id = 'computer-' +  location.x + location.y; // Add 'computer-' prefix to the ID
            div.classList.add('location'); // Add the CSS class 'location' to the div
            computerContainer.appendChild(div);
        }
    }

    return computerGameBoard;
}

const playerGameBoard = createPlayerGameBoard();
const computerGameBoard = createComputerGameBoard();


/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxhQUFhO0FBQ2I7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsb0JBQW9CLGNBQWM7QUFDbEMsd0NBQXdDLHdCQUF3QjtBQUNoRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkNBQTJDO0FBQzNDLDhDQUE4QztBQUM5QztBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxhQUFhO0FBQ2I7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsb0JBQW9CLGNBQWM7QUFDbEMsd0NBQXdDLHdCQUF3QjtBQUNoRTtBQUNBOztBQUVBO0FBQ0E7QUFDQSw2REFBNkQ7QUFDN0QsMkNBQTJDO0FBQzNDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIGNyZWF0ZVNoaXAobmFtZSwgbGVuZ3RoLCBoaXRzLCBzdW5rKSB7XG5cdC8vIENyZWF0ZSBhbiBlbXB0eSBvYmplY3Rcblx0Y29uc3Qgc2hpcCA9IHt9O1xuXG5cdC8vIEFzc2lnbiBwcm9wZXJ0aWVzIHRvIHRoZSBvYmplY3Rcblx0c2hpcC5uYW1lID0gbmFtZTtcblx0c2hpcC5sZW5ndGggPSBsZW5ndGg7XG5cdHNoaXAuaGl0cyA9IGhpdHM7XG5cdHNoaXAuc3VuayA9IHN1bms7XG5cblx0Ly8gRGVmaW5lIGEgbWV0aG9kIGZvciB0aGUgb2JqZWN0XG5cdHNoaXAuaGl0ID0gZnVuY3Rpb24gKCkge1xuXHRcdHNoaXAuaGl0cyArPSAxO1xuXHRcdGFsZXJ0KHNoaXAubmFtZSArICcgaGFzIGJlZW4gaGl0IScpO1xuXHR9O1xuXG5cdHNoaXAuaXNTdW5rID0gZnVuY3Rpb24gKCkge1xuXHRcdGlmIChzaGlwLmhpdHMgPT09IHNoaXAubGVuZ3RoKSB7XG5cdFx0XHRzaGlwLnN1bmsgPSAnWWVzJztcblx0XHRcdGFsZXJ0KHNoaXAubmFtZSArICcgaGFzIGJlZW4gc3VuayEnKTtcblx0XHR9XG5cdH07XG5cblx0Ly8gUmV0dXJuIHRoZSBvYmplY3Rcblx0cmV0dXJuIHNoaXA7XG59XG5cbmNvbnN0IHBsYXllckFpcmNyYWZ0Q2FycmllciA9IGNyZWF0ZVNoaXAoJ0FpcmNyYWZ0IENhcnJpZXInLCA1LCAwLCAnTm8nKTtcbmNvbnN0IHBsYXllckJhdHRsZXNoaXAgPSBjcmVhdGVTaGlwKCdCYXR0bGVzaGlwJywgNCwgMCwgJ05vJyk7XG5jb25zdCBwbGF5ZXJEZXN0cm95ZXIgPSBjcmVhdGVTaGlwKCdEZXN0cm95ZXInLCA0LCAwLCAnTm8nKTtcbmNvbnN0IHBsYXllclN1Ym1hcmluZSA9IGNyZWF0ZVNoaXAoJ1N1Ym1hcmluZScsIDMsIDAsICdObycpO1xuY29uc3QgcGxheWVyUGF0cm9sQm9hdCA9IGNyZWF0ZVNoaXAoJ1BhdHJvbCBCb2F0JywgMiwgMCwgJ05vJyk7XG5cbmNvbnN0IGNvbXB1dGVyQWlyY3JhZnRDYXJyaWVyID0gY3JlYXRlU2hpcCgnQWlyY3JhZnQgQ2FycmllcicsIDUsIDAsICdObycpO1xuY29uc3QgY29tcHV0ZXJCYXR0bGVzaGlwID0gY3JlYXRlU2hpcCgnQmF0dGxlc2hpcCcsIDQsIDAsICdObycpO1xuY29uc3QgY29tcHV0ZXJEZXN0cm95ZXIgPSBjcmVhdGVTaGlwKCdEZXN0cm95ZXInLCA0LCAwLCAnTm8nKTtcbmNvbnN0IGNvbXB1dGVyU3VibWFyaW5lID0gY3JlYXRlU2hpcCgnU3VibWFyaW5lJywgMywgMCwgJ05vJyk7XG5jb25zdCBjb21wdXRlclBhdHJvbEJvYXQgPSBjcmVhdGVTaGlwKCdQYXRyb2wgQm9hdCcsIDIsIDAsICdObycpO1xuXG5mdW5jdGlvbiBjcmVhdGVMb2NhdGlvbih4LCB5KSB7XG4gICAgcmV0dXJuIHsgeCwgeSwgYm9hdDogJ25vbmUnLCBhdHRhY2tlZDogJ25vJyB9O1xufVxuXG5jb25zdCBjb21wdXRlckNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjb21wdXRlci1jb250YWluZXInKTtcblxuZnVuY3Rpb24gY3JlYXRlUGxheWVyR2FtZUJvYXJkKCkge1xuICAgIGNvbnN0IHBsYXllckdhbWVCb2FyZCA9IFtdO1xuICAgIGNvbnN0IGNvbHVtbnMgPSAxMDtcbiAgICBjb25zdCByb3dzID0gMTA7XG5cbiAgICBmb3IgKGxldCB4ID0gMTsgeCA8PSBjb2x1bW5zOyB4KyspIHtcbiAgICAgICAgZm9yIChsZXQgeSA9ICdBJy5jaGFyQ29kZUF0KDApOyB5IDw9ICdKJy5jaGFyQ29kZUF0KDApOyB5KyspIHtcbiAgICAgICAgICAgIGNvbnN0IGxvY2F0aW9uID0gY3JlYXRlTG9jYXRpb24oeCwgU3RyaW5nLmZyb21DaGFyQ29kZSh5KSk7XG4gICAgICAgICAgICBwbGF5ZXJHYW1lQm9hcmQucHVzaChsb2NhdGlvbik7XG5cbiAgICAgICAgICAgIC8vIENyZWF0ZSBhIGRpdiBlbGVtZW50IGZvciBlYWNoIGxvY2F0aW9uLCBzZXQgaXRzIGlkLCBhbmQgYWRkIGEgQ1NTIGNsYXNzXG4gICAgICAgICAgICBjb25zdCBwbGF5ZXJDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcGxheWVyLWNvbnRhaW5lcicpO1xuXHRcdFx0Y29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBkaXYuaWQgPSBsb2NhdGlvbi54ICsgbG9jYXRpb24ueTtcbiAgICAgICAgICAgIGRpdi5jbGFzc0xpc3QuYWRkKCdsb2NhdGlvbicpOyAvLyBBZGQgdGhlIENTUyBjbGFzcyAnbG9jYXRpb24nIHRvIHRoZSBkaXZcbiAgICAgICAgICAgIHBsYXllckNvbnRhaW5lci5hcHBlbmRDaGlsZChkaXYpOyAvLyBBcHBlbmQgdGhlIGRpdiB0byB0aGUgcGxheWVyQ29udGFpbmVyXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gcGxheWVyR2FtZUJvYXJkO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVDb21wdXRlckxvY2F0aW9uKHgsIHkpIHtcbiAgICByZXR1cm4geyB4LCB5LCBib2F0OiAnbm9uZScsIGF0dGFja2VkOiAnbm8nIH07XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUNvbXB1dGVyR2FtZUJvYXJkKCkge1xuICAgIGNvbnN0IGNvbXB1dGVyR2FtZUJvYXJkID0gW107XG4gICAgY29uc3QgY29sdW1ucyA9IDEwO1xuICAgIGNvbnN0IHJvd3MgPSAxMDtcblxuICAgIGZvciAobGV0IHggPSAxOyB4IDw9IGNvbHVtbnM7IHgrKykge1xuICAgICAgICBmb3IgKGxldCB5ID0gJ0EnLmNoYXJDb2RlQXQoMCk7IHkgPD0gJ0onLmNoYXJDb2RlQXQoMCk7IHkrKykge1xuICAgICAgICAgICAgY29uc3QgbG9jYXRpb24gPSBjcmVhdGVDb21wdXRlckxvY2F0aW9uKHgsIFN0cmluZy5mcm9tQ2hhckNvZGUoeSkpO1xuICAgICAgICAgICAgY29tcHV0ZXJHYW1lQm9hcmQucHVzaChsb2NhdGlvbik7XG5cbiAgICAgICAgICAgIC8vIENyZWF0ZSBhIGRpdiBlbGVtZW50IGZvciBlYWNoIGxvY2F0aW9uIGluIHRoZSBjb21wdXRlciBnYW1lIGJvYXJkXG4gICAgICAgICAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIGRpdi5pZCA9ICdjb21wdXRlci0nICsgIGxvY2F0aW9uLnggKyBsb2NhdGlvbi55OyAvLyBBZGQgJ2NvbXB1dGVyLScgcHJlZml4IHRvIHRoZSBJRFxuICAgICAgICAgICAgZGl2LmNsYXNzTGlzdC5hZGQoJ2xvY2F0aW9uJyk7IC8vIEFkZCB0aGUgQ1NTIGNsYXNzICdsb2NhdGlvbicgdG8gdGhlIGRpdlxuICAgICAgICAgICAgY29tcHV0ZXJDb250YWluZXIuYXBwZW5kQ2hpbGQoZGl2KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBjb21wdXRlckdhbWVCb2FyZDtcbn1cblxuY29uc3QgcGxheWVyR2FtZUJvYXJkID0gY3JlYXRlUGxheWVyR2FtZUJvYXJkKCk7XG5jb25zdCBjb21wdXRlckdhbWVCb2FyZCA9IGNyZWF0ZUNvbXB1dGVyR2FtZUJvYXJkKCk7XG5cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==