const {sum} = require('./calculetor');

it("Should sum 2 and and 2 the result must be 4 ", () => {
    expect(sum(2, 2)).toBe(4);
});

it("Should sum 2 and 2 even if one of them is a string and the result must the 4", () => {
    expect(sum(2, "2")).toBe(4);
})

it("Should throw an error if what is provided to the method cannot be summed", () => {
    expect(() => {
        sum('', '2')
    }).toThrowError();

    expect(() => {
        sum([2, 2])
    }).toThrowError();

    expect(() => {
        sum({})
    }).toThrowError();

    expect(() => {
        sum()
    }).toThrowError();
})
