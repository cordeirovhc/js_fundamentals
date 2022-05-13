export default class Person {
  constructor({ id, vehicles, distance, from, to }) {
    this.id = id;
    this.vehicles = vehicles;
    this.distance = distance;
    this.from = from;
    this.to = to;
  }

  formatted(language) {
    const mapDate = (date) => {
      const [year, month, day] = date.split("-").map(Number); // YYYY-MM-DD to [year, month, day]
      return new Date(year, month - 1, day); // em javascript datas começam no 0
    };

    return {
      id: Number(this.id),
      vehicles: new Intl.ListFormat(language, {
        style: "long",
        type: "conjunction",
      }).format(this.vehicles),
      distance: new Intl.NumberFormat(language, {
        style: "unit",
        unit: "kilometer",
      }).format(this.distance),
      from: new Intl.DateTimeFormat(language, {
        month: "long",
        day: "2-digit",
        year: "numeric",
      }).format(mapDate(this.from)),
      to: new Intl.DateTimeFormat(language, {
        month: "long",
        day: "2-digit",
        year: "numeric",
      }).format(mapDate(this.to)),
    };
  }

  static generateInstanceFromString(text) {
    const empty_space = " ";
    const [id, vehicles, distance, from, to] = text.split(empty_space);

    const person = new Person({
      id,
      vehicles: vehicles.split(","),
      distance,
      from,
      to,
    });

    return person;
  }
}
