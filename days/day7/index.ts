import * as _ from 'lodash';

import {readFileSync, writeFileSync} from 'fs';
import path from 'path';

const inputFileName =
  process.env.AOC_DEMO === 'true' ? './demo.txt' : './input.txt';
const input = readFileSync(path.resolve(__dirname, inputFileName), {
  encoding: 'utf8',
  flag: 'r',
}).split('\n');
// console.log(input);

function* permute(permutation: string[]) {
  // https://stackoverflow.com/questions/9960908/permutations-in-javascript
  const length = permutation.length;
  const c = Array(length).fill(0);
  let i = 1;
  let k: number;
  let p: string;

  yield permutation.slice();
  while (i < length) {
    if (c[i] < i) {
      k = i % 2 && c[i];
      p = permutation[i];
      permutation[i] = permutation[k];
      permutation[k] = p;
      ++c[i];
      i = 1;
      yield permutation.slice();
    } else {
      c[i] = 0;
      ++i;
    }
  }
}

const preComputePermutations = (n: number) => {
  const permObj: Record<number, string[]> = {};
  const getBaseOpArrs = (n: number): string[][] => {
    // build an array of all plusses
    const baseOpArrs: string[][] = [];
    const opArr: string[] = [];
    for (let i = 0; i < n; i++) {
      opArr.push('+');
    }

    // update it to progressively replace each element with multiplication, excluding all *s
    for (let i = 0; i < n - 1; i++) {
      const newArr = opArr.slice().map((n, idx) => (idx <= i ? '*' : n));
      baseOpArrs.push(newArr);
    }
    return baseOpArrs;
  };

  for (let i = 1; i < n + 1; i++) {
    const foundPermutes = new Set<string>();
    getBaseOpArrs(i).forEach(arr => {
      for (const perm of permute(arr)) {
        if (!foundPermutes.has(perm.join(''))) {
          foundPermutes.add(perm.join(''));
        }
      }
    });
    permObj[i] = [...foundPermutes];
  }

  writeFileSync(
    path.resolve(__dirname, 'permutations.txt'),
    JSON.stringify(permObj),
  );
};

// used this to generate a flat sheet of permutations and skip that heavy step as I debug
// preComputePermutations(11);

const part1 = () => {
  const permInput = readFileSync(path.resolve(__dirname, 'permutations.txt'), {
    encoding: 'utf-8',
    flag: 'r',
  });
  const permMap = JSON.parse(permInput);
  const validGoals = new Set<number>();

  input.forEach((eq, inputIndex) => {
    const [goalRaw, operandsRaw] = eq.split(':');
    const goal = parseInt(goalRaw, 10);
    const operands = operandsRaw
      .trim()
      .split(' ')
      .map(i => parseInt(i, 10));
    const numOperations = operands.length - 1;

    // console.log('\n', goal, numOperations);

    // check all plus and all mult
    const allSum = operands.reduce((sum, n) => sum + n, 0);
    const allMult = operands.reduce((prod, n) => prod * n, 1);
    if (allSum === goal || allMult === goal) {
      validGoals.add(goal);
      console.log(goal);
      // console.log('valid with all + or all *');
    } else if (allSum > goal || allMult < goal) {
      // console.log('pruned');
    } else {
      const allPerms: string[] = permMap[numOperations];
      for (const perm of allPerms) {
        const eq = operands.slice().splice(1);
        if (
          eq.reduce((res, num, idx) => {
            return perm[idx] === '+' ? res + num : res * num;
          }, operands[0]) === goal
        ) {
          console.log(goal);
          // console.log(
          //   `valid with: ${_.zip(operands, perm.split('')).flat().join(' ')}`,
          // );
          validGoals.add(goal);
          break;
        }
      }
    }
  });

  const solution = [...validGoals].reduce((acc, n) => acc + n, 0);
  console.log(validGoals);
  console.log(`\nPart 1: ${solution}`);
  // 2,436,944,234,861 is too low
};

const part1dot2 = () => {
  const isValid = (eq: bigint[], val: bigint, idx = 2): boolean =>
    idx === eq.length
      ? eq[0] === val
      : val <= eq[0] &&
        (isValid(eq, val + eq[idx], idx + 1) ||
          isValid(eq, val * eq[idx], idx + 1)); //||
  // (1 === 2 && isValid(eq, BigInt(`${val}${eq[idx]}`), idx + 1))

  const solution = input
    .map(eq => eq.match(/\d+/g)!.map(BigInt))
    .filter(eq => isValid(eq, eq[1]))
    .map(([testVal]) => testVal)
    .reduce((a, b) => a + b, 0n);

  console.log(`\nPart 1: ${solution}`);
  // 2,437,272,016,585
};

const part2 = () => {
  const isValid = (eq: bigint[], val: bigint, idx = 2): boolean =>
    idx === eq.length
      ? eq[0] === val
      : (val <= eq[0] &&
          (isValid(eq, val + eq[idx], idx + 1) ||
            isValid(eq, val * eq[idx], idx + 1))) ||
        isValid(eq, BigInt(`${val}${eq[idx]}`), idx + 1);

  const solution = input
    .map(eq => eq.match(/\d+/g)!.map(BigInt))
    .filter(eq => isValid(eq, eq[1]))
    .map(([testVal]) => testVal)
    .reduce((a, b) => a + b, 0n);

  console.log(`\nPart 2: ${solution}`);
  // 162987117690649
};

part1dot2();
part2();
