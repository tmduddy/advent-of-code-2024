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

const calcChecksum = (fileRaw: string[]) => {
  const file = fileRaw.filter(i => i !== '.').map(i => parseInt(i, 10));
  return file.reduce((acc, f, idx) => {
    return acc + f * idx;
  }, 0);
};

const part1 = () => {
  const fileStrings: number[] = input[0].split('').map(i => parseInt(i, 10));
  let output: string[] = [];

  // build initial file array
  fileStrings.forEach((c, idx) => {
    const valToAdd = idx % 2 === 0 ? (idx / 2).toString() : '.';
    const outputAddition = Array.from({length: c}, v => valToAdd);
    output = output.concat(outputAddition);
  });

  const numFree = _.countBy(output)['.'];
  // console.log(numFree);

  const outputRev = [...output].reverse();

  // console.log(output.join(''));
  let moves = 0;
  let i = 0;
  let j = 0;
  while (
    moves < numFree &&
    i < output.length - numFree &&
    j < outputRev.length
  ) {
    if (output[i] !== '.') {
      i += 1;
      continue;
    }
    if (outputRev[j] === '.') {
      j += 1;
      continue;
    }
    output[i] = outputRev[j];
    output[output.length - 1 - j] = '.';
    i += 1;
    j += 1;
    moves += 1;
    // console.log(output.join(''));
  }

  const solution = calcChecksum(output);
  console.log(`\nPart 1: ${solution}`);
};

const part2 = () => {
  const solution = 0;
  console.log(`\nPart 2: ${solution}`);
};

part1();
part2();
