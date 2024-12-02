import {readFileSync} from 'fs';

const inputFileName =
  process.env.AOC_DEMO === 'true' ? 'demo.txt' : 'input.txt';
const input = readFileSync(inputFileName, 'utf8').split('\n');
console.log(input);

const part1 = () => {
  const solution = 0;
  console.log(`Part 1: ${solution}`);
};

const part2 = () => {
  const solution = 0;
  console.log(`Part 2: ${solution}`);
};

part1();
part2();
