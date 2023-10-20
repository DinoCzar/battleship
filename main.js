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
    ship.hit = function() {
       ship.hits += 1;
    };
  
  ship.isSunk = function() {
      if (ship.hits === ship.length) {
        ship.sunk = 'yes';
      }
    };
  
    // Return the object
    return ship;
  }
  
  const aircraftCarrier = createShip('Aircraft Carrier', 5, 0, 'No');
  
  console.log(aircraftCarrier.name, aircraftCarrier.length, aircraftCarrier.hits, aircraftCarrier.sunk);
  
  aircraftCarrier.hit();
  // adds hit to ship 
  
  aircraftCarrier.isSunk();
  // checks if ship is sunk and returns sunk if it is 
  
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiBjcmVhdGVTaGlwKG5hbWUsIGxlbmd0aCwgaGl0cywgc3Vuaykge1xuICAgIC8vIENyZWF0ZSBhbiBlbXB0eSBvYmplY3RcbiAgICBjb25zdCBzaGlwID0ge307XG4gIFxuICAgIC8vIEFzc2lnbiBwcm9wZXJ0aWVzIHRvIHRoZSBvYmplY3RcbiAgXG4gIHNoaXAubmFtZSA9IG5hbWU7XG4gIHNoaXAubGVuZ3RoID0gbGVuZ3RoO1xuICBzaGlwLmhpdHMgPSBoaXRzO1xuICBzaGlwLnN1bmsgPSBzdW5rO1xuICBcbiAgICAvLyBEZWZpbmUgYSBtZXRob2QgZm9yIHRoZSBvYmplY3RcbiAgICBzaGlwLmhpdCA9IGZ1bmN0aW9uKCkge1xuICAgICAgIHNoaXAuaGl0cyArPSAxO1xuICAgIH07XG4gIFxuICBzaGlwLmlzU3VuayA9IGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKHNoaXAuaGl0cyA9PT0gc2hpcC5sZW5ndGgpIHtcbiAgICAgICAgc2hpcC5zdW5rID0gJ3llcyc7XG4gICAgICB9XG4gICAgfTtcbiAgXG4gICAgLy8gUmV0dXJuIHRoZSBvYmplY3RcbiAgICByZXR1cm4gc2hpcDtcbiAgfVxuICBcbiAgY29uc3QgYWlyY3JhZnRDYXJyaWVyID0gY3JlYXRlU2hpcCgnQWlyY3JhZnQgQ2FycmllcicsIDUsIDAsICdObycpO1xuICBcbiAgY29uc29sZS5sb2coYWlyY3JhZnRDYXJyaWVyLm5hbWUsIGFpcmNyYWZ0Q2Fycmllci5sZW5ndGgsIGFpcmNyYWZ0Q2Fycmllci5oaXRzLCBhaXJjcmFmdENhcnJpZXIuc3Vuayk7XG4gIFxuICBhaXJjcmFmdENhcnJpZXIuaGl0KCk7XG4gIC8vIGFkZHMgaGl0IHRvIHNoaXAgXG4gIFxuICBhaXJjcmFmdENhcnJpZXIuaXNTdW5rKCk7XG4gIC8vIGNoZWNrcyBpZiBzaGlwIGlzIHN1bmsgYW5kIHJldHVybnMgc3VuayBpZiBpdCBpcyBcbiAgIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9