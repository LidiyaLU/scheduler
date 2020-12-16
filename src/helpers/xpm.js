const original = { one: 1, sub: { two: 2 } };
const original2 = {three: 3};
//const copy = { ...original, sub: { ...original.sub } };
const copy2 = {...original, original2}

console.log(original); // false
//console.log(copy); // false
console.log(copy2);