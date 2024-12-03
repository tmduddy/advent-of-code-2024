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
  const solution = 0;
  console.log(`\nPart 2: ${solution}`);
};

part1();
part2();
