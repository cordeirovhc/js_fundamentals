const obj = {}; // obj literal
const arr = [];
const fn = () => {};

// internamente, objetos literais viram funçoes explicitas
console.log(new Object() === {}); // false
console.log(new Object().__proto__ === {}.__proto__); // true

// __proto__ é a referência do objeto que possui as propriedades dele

console.log(new Object());
console.log(new Object().__proto__);

console.log({});
console.log({}.__proto__);

console.log(obj.__proto__ === Object.prototype); // __proto__ é a instancia de Object e prototype é onde estão todas os métodos e atributos
console.log(arr.__proto__ === Array.prototype); // __proto__ é ... Array ...
console.log(fn.__proto__ === Function.prototype); // __proto__ é ... Function ...

// __proto__ de Object.prototype é null
console.log(obj.__proto__.__proto__); // null

// --------------------------------------

function Employee() {}

Employee.prototype.salary = () => "salary**";

function Supervisor() {}

Supervisor.prototype = Object.create(Employee.prototype); // herda a instância de employee
Supervisor.prototype.profitShare = () => "profitShare**";

function Manager() {}

Manager.prototype = Object.create(Supervisor.prototype);
Manager.prototype.bonus = () => "cash**";

console.log(Employee); // [Function: Employee]
// console.log(Employee.salary()); // type error -> Employee.salary is not a function
console.log(Employee.prototype.salary());

console.log(Supervisor); // [Function: Supervisor]
console.log(Supervisor.prototype.salary());
console.log(Supervisor.prototype.profitShare());

console.log(Manager); // [Function: Manager]
console.log(Manager.prototype.salary());
console.log(Manager.prototype.profitShare());
console.log(Manager.prototype.bonus());

// --------------------------------------

const manager = new Manager();

console.log(Manager.prototype.__proto__ === Supervisor.prototype);
console.log(Manager.prototype.__proto__.__proto__ === Employee.prototype);

console.log(Manager.__proto__); // {} === Object.prototype
console.log(Manager.prototype);
console.log(manager.__proto__);

console.log(Manager.prototype === manager.__proto__);

console.log(Manager.prototype.salary());
console.log(manager.salary());

console.log(manager.__proto__); // Employee { bonus: [Function (anonymous)] }
console.log(manager.__proto__.__proto__); // Employee { profitShare: [Function (anonymous)] }
console.log(manager.__proto__.__proto__.__proto__); // { salary: [Function (anonymous)] }
console.log(manager.__proto__.__proto__.__proto__.__proto__); // [Object: null prototype] {} === Object.prototype
console.log(manager.__proto__.__proto__.__proto__.__proto__.__proto__); // null
