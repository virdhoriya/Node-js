const name = "itachi uchiha";
let age = 19;
const hasHobbies = true;

age = 20;

const summarizeUser = (userName, userAge, userHadHobbies) => {
  return `name is ${name}, age is ${age}, and the user has hobbies : ${userHadHobbies}`;
};

console.log(summarizeUser(name, age, hasHobbies));
