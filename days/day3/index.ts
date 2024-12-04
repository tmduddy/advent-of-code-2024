import {readFileSync} from 'fs';
import path from 'path';

const inputFileName =
  process.env.AOC_DEMO === 'true' ? './demo.txt' : './input.txt';
const input = readFileSync(path.resolve(__dirname, inputFileName), {
  encoding: 'utf8',
  flag: 'r',
}).split('\n');
// console.log(input);

const part1 = () => {
  const mulMatch = /mul\((\d+),(\d+)\)/g;
  const codeInput = input.join();
  const matches = [...codeInput.matchAll(mulMatch)];
  let sum = 0;
  matches.forEach(match => {
    const [_, left, right] = match;
    const leftInt = parseInt(left, 10);
    const rightInt = parseInt(right, 10);
    // console.log(_, left, right);
    const product = leftInt * rightInt;
    sum += product;
  });

  const solution = sum;
  console.log(`\nPart 1: ${solution}`);
  // 28546082 was too low!
};

const part2 = () => {
  const mulMatch = /mul\((\d+),(\d+)\)/g;
  const cleanMatch = /mul\(\d+,\d+\)|do\(\)|don't\(\)/g;
  const codeInput = input.join();

  const cleanInputMatches = codeInput.matchAll(cleanMatch);
  const cleanInputs = [...cleanInputMatches].map(match => {
    return match[0];
  });

  let sum = 0;
  let active = true;

  for (let i = 0; i < cleanInputs.length; i++) {
    const operator = cleanInputs[i];
    switch (operator) {
      case 'do()': {
        active = true;
        break;
      }
      case "don't()": {
        active = false;
        break;
      }
      default: {
        if (active) {
          const mulMatches = [...operator.matchAll(mulMatch)][0];
          const [_, leftRaw, rightRaw] = mulMatches;
          const left = parseInt(leftRaw, 10);
          const right = parseInt(rightRaw, 10);

          console.log(_, left, right);

          sum += left * right;
        }
      }
    }
  }

  const solution = sum;
  console.log(`\nPart 2: ${solution}`);
};

part1();
part2();
