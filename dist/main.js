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

function createPlayerGameBoard() {
    const playerGameBoard = [];
    const columns = 10;
    const rows = 10;

    for (let x = 1; x <= columns; x++) {
        for (let y = 'A'.charCodeAt(0); y <= 'J'.charCodeAt(0); y++) {
            const location = createLocation(x, String.fromCharCode(y));
            playerGameBoard.push(location);

            // Create a div element for each location and set its id
            const div = document.createElement('div');
            div.id = location.y + location.x;
            document.body.appendChild(div); // You can append it to the body or another container as needed.
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
        }
    }

    return computerGameBoard;
}

const playerGameBoard = createPlayerGameBoard();
const computerGameBoard = createComputerGameBoard();

// Example usage of the playerGameBoard and computerGameBoard:
console.log(playerGameBoard); // Player's game board with x, y, boat, and attacked properties.
console.log(computerGameBoard); // Computer's game board with x, y, boat, and attacked properties.

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxhQUFhO0FBQ2I7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsb0JBQW9CLGNBQWM7QUFDbEMsd0NBQXdDLHdCQUF3QjtBQUNoRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLDRDQUE0QztBQUM1QztBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxhQUFhO0FBQ2I7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsb0JBQW9CLGNBQWM7QUFDbEMsd0NBQXdDLHdCQUF3QjtBQUNoRTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSw4QkFBOEI7QUFDOUIsZ0NBQWdDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiBjcmVhdGVTaGlwKG5hbWUsIGxlbmd0aCwgaGl0cywgc3Vuaykge1xuXHQvLyBDcmVhdGUgYW4gZW1wdHkgb2JqZWN0XG5cdGNvbnN0IHNoaXAgPSB7fTtcblxuXHQvLyBBc3NpZ24gcHJvcGVydGllcyB0byB0aGUgb2JqZWN0XG5cdHNoaXAubmFtZSA9IG5hbWU7XG5cdHNoaXAubGVuZ3RoID0gbGVuZ3RoO1xuXHRzaGlwLmhpdHMgPSBoaXRzO1xuXHRzaGlwLnN1bmsgPSBzdW5rO1xuXG5cdC8vIERlZmluZSBhIG1ldGhvZCBmb3IgdGhlIG9iamVjdFxuXHRzaGlwLmhpdCA9IGZ1bmN0aW9uICgpIHtcblx0XHRzaGlwLmhpdHMgKz0gMTtcblx0XHRhbGVydChzaGlwLm5hbWUgKyAnIGhhcyBiZWVuIGhpdCEnKTtcblx0fTtcblxuXHRzaGlwLmlzU3VuayA9IGZ1bmN0aW9uICgpIHtcblx0XHRpZiAoc2hpcC5oaXRzID09PSBzaGlwLmxlbmd0aCkge1xuXHRcdFx0c2hpcC5zdW5rID0gJ1llcyc7XG5cdFx0XHRhbGVydChzaGlwLm5hbWUgKyAnIGhhcyBiZWVuIHN1bmshJyk7XG5cdFx0fVxuXHR9O1xuXG5cdC8vIFJldHVybiB0aGUgb2JqZWN0XG5cdHJldHVybiBzaGlwO1xufVxuXG5jb25zdCBwbGF5ZXJBaXJjcmFmdENhcnJpZXIgPSBjcmVhdGVTaGlwKCdBaXJjcmFmdCBDYXJyaWVyJywgNSwgMCwgJ05vJyk7XG5jb25zdCBwbGF5ZXJCYXR0bGVzaGlwID0gY3JlYXRlU2hpcCgnQmF0dGxlc2hpcCcsIDQsIDAsICdObycpO1xuY29uc3QgcGxheWVyRGVzdHJveWVyID0gY3JlYXRlU2hpcCgnRGVzdHJveWVyJywgNCwgMCwgJ05vJyk7XG5jb25zdCBwbGF5ZXJTdWJtYXJpbmUgPSBjcmVhdGVTaGlwKCdTdWJtYXJpbmUnLCAzLCAwLCAnTm8nKTtcbmNvbnN0IHBsYXllclBhdHJvbEJvYXQgPSBjcmVhdGVTaGlwKCdQYXRyb2wgQm9hdCcsIDIsIDAsICdObycpO1xuXG5jb25zdCBjb21wdXRlckFpcmNyYWZ0Q2FycmllciA9IGNyZWF0ZVNoaXAoJ0FpcmNyYWZ0IENhcnJpZXInLCA1LCAwLCAnTm8nKTtcbmNvbnN0IGNvbXB1dGVyQmF0dGxlc2hpcCA9IGNyZWF0ZVNoaXAoJ0JhdHRsZXNoaXAnLCA0LCAwLCAnTm8nKTtcbmNvbnN0IGNvbXB1dGVyRGVzdHJveWVyID0gY3JlYXRlU2hpcCgnRGVzdHJveWVyJywgNCwgMCwgJ05vJyk7XG5jb25zdCBjb21wdXRlclN1Ym1hcmluZSA9IGNyZWF0ZVNoaXAoJ1N1Ym1hcmluZScsIDMsIDAsICdObycpO1xuY29uc3QgY29tcHV0ZXJQYXRyb2xCb2F0ID0gY3JlYXRlU2hpcCgnUGF0cm9sIEJvYXQnLCAyLCAwLCAnTm8nKTtcblxuZnVuY3Rpb24gY3JlYXRlTG9jYXRpb24oeCwgeSkge1xuICAgIHJldHVybiB7IHgsIHksIGJvYXQ6ICdub25lJywgYXR0YWNrZWQ6ICdubycgfTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlUGxheWVyR2FtZUJvYXJkKCkge1xuICAgIGNvbnN0IHBsYXllckdhbWVCb2FyZCA9IFtdO1xuICAgIGNvbnN0IGNvbHVtbnMgPSAxMDtcbiAgICBjb25zdCByb3dzID0gMTA7XG5cbiAgICBmb3IgKGxldCB4ID0gMTsgeCA8PSBjb2x1bW5zOyB4KyspIHtcbiAgICAgICAgZm9yIChsZXQgeSA9ICdBJy5jaGFyQ29kZUF0KDApOyB5IDw9ICdKJy5jaGFyQ29kZUF0KDApOyB5KyspIHtcbiAgICAgICAgICAgIGNvbnN0IGxvY2F0aW9uID0gY3JlYXRlTG9jYXRpb24oeCwgU3RyaW5nLmZyb21DaGFyQ29kZSh5KSk7XG4gICAgICAgICAgICBwbGF5ZXJHYW1lQm9hcmQucHVzaChsb2NhdGlvbik7XG5cbiAgICAgICAgICAgIC8vIENyZWF0ZSBhIGRpdiBlbGVtZW50IGZvciBlYWNoIGxvY2F0aW9uIGFuZCBzZXQgaXRzIGlkXG4gICAgICAgICAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIGRpdi5pZCA9IGxvY2F0aW9uLnkgKyBsb2NhdGlvbi54O1xuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChkaXYpOyAvLyBZb3UgY2FuIGFwcGVuZCBpdCB0byB0aGUgYm9keSBvciBhbm90aGVyIGNvbnRhaW5lciBhcyBuZWVkZWQuXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gcGxheWVyR2FtZUJvYXJkO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVDb21wdXRlckxvY2F0aW9uKHgsIHkpIHtcbiAgICByZXR1cm4geyB4LCB5LCBib2F0OiAnbm9uZScsIGF0dGFja2VkOiAnbm8nIH07XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUNvbXB1dGVyR2FtZUJvYXJkKCkge1xuICAgIGNvbnN0IGNvbXB1dGVyR2FtZUJvYXJkID0gW107XG4gICAgY29uc3QgY29sdW1ucyA9IDEwO1xuICAgIGNvbnN0IHJvd3MgPSAxMDtcblxuICAgIGZvciAobGV0IHggPSAxOyB4IDw9IGNvbHVtbnM7IHgrKykge1xuICAgICAgICBmb3IgKGxldCB5ID0gJ0EnLmNoYXJDb2RlQXQoMCk7IHkgPD0gJ0onLmNoYXJDb2RlQXQoMCk7IHkrKykge1xuICAgICAgICAgICAgY29uc3QgbG9jYXRpb24gPSBjcmVhdGVDb21wdXRlckxvY2F0aW9uKHgsIFN0cmluZy5mcm9tQ2hhckNvZGUoeSkpO1xuICAgICAgICAgICAgY29tcHV0ZXJHYW1lQm9hcmQucHVzaChsb2NhdGlvbik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gY29tcHV0ZXJHYW1lQm9hcmQ7XG59XG5cbmNvbnN0IHBsYXllckdhbWVCb2FyZCA9IGNyZWF0ZVBsYXllckdhbWVCb2FyZCgpO1xuY29uc3QgY29tcHV0ZXJHYW1lQm9hcmQgPSBjcmVhdGVDb21wdXRlckdhbWVCb2FyZCgpO1xuXG4vLyBFeGFtcGxlIHVzYWdlIG9mIHRoZSBwbGF5ZXJHYW1lQm9hcmQgYW5kIGNvbXB1dGVyR2FtZUJvYXJkOlxuY29uc29sZS5sb2cocGxheWVyR2FtZUJvYXJkKTsgLy8gUGxheWVyJ3MgZ2FtZSBib2FyZCB3aXRoIHgsIHksIGJvYXQsIGFuZCBhdHRhY2tlZCBwcm9wZXJ0aWVzLlxuY29uc29sZS5sb2coY29tcHV0ZXJHYW1lQm9hcmQpOyAvLyBDb21wdXRlcidzIGdhbWUgYm9hcmQgd2l0aCB4LCB5LCBib2F0LCBhbmQgYXR0YWNrZWQgcHJvcGVydGllcy5cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==