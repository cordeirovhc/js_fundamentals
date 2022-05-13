import { describe, it } from "mocha";
import { expect } from "chai";
import Person from "../src/person.js";

describe("Person", () => {
  it("should return a person instance from valid string", () => {
    const valid_input = "1 Onibus,Bicicleta 150 2022-05-06 2022-05-13";

    const person = Person.generateInstanceFromString(valid_input);

    const expected = {
      id: "1",
      vehicles: ["Onibus", "Bicicleta"],
      distance: "150",
      from: "2022-05-06",
      to: "2022-05-13",
    };

    expect(person).to.be.deep.equal(expected);
  });

  it("should format values", () => {
    const person = new Person({
      id: "1",
      vehicles: ["Onibus", "Bicicleta"],
      distance: "150",
      from: "2022-05-06",
      to: "2022-05-13",
    });

    const result = person.formatted("pt-BR");

    const expected = {
      id: 1,
      vehicles: "Onibus e Bicicleta",
      distance: "150 km",
      from: "06 de maio de 2022",
      to: "13 de maio de 2022",
    };

    expect(result).to.be.deep.equal(expected);
  });
});
