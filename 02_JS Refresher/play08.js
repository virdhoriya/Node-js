// const fetchData = () => {
//   const promise = new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve("Done!");
//     }, 1500);
//   });
//   return promise;
// };

// setTimeout(() => {
//   console.error("Timer is done!");
//   fetchData()
//     .then((text) => {
//       console.log(text);
//       return fetchData();
//     })
//     .then((text) => console.log(text));
// }, 2000);

// console.log("Hello");
// console.log("Hi");

const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    const num = Math.floor(Math.random() * 10 + 1);
    if (num <= 5) {
      resolve("success");
    } else {
      reject("Failed");
    }
  }, 2000);
});

const ans = promise
  .then((text) => console.log(text))
  .catch((err) => console.log(err));
