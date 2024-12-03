import * as _ from 'lodash';

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
  const list1: number[] = [];
  const list2: number[] = [];

  input.forEach(pair => {
    const [a, b] = pair.split('   ');
    if (a || a === '0') {
      list1.push(parseInt(a.trim()));
    }
    if (b || b === '0') {
      list2.push(parseInt(b.trim()));
    }
  });
  list1.sort((a, b) => a - b);
  list2.sort((a, b) => a - b);

  let diffSum = 0;
  for (let i = 0; i < list2.length; i++) {
    diffSum += Math.abs(list1[i] - list2[i]);
  }
  const solution = diffSum;
  console.log(`Part 1: ${solution}`);
};

const part2 = () => {
  const list1: number[] = [];
  const list2: number[] = [];

  input.forEach(pair => {
    const [a, b] = pair.split('   ');
    if (a || a === '0') {
      list1.push(parseInt(a.trim()));
    }
    if (b || b === '0') {
      list2.push(parseInt(b.trim()));
    }
  });
  const list2Counts = _.countBy(list2);

  let simScore = 0;
  list1.forEach(element => {
    const similarity = list2Counts[element] || 0;
    simScore += element * similarity;
  });

  const solution = simScore;
  console.log(`Part 2: ${solution}`);
};

part1();
part2();
