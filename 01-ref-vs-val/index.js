const assert = require("assert");

let counter = 0;
let counter2 = counter;

counter2++;

// tipo primitivo gera uma cópia em memória
assert.deepStrictEqual(counter, 0);
assert.deepStrictEqual(counter2, 1);

const item = { counter: 0 };
const item2 = item;

item2.counter++;

// tipo de referência copia o endereço de memória e aponta para o mesmo lugar
assert.deepStrictEqual(item, { counter: 1 });
assert.deepStrictEqual(item2, { counter: 1 });

// Object.create({ ... }) força a criação do obj em um novo endereço de memória
