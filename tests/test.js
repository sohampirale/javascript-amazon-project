import { convertToDollars } from "../scripts/utils/money.js";

console.log('tests suite : convertToDollars');

let tests=[2300,32.45,-2343,2300.1];
let answers=['23.00','0.32','-23.43','23.00'];

for(let i=0;i<tests.length;i++){
  if(convertToDollars(tests[i])===answers[i]){
    console.log('passed '+tests[i]);
  } else {
    console.log('got : '+convertToDollars(tests[i]));
    console.log('failed '+tests[i]);
  }
}