// Spread Operator

const characters = ["naruto", "itachi", "saske", "hashirama", "madara"];

// const newChapter = characters.slice();
// const newChapter = [...characters];
// const newChapter = [...characters, "Ashura", "Indra"];
// console.log(newChapter);

const anime = {
  name: "DBZ",
  creator: "akira toriyama",
};

// const copiedAnime = { ...anime };
// console.log(copiedAnime);

// Rest Operator

const toArray = (...args) => {
  return args;
};

console.log(toArray(10, 20, 30, 40));
