const createShip = require('./createShip'); // Import your createShip function

describe('Ship', () => {
  it('should have zero hits', () => {
    const aircraftCarrier = createShip('Aircraft Carrier', 5, 0, 'No');
    expect(aircraftCarrier.hits).toEqual(0);
  });

  it('should have a length of 5', () => {
    const aircraftCarrier = createShip('Aircraft Carrier', 5, 0, 'No');
    expect(aircraftCarrier.length).toEqual(5);
  });

it('should increase hits by 1 when ship is hit', () => {
    const aircraftCarrier = createShip('Aircraft Carrier', 5, 0, 'No');
    const initialHits = aircraftCarrier.hits;
    aircraftCarrier.hit();
    expect(aircraftCarrier.hits).toEqual(initialHits + 1);
  });

it('should sink after 5 hits', () => {
    const aircraftCarrier = createShip('Aircraft Carrier', 5, 0, 'No');
for (let i = 0; i < 5; i++) {
 aircraftCarrier.hit();
};
    expect(aircraftCarrier.sunk).toEqual('yes');
  });

});
