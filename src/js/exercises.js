/*
let arr = [34, 67, 2, 75, 86].filter((el) => el % 2 == 1);
console.log(arr);
let min = Infinity;
let max = 0;
function findMin() {
  arr.forEach((el) => {
    if (el < min) {
      min = el;
    }
  });
  return min;
}
function findMax() {
  arr.forEach((el) => {
    if (el > max) {
      max = el;
    }
  });
  return max;
}
console.log(findMin(arr));
console.log(findMax(arr));
function add(...rest) {
  return rest.reduce((total, current) => total + current);
}
console.log(add(1, 2, 3, 4, 5));
let e = { f: 2, s: 3 };
let { f, s } = e;
let arr = [];
console.log(f, s);
let num = 1122255666666;
num = String(num);
let object = {};
function happyNumber(num) {
  num.split("").forEach((el) => {
    object[el] == undefined ? (object[el] = 1) : (object[el] += 1);
  });
  console.log(object);
  for (let [key] of Object.keys(object)) {
    if (object[key] == key) {
      arr.push(key);
      return Math.max(arr);
    }
  }

  return 0;
}
console.log(happyNumber(num));
*/
