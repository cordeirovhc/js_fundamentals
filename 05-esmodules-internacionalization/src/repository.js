import { writeFile, readFile } from "fs/promises";

export const save = async (data) => {
  // esmodules não tem __filename e __dirname

  const { pathname } = new URL("./../database.json", import.meta.url); // __filename

  const currentData = JSON.parse(await readFile(pathname));

  currentData.push(data);

  await writeFile(pathname, JSON.stringify(currentData));
};
