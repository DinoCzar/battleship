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
  