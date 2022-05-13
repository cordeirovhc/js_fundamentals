import TerminalController from "./terminal-controller.js";
import { save } from "./repository.js";
import Person from "./person.js";
import db from "../database.json";

const DEFAULT_LANG = "pt-br";
// const DEFAULT_LANG = "en";
// const DEFAULT_LANG = "es";
// const DEFAULT_LANG = "fr";
const STOP_TERM = ":q";

const terminalCtrl = new TerminalController();
terminalCtrl.initTerminal(db, DEFAULT_LANG);

async function main() {
  try {
    const answer = await terminalCtrl.question("What?"); // user input example: 1 Onibus,Bicicleta 150 2022-05-06 2022-05-13

    if (answer === STOP_TERM) {
      terminalCtrl.closeTerminal();
      console.log("process finished.");
      return;
    }

    const person = Person.generateInstanceFromString(answer);

    terminalCtrl.updateTable(person.formatted(DEFAULT_LANG));

    await save(person);

    return main();
  } catch (error) {
    console.log("error", error);
    return main();
  }
}

await main(); // await funciona sem async thanks to esmodules
