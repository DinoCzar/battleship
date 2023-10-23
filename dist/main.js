/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/

function createShip(name, length, hits, sunk) {
	const ship = {};
	ship.name = name;
	ship.length = length;
	ship.hits = hits;
	ship.sunk = sunk;
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

			const playerContainer = document.querySelector('#player-container');
			const div = document.createElement('div');
			div.id = String.fromCharCode(y) + x;
			div.classList.add('location');
			playerContainer.appendChild(div);
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

			const div = document.createElement('div');
			div.id = 'computer-' + String.fromCharCode(y) + x;
			div.classList.add('location');
			computerContainer.appendChild(div);
		}
	}

	return computerGameBoard;
}

const playerGameBoard = createPlayerGameBoard();
const computerGameBoard = createComputerGameBoard();

function randomCoordinate() {
	const x = Math.floor(Math.random() * 10) + 1;
	const y = String.fromCharCode(Math.floor(Math.random() * 10) + 'A'.charCodeAt(0));
	return { x, y };
}

function placeComputerShips(computerGameBoard, ships) {
	for (const ship of ships) {
		let validPlacement = false;
		while (!validPlacement) {
			const { x, y } = randomCoordinate();
			if (x + ship.length - 1 <= 10) {
				let canPlaceShip = true;
				for (let i = x; i < x + ship.length; i++) {
					const locationToCheck = computerGameBoard.find(loc => loc.x === i && loc.y === y);
					if (locationToCheck.boat !== 'none') {
						canPlaceShip = false;
						break;
					}
				}
				if (canPlaceShip) {
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

const computerShips = [computerAircraftCarrier, computerBattleship, computerDestroyer, computerSubmarine, computerPatrolBoat];

placeComputerShips(computerGameBoard, computerShips);

function placePlayerShips(playerGameBoard, ships) {
    for (const ship of ships) {
        let validPlacement = false;

        while (!validPlacement) {
            const x = parseInt(prompt(`Enter x-coordinate for ${ship.name} (1-10):`));
            const y = prompt(`Enter y-coordinate for ${ship.name} (A-J):`);
            const horizontal = confirm(`Do you want to place the ship vertically? (OK for Yes, Cancel for No)`);

            if (x >= 1 && x <= 10 && y >= 'A' && y <= 'J') {
                const yUpper = y.toUpperCase();

                if (horizontal) {
                    // Check if there's enough space to place the ship vertically
                    if (x + ship.length - 1 <= 10) {
                        let canPlaceShip = true;
                        for (let i = x; i < x + ship.length; i++) {
                            const locationToCheck = playerGameBoard.find(loc => loc.x === i && loc.y === yUpper);
                            if (locationToCheck.boat !== 'none') {
                                canPlaceShip = false;
                                break;
                            }
                        }
                        if (canPlaceShip) {
                            for (let i = x; i < x + ship.length; i++) {
                                const locationToPlace = playerGameBoard.find(loc => loc.x === i && loc.y === yUpper);
                                locationToPlace.boat = ship.name;
                            }
                            validPlacement = true;
                            alert(`${ship.name} has been placed at ${x}${yUpper}`);
                        }
                    }
                } else {
                    // Check if there's enough space to place the ship vertically
                    if (String.fromCharCode(yUpper.charCodeAt(0) + ship.length - 1) <= 'J') {
                        let canPlaceShip = true;
                        for (let i = yUpper.charCodeAt(0); i < yUpper.charCodeAt(0) + ship.length; i++) {
                            const locationToCheck = playerGameBoard.find(loc => loc.x === x && loc.y === String.fromCharCode(i));
                            if (locationToCheck.boat !== 'none') {
                                canPlaceShip = false;
                                break;
                            }
                        }
                        if (canPlaceShip) {
                            for (let i = yUpper.charCodeAt(0); i < yUpper.charCodeAt(0) + ship.length; i++) {
                                const locationToPlace = playerGameBoard.find(loc => loc.x === x && loc.y === String.fromCharCode(i));
                                locationToPlace.boat = ship.name;
                            }
                            validPlacement = true;
                            alert(`${ship.name} has been placed at ${x}${yUpper}`);
                        }
                    }
                }
            }
        }
    }
}

// Create an array of player ships
const playerShips = [playerAircraftCarrier, playerBattleship, playerDestroyer, playerSubmarine, playerPatrolBoat];

// Prompt the player to place each ship
placePlayerShips(playerGameBoard, playerShips);


console.log(playerGameBoard);
console.log(computerGameBoard);
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsVUFBVTtBQUNWOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlCQUFpQixjQUFjO0FBQy9CLGtDQUFrQyx3QkFBd0I7QUFDMUQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsVUFBVTtBQUNWOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlCQUFpQixjQUFjO0FBQy9CLGtDQUFrQyx3QkFBd0I7QUFDMUQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQjtBQUNBO0FBQ0Esb0JBQW9CLHFCQUFxQjtBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixxQkFBcUI7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGdFQUFnRSxXQUFXO0FBQzNFLHVEQUF1RCxXQUFXO0FBQ2xFOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MscUJBQXFCO0FBQzdEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNENBQTRDLHFCQUFxQjtBQUNqRTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQyxXQUFXLHFCQUFxQixFQUFFLEVBQUUsT0FBTztBQUNoRjtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBLDJEQUEyRCx3Q0FBd0M7QUFDbkc7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrREFBK0Qsd0NBQXdDO0FBQ3ZHO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDLFdBQVcscUJBQXFCLEVBQUUsRUFBRSxPQUFPO0FBQ2hGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7O0FBR0E7QUFDQSwrQiIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiXG5mdW5jdGlvbiBjcmVhdGVTaGlwKG5hbWUsIGxlbmd0aCwgaGl0cywgc3Vuaykge1xuXHRjb25zdCBzaGlwID0ge307XG5cdHNoaXAubmFtZSA9IG5hbWU7XG5cdHNoaXAubGVuZ3RoID0gbGVuZ3RoO1xuXHRzaGlwLmhpdHMgPSBoaXRzO1xuXHRzaGlwLnN1bmsgPSBzdW5rO1xuXHRzaGlwLmhpdCA9IGZ1bmN0aW9uICgpIHtcblx0XHRzaGlwLmhpdHMgKz0gMTtcblx0XHRhbGVydChzaGlwLm5hbWUgKyAnIGhhcyBiZWVuIGhpdCEnKTtcblx0fTtcblx0c2hpcC5pc1N1bmsgPSBmdW5jdGlvbiAoKSB7XG5cdFx0aWYgKHNoaXAuaGl0cyA9PT0gc2hpcC5sZW5ndGgpIHtcblx0XHRcdHNoaXAuc3VuayA9ICdZZXMnO1xuXHRcdFx0YWxlcnQoc2hpcC5uYW1lICsgJyBoYXMgYmVlbiBzdW5rIScpO1xuXHRcdH1cblx0fTtcblx0cmV0dXJuIHNoaXA7XG59XG5cbmNvbnN0IHBsYXllckFpcmNyYWZ0Q2FycmllciA9IGNyZWF0ZVNoaXAoJ0FpcmNyYWZ0IENhcnJpZXInLCA1LCAwLCAnTm8nKTtcbmNvbnN0IHBsYXllckJhdHRsZXNoaXAgPSBjcmVhdGVTaGlwKCdCYXR0bGVzaGlwJywgNCwgMCwgJ05vJyk7XG5jb25zdCBwbGF5ZXJEZXN0cm95ZXIgPSBjcmVhdGVTaGlwKCdEZXN0cm95ZXInLCA0LCAwLCAnTm8nKTtcbmNvbnN0IHBsYXllclN1Ym1hcmluZSA9IGNyZWF0ZVNoaXAoJ1N1Ym1hcmluZScsIDMsIDAsICdObycpO1xuY29uc3QgcGxheWVyUGF0cm9sQm9hdCA9IGNyZWF0ZVNoaXAoJ1BhdHJvbCBCb2F0JywgMiwgMCwgJ05vJyk7XG5cbmNvbnN0IGNvbXB1dGVyQWlyY3JhZnRDYXJyaWVyID0gY3JlYXRlU2hpcCgnQWlyY3JhZnQgQ2FycmllcicsIDUsIDAsICdObycpO1xuY29uc3QgY29tcHV0ZXJCYXR0bGVzaGlwID0gY3JlYXRlU2hpcCgnQmF0dGxlc2hpcCcsIDQsIDAsICdObycpO1xuY29uc3QgY29tcHV0ZXJEZXN0cm95ZXIgPSBjcmVhdGVTaGlwKCdEZXN0cm95ZXInLCA0LCAwLCAnTm8nKTtcbmNvbnN0IGNvbXB1dGVyU3VibWFyaW5lID0gY3JlYXRlU2hpcCgnU3VibWFyaW5lJywgMywgMCwgJ05vJyk7XG5jb25zdCBjb21wdXRlclBhdHJvbEJvYXQgPSBjcmVhdGVTaGlwKCdQYXRyb2wgQm9hdCcsIDIsIDAsICdObycpO1xuXG5mdW5jdGlvbiBjcmVhdGVMb2NhdGlvbih4LCB5KSB7XG5cdHJldHVybiB7IHgsIHksIGJvYXQ6ICdub25lJywgYXR0YWNrZWQ6ICdubycgfTtcbn1cblxuY29uc3QgY29tcHV0ZXJDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY29tcHV0ZXItY29udGFpbmVyJyk7XG5cbmZ1bmN0aW9uIGNyZWF0ZVBsYXllckdhbWVCb2FyZCgpIHtcblx0Y29uc3QgcGxheWVyR2FtZUJvYXJkID0gW107XG5cdGNvbnN0IGNvbHVtbnMgPSAxMDtcblx0Y29uc3Qgcm93cyA9IDEwO1xuXG5cdGZvciAobGV0IHggPSAxOyB4IDw9IGNvbHVtbnM7IHgrKykge1xuXHRcdGZvciAobGV0IHkgPSAnQScuY2hhckNvZGVBdCgwKTsgeSA8PSAnSicuY2hhckNvZGVBdCgwKTsgeSsrKSB7XG5cdFx0XHRjb25zdCBsb2NhdGlvbiA9IGNyZWF0ZUxvY2F0aW9uKHgsIFN0cmluZy5mcm9tQ2hhckNvZGUoeSkpO1xuXHRcdFx0cGxheWVyR2FtZUJvYXJkLnB1c2gobG9jYXRpb24pO1xuXG5cdFx0XHRjb25zdCBwbGF5ZXJDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcGxheWVyLWNvbnRhaW5lcicpO1xuXHRcdFx0Y29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdFx0XHRkaXYuaWQgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKHkpICsgeDtcblx0XHRcdGRpdi5jbGFzc0xpc3QuYWRkKCdsb2NhdGlvbicpO1xuXHRcdFx0cGxheWVyQ29udGFpbmVyLmFwcGVuZENoaWxkKGRpdik7XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIHBsYXllckdhbWVCb2FyZDtcbn1cblxuZnVuY3Rpb24gY3JlYXRlQ29tcHV0ZXJMb2NhdGlvbih4LCB5KSB7XG5cdHJldHVybiB7IHgsIHksIGJvYXQ6ICdub25lJywgYXR0YWNrZWQ6ICdubycgfTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlQ29tcHV0ZXJHYW1lQm9hcmQoKSB7XG5cdGNvbnN0IGNvbXB1dGVyR2FtZUJvYXJkID0gW107XG5cdGNvbnN0IGNvbHVtbnMgPSAxMDtcblx0Y29uc3Qgcm93cyA9IDEwO1xuXG5cdGZvciAobGV0IHggPSAxOyB4IDw9IGNvbHVtbnM7IHgrKykge1xuXHRcdGZvciAobGV0IHkgPSAnQScuY2hhckNvZGVBdCgwKTsgeSA8PSAnSicuY2hhckNvZGVBdCgwKTsgeSsrKSB7XG5cdFx0XHRjb25zdCBsb2NhdGlvbiA9IGNyZWF0ZUNvbXB1dGVyTG9jYXRpb24oeCwgU3RyaW5nLmZyb21DaGFyQ29kZSh5KSk7XG5cdFx0XHRjb21wdXRlckdhbWVCb2FyZC5wdXNoKGxvY2F0aW9uKTtcblxuXHRcdFx0Y29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdFx0XHRkaXYuaWQgPSAnY29tcHV0ZXItJyArIFN0cmluZy5mcm9tQ2hhckNvZGUoeSkgKyB4O1xuXHRcdFx0ZGl2LmNsYXNzTGlzdC5hZGQoJ2xvY2F0aW9uJyk7XG5cdFx0XHRjb21wdXRlckNvbnRhaW5lci5hcHBlbmRDaGlsZChkaXYpO1xuXHRcdH1cblx0fVxuXG5cdHJldHVybiBjb21wdXRlckdhbWVCb2FyZDtcbn1cblxuY29uc3QgcGxheWVyR2FtZUJvYXJkID0gY3JlYXRlUGxheWVyR2FtZUJvYXJkKCk7XG5jb25zdCBjb21wdXRlckdhbWVCb2FyZCA9IGNyZWF0ZUNvbXB1dGVyR2FtZUJvYXJkKCk7XG5cbmZ1bmN0aW9uIHJhbmRvbUNvb3JkaW5hdGUoKSB7XG5cdGNvbnN0IHggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCkgKyAxO1xuXHRjb25zdCB5ID0gU3RyaW5nLmZyb21DaGFyQ29kZShNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCkgKyAnQScuY2hhckNvZGVBdCgwKSk7XG5cdHJldHVybiB7IHgsIHkgfTtcbn1cblxuZnVuY3Rpb24gcGxhY2VDb21wdXRlclNoaXBzKGNvbXB1dGVyR2FtZUJvYXJkLCBzaGlwcykge1xuXHRmb3IgKGNvbnN0IHNoaXAgb2Ygc2hpcHMpIHtcblx0XHRsZXQgdmFsaWRQbGFjZW1lbnQgPSBmYWxzZTtcblx0XHR3aGlsZSAoIXZhbGlkUGxhY2VtZW50KSB7XG5cdFx0XHRjb25zdCB7IHgsIHkgfSA9IHJhbmRvbUNvb3JkaW5hdGUoKTtcblx0XHRcdGlmICh4ICsgc2hpcC5sZW5ndGggLSAxIDw9IDEwKSB7XG5cdFx0XHRcdGxldCBjYW5QbGFjZVNoaXAgPSB0cnVlO1xuXHRcdFx0XHRmb3IgKGxldCBpID0geDsgaSA8IHggKyBzaGlwLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdFx0Y29uc3QgbG9jYXRpb25Ub0NoZWNrID0gY29tcHV0ZXJHYW1lQm9hcmQuZmluZChsb2MgPT4gbG9jLnggPT09IGkgJiYgbG9jLnkgPT09IHkpO1xuXHRcdFx0XHRcdGlmIChsb2NhdGlvblRvQ2hlY2suYm9hdCAhPT0gJ25vbmUnKSB7XG5cdFx0XHRcdFx0XHRjYW5QbGFjZVNoaXAgPSBmYWxzZTtcblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAoY2FuUGxhY2VTaGlwKSB7XG5cdFx0XHRcdFx0Zm9yIChsZXQgaSA9IHg7IGkgPCB4ICsgc2hpcC5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRcdFx0Y29uc3QgbG9jYXRpb25Ub1BsYWNlID0gY29tcHV0ZXJHYW1lQm9hcmQuZmluZChsb2MgPT4gbG9jLnggPT09IGkgJiYgbG9jLnkgPT09IHkpO1xuXHRcdFx0XHRcdFx0bG9jYXRpb25Ub1BsYWNlLmJvYXQgPSBzaGlwLm5hbWU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHZhbGlkUGxhY2VtZW50ID0gdHJ1ZTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxufVxuXG5jb25zdCBjb21wdXRlclNoaXBzID0gW2NvbXB1dGVyQWlyY3JhZnRDYXJyaWVyLCBjb21wdXRlckJhdHRsZXNoaXAsIGNvbXB1dGVyRGVzdHJveWVyLCBjb21wdXRlclN1Ym1hcmluZSwgY29tcHV0ZXJQYXRyb2xCb2F0XTtcblxucGxhY2VDb21wdXRlclNoaXBzKGNvbXB1dGVyR2FtZUJvYXJkLCBjb21wdXRlclNoaXBzKTtcblxuZnVuY3Rpb24gcGxhY2VQbGF5ZXJTaGlwcyhwbGF5ZXJHYW1lQm9hcmQsIHNoaXBzKSB7XG4gICAgZm9yIChjb25zdCBzaGlwIG9mIHNoaXBzKSB7XG4gICAgICAgIGxldCB2YWxpZFBsYWNlbWVudCA9IGZhbHNlO1xuXG4gICAgICAgIHdoaWxlICghdmFsaWRQbGFjZW1lbnQpIHtcbiAgICAgICAgICAgIGNvbnN0IHggPSBwYXJzZUludChwcm9tcHQoYEVudGVyIHgtY29vcmRpbmF0ZSBmb3IgJHtzaGlwLm5hbWV9ICgxLTEwKTpgKSk7XG4gICAgICAgICAgICBjb25zdCB5ID0gcHJvbXB0KGBFbnRlciB5LWNvb3JkaW5hdGUgZm9yICR7c2hpcC5uYW1lfSAoQS1KKTpgKTtcbiAgICAgICAgICAgIGNvbnN0IGhvcml6b250YWwgPSBjb25maXJtKGBEbyB5b3Ugd2FudCB0byBwbGFjZSB0aGUgc2hpcCB2ZXJ0aWNhbGx5PyAoT0sgZm9yIFllcywgQ2FuY2VsIGZvciBObylgKTtcblxuICAgICAgICAgICAgaWYgKHggPj0gMSAmJiB4IDw9IDEwICYmIHkgPj0gJ0EnICYmIHkgPD0gJ0onKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgeVVwcGVyID0geS50b1VwcGVyQ2FzZSgpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGhvcml6b250YWwpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gQ2hlY2sgaWYgdGhlcmUncyBlbm91Z2ggc3BhY2UgdG8gcGxhY2UgdGhlIHNoaXAgdmVydGljYWxseVxuICAgICAgICAgICAgICAgICAgICBpZiAoeCArIHNoaXAubGVuZ3RoIC0gMSA8PSAxMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNhblBsYWNlU2hpcCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0geDsgaSA8IHggKyBzaGlwLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbG9jYXRpb25Ub0NoZWNrID0gcGxheWVyR2FtZUJvYXJkLmZpbmQobG9jID0+IGxvYy54ID09PSBpICYmIGxvYy55ID09PSB5VXBwZXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsb2NhdGlvblRvQ2hlY2suYm9hdCAhPT0gJ25vbmUnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhblBsYWNlU2hpcCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2FuUGxhY2VTaGlwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IHg7IGkgPCB4ICsgc2hpcC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBsb2NhdGlvblRvUGxhY2UgPSBwbGF5ZXJHYW1lQm9hcmQuZmluZChsb2MgPT4gbG9jLnggPT09IGkgJiYgbG9jLnkgPT09IHlVcHBlcik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvY2F0aW9uVG9QbGFjZS5ib2F0ID0gc2hpcC5uYW1lO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWxpZFBsYWNlbWVudCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnQoYCR7c2hpcC5uYW1lfSBoYXMgYmVlbiBwbGFjZWQgYXQgJHt4fSR7eVVwcGVyfWApO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gQ2hlY2sgaWYgdGhlcmUncyBlbm91Z2ggc3BhY2UgdG8gcGxhY2UgdGhlIHNoaXAgdmVydGljYWxseVxuICAgICAgICAgICAgICAgICAgICBpZiAoU3RyaW5nLmZyb21DaGFyQ29kZSh5VXBwZXIuY2hhckNvZGVBdCgwKSArIHNoaXAubGVuZ3RoIC0gMSkgPD0gJ0onKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgY2FuUGxhY2VTaGlwID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSB5VXBwZXIuY2hhckNvZGVBdCgwKTsgaSA8IHlVcHBlci5jaGFyQ29kZUF0KDApICsgc2hpcC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGxvY2F0aW9uVG9DaGVjayA9IHBsYXllckdhbWVCb2FyZC5maW5kKGxvYyA9PiBsb2MueCA9PT0geCAmJiBsb2MueSA9PT0gU3RyaW5nLmZyb21DaGFyQ29kZShpKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxvY2F0aW9uVG9DaGVjay5ib2F0ICE9PSAnbm9uZScpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FuUGxhY2VTaGlwID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjYW5QbGFjZVNoaXApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0geVVwcGVyLmNoYXJDb2RlQXQoMCk7IGkgPCB5VXBwZXIuY2hhckNvZGVBdCgwKSArIHNoaXAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbG9jYXRpb25Ub1BsYWNlID0gcGxheWVyR2FtZUJvYXJkLmZpbmQobG9jID0+IGxvYy54ID09PSB4ICYmIGxvYy55ID09PSBTdHJpbmcuZnJvbUNoYXJDb2RlKGkpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9jYXRpb25Ub1BsYWNlLmJvYXQgPSBzaGlwLm5hbWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkUGxhY2VtZW50ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbGVydChgJHtzaGlwLm5hbWV9IGhhcyBiZWVuIHBsYWNlZCBhdCAke3h9JHt5VXBwZXJ9YCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5cbi8vIENyZWF0ZSBhbiBhcnJheSBvZiBwbGF5ZXIgc2hpcHNcbmNvbnN0IHBsYXllclNoaXBzID0gW3BsYXllckFpcmNyYWZ0Q2FycmllciwgcGxheWVyQmF0dGxlc2hpcCwgcGxheWVyRGVzdHJveWVyLCBwbGF5ZXJTdWJtYXJpbmUsIHBsYXllclBhdHJvbEJvYXRdO1xuXG4vLyBQcm9tcHQgdGhlIHBsYXllciB0byBwbGFjZSBlYWNoIHNoaXBcbnBsYWNlUGxheWVyU2hpcHMocGxheWVyR2FtZUJvYXJkLCBwbGF5ZXJTaGlwcyk7XG5cblxuY29uc29sZS5sb2cocGxheWVyR2FtZUJvYXJkKTtcbmNvbnNvbGUubG9nKGNvbXB1dGVyR2FtZUJvYXJkKTsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=