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

console.log(playerGameBoard)
console.log(computerGameBoard)


/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxhQUFhO0FBQ2I7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsb0JBQW9CLGNBQWM7QUFDbEMsd0NBQXdDLHdCQUF3QjtBQUNoRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkNBQTJDO0FBQzNDLDhDQUE4QztBQUM5QztBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxhQUFhO0FBQ2I7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsb0JBQW9CLGNBQWM7QUFDbEMsd0NBQXdDLHdCQUF3QjtBQUNoRTtBQUNBOztBQUVBO0FBQ0E7QUFDQSw0REFBNEQ7QUFDNUQsMkNBQTJDO0FBQzNDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gY3JlYXRlU2hpcChuYW1lLCBsZW5ndGgsIGhpdHMsIHN1bmspIHtcblx0Ly8gQ3JlYXRlIGFuIGVtcHR5IG9iamVjdFxuXHRjb25zdCBzaGlwID0ge307XG5cblx0Ly8gQXNzaWduIHByb3BlcnRpZXMgdG8gdGhlIG9iamVjdFxuXHRzaGlwLm5hbWUgPSBuYW1lO1xuXHRzaGlwLmxlbmd0aCA9IGxlbmd0aDtcblx0c2hpcC5oaXRzID0gaGl0cztcblx0c2hpcC5zdW5rID0gc3VuaztcblxuXHQvLyBEZWZpbmUgYSBtZXRob2QgZm9yIHRoZSBvYmplY3Rcblx0c2hpcC5oaXQgPSBmdW5jdGlvbiAoKSB7XG5cdFx0c2hpcC5oaXRzICs9IDE7XG5cdFx0YWxlcnQoc2hpcC5uYW1lICsgJyBoYXMgYmVlbiBoaXQhJyk7XG5cdH07XG5cblx0c2hpcC5pc1N1bmsgPSBmdW5jdGlvbiAoKSB7XG5cdFx0aWYgKHNoaXAuaGl0cyA9PT0gc2hpcC5sZW5ndGgpIHtcblx0XHRcdHNoaXAuc3VuayA9ICdZZXMnO1xuXHRcdFx0YWxlcnQoc2hpcC5uYW1lICsgJyBoYXMgYmVlbiBzdW5rIScpO1xuXHRcdH1cblx0fTtcblxuXHQvLyBSZXR1cm4gdGhlIG9iamVjdFxuXHRyZXR1cm4gc2hpcDtcbn1cblxuY29uc3QgcGxheWVyQWlyY3JhZnRDYXJyaWVyID0gY3JlYXRlU2hpcCgnQWlyY3JhZnQgQ2FycmllcicsIDUsIDAsICdObycpO1xuY29uc3QgcGxheWVyQmF0dGxlc2hpcCA9IGNyZWF0ZVNoaXAoJ0JhdHRsZXNoaXAnLCA0LCAwLCAnTm8nKTtcbmNvbnN0IHBsYXllckRlc3Ryb3llciA9IGNyZWF0ZVNoaXAoJ0Rlc3Ryb3llcicsIDQsIDAsICdObycpO1xuY29uc3QgcGxheWVyU3VibWFyaW5lID0gY3JlYXRlU2hpcCgnU3VibWFyaW5lJywgMywgMCwgJ05vJyk7XG5jb25zdCBwbGF5ZXJQYXRyb2xCb2F0ID0gY3JlYXRlU2hpcCgnUGF0cm9sIEJvYXQnLCAyLCAwLCAnTm8nKTtcblxuY29uc3QgY29tcHV0ZXJBaXJjcmFmdENhcnJpZXIgPSBjcmVhdGVTaGlwKCdBaXJjcmFmdCBDYXJyaWVyJywgNSwgMCwgJ05vJyk7XG5jb25zdCBjb21wdXRlckJhdHRsZXNoaXAgPSBjcmVhdGVTaGlwKCdCYXR0bGVzaGlwJywgNCwgMCwgJ05vJyk7XG5jb25zdCBjb21wdXRlckRlc3Ryb3llciA9IGNyZWF0ZVNoaXAoJ0Rlc3Ryb3llcicsIDQsIDAsICdObycpO1xuY29uc3QgY29tcHV0ZXJTdWJtYXJpbmUgPSBjcmVhdGVTaGlwKCdTdWJtYXJpbmUnLCAzLCAwLCAnTm8nKTtcbmNvbnN0IGNvbXB1dGVyUGF0cm9sQm9hdCA9IGNyZWF0ZVNoaXAoJ1BhdHJvbCBCb2F0JywgMiwgMCwgJ05vJyk7XG5cbmZ1bmN0aW9uIGNyZWF0ZUxvY2F0aW9uKHgsIHkpIHtcbiAgICByZXR1cm4geyB4LCB5LCBib2F0OiAnbm9uZScsIGF0dGFja2VkOiAnbm8nIH07XG59XG5cbmNvbnN0IGNvbXB1dGVyQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NvbXB1dGVyLWNvbnRhaW5lcicpO1xuXG5mdW5jdGlvbiBjcmVhdGVQbGF5ZXJHYW1lQm9hcmQoKSB7XG4gICAgY29uc3QgcGxheWVyR2FtZUJvYXJkID0gW107XG4gICAgY29uc3QgY29sdW1ucyA9IDEwO1xuICAgIGNvbnN0IHJvd3MgPSAxMDtcblxuICAgIGZvciAobGV0IHggPSAxOyB4IDw9IGNvbHVtbnM7IHgrKykge1xuICAgICAgICBmb3IgKGxldCB5ID0gJ0EnLmNoYXJDb2RlQXQoMCk7IHkgPD0gJ0onLmNoYXJDb2RlQXQoMCk7IHkrKykge1xuICAgICAgICAgICAgY29uc3QgbG9jYXRpb24gPSBjcmVhdGVMb2NhdGlvbih4LCBTdHJpbmcuZnJvbUNoYXJDb2RlKHkpKTtcbiAgICAgICAgICAgIHBsYXllckdhbWVCb2FyZC5wdXNoKGxvY2F0aW9uKTtcblxuICAgICAgICAgICAgLy8gQ3JlYXRlIGEgZGl2IGVsZW1lbnQgZm9yIGVhY2ggbG9jYXRpb24sIHNldCBpdHMgaWQsIGFuZCBhZGQgYSBDU1MgY2xhc3NcbiAgICAgICAgICAgIGNvbnN0IHBsYXllckNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwbGF5ZXItY29udGFpbmVyJyk7XG5cdFx0XHRjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIGRpdi5pZCA9IGxvY2F0aW9uLnkgKyBsb2NhdGlvbi54O1xuICAgICAgICAgICAgZGl2LmNsYXNzTGlzdC5hZGQoJ2xvY2F0aW9uJyk7IC8vIEFkZCB0aGUgQ1NTIGNsYXNzICdsb2NhdGlvbicgdG8gdGhlIGRpdlxuICAgICAgICAgICAgcGxheWVyQ29udGFpbmVyLmFwcGVuZENoaWxkKGRpdik7IC8vIEFwcGVuZCB0aGUgZGl2IHRvIHRoZSBwbGF5ZXJDb250YWluZXJcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBwbGF5ZXJHYW1lQm9hcmQ7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUNvbXB1dGVyTG9jYXRpb24oeCwgeSkge1xuICAgIHJldHVybiB7IHgsIHksIGJvYXQ6ICdub25lJywgYXR0YWNrZWQ6ICdubycgfTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlQ29tcHV0ZXJHYW1lQm9hcmQoKSB7XG4gICAgY29uc3QgY29tcHV0ZXJHYW1lQm9hcmQgPSBbXTtcbiAgICBjb25zdCBjb2x1bW5zID0gMTA7XG4gICAgY29uc3Qgcm93cyA9IDEwO1xuXG4gICAgZm9yIChsZXQgeCA9IDE7IHggPD0gY29sdW1uczsgeCsrKSB7XG4gICAgICAgIGZvciAobGV0IHkgPSAnQScuY2hhckNvZGVBdCgwKTsgeSA8PSAnSicuY2hhckNvZGVBdCgwKTsgeSsrKSB7XG4gICAgICAgICAgICBjb25zdCBsb2NhdGlvbiA9IGNyZWF0ZUNvbXB1dGVyTG9jYXRpb24oeCwgU3RyaW5nLmZyb21DaGFyQ29kZSh5KSk7XG4gICAgICAgICAgICBjb21wdXRlckdhbWVCb2FyZC5wdXNoKGxvY2F0aW9uKTtcblxuICAgICAgICAgICAgLy8gQ3JlYXRlIGEgZGl2IGVsZW1lbnQgZm9yIGVhY2ggbG9jYXRpb24gaW4gdGhlIGNvbXB1dGVyIGdhbWUgYm9hcmRcbiAgICAgICAgICAgIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgZGl2LmlkID0gJ2NvbXB1dGVyLScgKyBsb2NhdGlvbi55ICsgbG9jYXRpb24ueDsgLy8gQWRkICdjb21wdXRlci0nIHByZWZpeCB0byB0aGUgSURcbiAgICAgICAgICAgIGRpdi5jbGFzc0xpc3QuYWRkKCdsb2NhdGlvbicpOyAvLyBBZGQgdGhlIENTUyBjbGFzcyAnbG9jYXRpb24nIHRvIHRoZSBkaXZcbiAgICAgICAgICAgIGNvbXB1dGVyQ29udGFpbmVyLmFwcGVuZENoaWxkKGRpdik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gY29tcHV0ZXJHYW1lQm9hcmQ7XG59XG5cbmNvbnN0IHBsYXllckdhbWVCb2FyZCA9IGNyZWF0ZVBsYXllckdhbWVCb2FyZCgpO1xuY29uc3QgY29tcHV0ZXJHYW1lQm9hcmQgPSBjcmVhdGVDb21wdXRlckdhbWVCb2FyZCgpO1xuXG5jb25zb2xlLmxvZyhwbGF5ZXJHYW1lQm9hcmQpXG5jb25zb2xlLmxvZyhjb21wdXRlckdhbWVCb2FyZClcblxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9