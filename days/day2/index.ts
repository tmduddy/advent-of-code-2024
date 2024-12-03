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

type sortMethod = 'asc' | 'desc' | 'invalid';
const determineSort = (inputArr: number[]): sortMethod => {
  if (inputArr.length === _.uniq(inputArr).length) {
    const ascArr = [...inputArr].sort((a, b) => a - b);
    const descArr = [...ascArr].reverse();
    if (_.isEqual(inputArr, ascArr)) {
      return 'asc';
    }
    if (_.isEqual(inputArr, descArr)) {
      return 'desc';
    }
  }
  return 'invalid';
};
const part1 = () => {
  let numSafe = 0;
  const reports = input.filter(val => !!val);
  reports.forEach(levelString => {
    const level = levelString.split(' ').map(num => parseInt(num, 10));
    let safe = false;
    const sortMethod = determineSort(level);
    if (sortMethod !== 'invalid') {
      for (let i = 0; i < level.length - 1; i++) {
        let diff = 0;
        const level1 = level[i];
        const level2 = level[i + 1];
        diff = sortMethod === 'asc' ? level2 - level1 : level1 - level2;
        if (diff < 1 || diff > 3) {
          safe = false;
          break;
        }
        safe = true;
      }
    }
    // console.log(sortMethod);
    // console.log('safe: ', safe);
    // console.log(level);
    // console.log();
    numSafe += safe ? 1 : 0;
  });
  const solution = numSafe;
  console.log(`\nPart 1: ${solution}`);
};

const part2 = () => {
  const solution = 0;
  console.log(`\nPart 2: ${solution}`);
};

part1();
part2();
