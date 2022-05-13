// https://wtfjs.com/

9999999999999999; // 16 x 9 = 10000000000000000

true + 2; // 3

"21" + true; // '21true'

"21" - true; // 20

"21" - -1; // 22

0.1 + 0.2 === 0.3; // false

3 > 2 > 1; // false

3 > 2 >= 1; // true

"B" + "a" + +"a" + "a"; // BaNaNa

"1" == 1; // true

"1" === 1; // false

// --------------------------------------------------

// conversão explícita para string:
// String()
// smth + ""
console.assert(String(123) === "123", "explicit convertion to string");
console.assert(123 + "" === "123", "implicit convertion to string");

console.assert(
  ("hello" || 123) === "hello",
  "|| returns the first element if true"
);
console.assert(
  ("hello" && 123) === 123,
  "&& returns the last element if both true"
);

// --------------------------------------------------

const item = {
  name: "Victor",
  age: 25,
  // substitui comportamento padrão do método toString()
  // chama primeiro se conversao tipo string; se não for primitivo, chama valueOf caso return nao seja primitivo
  toString() {
    console.log("trying to convert with toString");
    return `name: ${this.name}, age: ${this.age}`; // antes: [object Object]
  },
  // substitui...
  // chama primeiro se conversao tipo number; se não for primitivo, chama toString caso return nao seja primitivo
  valueOf() {
    console.log("trying to convert with valueOf");
    return { value: "Victor,25" };
  },
  // substitui todo o comportamento de conversão; tem prioridade de execução
  [Symbol.toPrimitive](coercionType) {
    console.log("trying to convert to", coercionType);

    const types = {
      // default: boolean,
      string: JSON.stringify(this),
      number: 2004,
    };

    return types[coercionType] || types.string;
  },
};

console.log("toString", item.toString());
console.log("valueOf", item.valueOf());

console.log("\nimplicit:");

console.log(item + "abc");
console.log(item + 5);

console.log("\nexplicit");

console.log(String(item));
console.log(Number(item));

console.log("\n");

console.log("date", new Date(item)); // chama a conversão default
