import Draftlog from "draftlog";
import chalk from "chalk";
import chalkTable from "chalk-table";
import readline from "readline";
import Person from "./person.js";

export default class TerminalController {
  constructor() {
    this.print = {};
    this.data = {};
  }

  initTerminal(db, lang) {
    Draftlog(console).addLineListener(process.stdin); // listener para receber comandos do terminal

    this.terminal = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    this.initTable(db, lang);
  }

  initTable(db, lang) {
    const data = db.map((i) => new Person(i).formatted(lang));
    const table = chalkTable(this.getTableOptions(), data);

    this.print = console.draft(table); // fn draft injetada pelo draftlog
    this.data = data;
  }

  updateTable(item) {
    this.data.push(item);
    this.print(chalkTable(this.getTableOptions(), this.data));
  }

  question(msg = "") {
    return new Promise((resolve) => this.terminal.question(msg, resolve));
  }

  closeTerminal() {
    this.terminal.close();
  }

  getTableOptions() {
    return {
      leftPad: 2,
      columns: [
        { field: "id", name: chalk.cyan("ID") },
        { field: "vehicles", name: chalk.cyan("VEHICLES") },
        { field: "distance", name: chalk.cyan("DISTANCE") },
        { field: "from", name: chalk.cyan("FROM") },
        { field: "to", name: chalk.cyan("TO") },
      ],
    };
  }
}
