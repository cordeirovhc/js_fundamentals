"use strict";

const {
  watch,
  promises: { readFile },
} = require("fs");

class File {
  watch(event, filename) {
    console.log("this", this);
    console.log("raw arguments", arguments);
    console.log("arguments", Array.prototype.slice.call(arguments)); // transforma objeto do tipo {0:"a",1:"b"} em array ["a","b"]
    this.showContent(filename);
  }

  async showContent(filename) {
    console.log((await readFile(filename)).toString());
  }
}

/* 

watch(__filename, async (event, filename) => {
  // console.log(`[${filename}]`, event);
  console.log((await readFile(filename)).toString());
}); 

*/

const file = new File();

// watch(__filename, file.watch);
// ignora o contexto this da classe File e herda o contexto this da fn watch -> TypeError: this.showContent is not a function

// watch(__filename, (event, filename) => file.watch(event, filename));
// ok

// watch(__filename, file.watch.bind(file));
// bind explicita o contexto this

// executa a fn file.watch
/* file.watch.call(
  // primeiro parâmetro: contexto this
  {
    // substitui comportamento de showContent
    // showContent: () => console.log("call showContent"),
    showContent: file.showContent,
  },
  // todos os outros argumentos que a fn watch precisa
  null, // event; nulo em um primeiro momento
  __filename // filename
);
 */

// funciona da mesma forma, a diferença é que os params da fn watch são passados dentro de um array
file.watch.apply(
  // primeiro parâmetro: contexto this
  {
    // substitui comportamento de showContent
    // showContent: () => console.log("call showContent"),
    showContent: file.showContent,
  },
  // todos os outros argumentos que a fn watch precisa
  [
    null, // event; nulo em um primeiro momento
    __filename, // filename
  ]
);
