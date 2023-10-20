const {createShip} = require('./index'); 

test('should have zero hits', () => {
    expect((createShip('Aircraft Carrier', 5, 0, 'No').hits)).toBe(0);
  });