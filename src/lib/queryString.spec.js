const { queryString, parse } = require('./queryString');

describe('Object to query string', () => {
  it('Should create a valid query string when an object is provided', () => {
    const obj = {
      name: 'Lucas',
      profession: 'developer',
    };

    expect(queryString(obj)).toBe('name=Lucas&profession=developer');
  });

  it('Should create a valid query string even when an array is passed as value', () => {
    const obj = {
      name: 'Lucas',
      abilities: ['JS', 'TDD']
    };

    expect(queryString(obj)).toBe('name=Lucas&abilities=JS,TDD');
  });

  it('Should throw an error when an object is passed as value', () => {
    const obj = {
      name: 'Lucas',
      abilities: {
        first: 'JS',
        second: 'TDD'
      }
    };

    expect(() => {
      queryString(obj);
    }).toThrowError();

  })
});

describe('Query string to object', () => {
 it("Should convert query string to object", () => {
   const qs = "name=Lucas&profession=developer";

   expect(parse(qs)).toEqual({
     name: 'Lucas',
     profession: 'developer',
   });
 });

 it("Should convert a query string of a single key-value pair to object", () => {
   const qs = "name=Lucas";

   expect(parse(qs)).toEqual({
     name: 'Lucas',
   });
 });


 it("Should convert a query string to an object taking care of comma separated values", () => {
   const qs = "name=Lucas&abilities=JS,TDD";

   expect(parse(qs)).toEqual({
     name: "Lucas",
     abilities: ["JS", "TDD"]
   })
 });
});
