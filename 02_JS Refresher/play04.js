const person = {
  name: "itachi uchhiha",
  age: 19,
  greet() {
    console.log(`Hi, I am ${this.name}`);
  },
};

console.log(person);
person.greet();
