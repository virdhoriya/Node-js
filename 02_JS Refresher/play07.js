const person = {
  name: "itachi uchhiha",
  age: 19,
  greet() {
    console.log(`Hi, I am ${this.name}`);
  },
};

// const printName = ({ name }) => {
//   console.log(name);
// };

// printName(person);

// const { name, age } = person;
// console.log(name, age);

const characters = ["naruto", "itachi", "saske", "hashirama", "madara"];

// const [value1, value2, value3] = characters;
// console.log(value1, value2, value3);

console.log(characters.join(","));
