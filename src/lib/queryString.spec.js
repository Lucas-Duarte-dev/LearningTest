const { queryString } = require('./queryString');

describe('Object to query string', () => {
  it('Should create a valid query string when an object is provided', () => {
    const obj = {
      name: 'Lucas',
      profession: 'developer',
    };

    expect(queryString(obj)).toBe('name=Lucas&profession=developer');
  });
});
