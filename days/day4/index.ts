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

const findForward = (inArr: string[]): number => {
  let sum = 0;
  inArr.forEach(str => {
    sum += (str.match(/XMAS/g) || []).length;
  });
  // console.log('sum: ', sum);
  return sum;
};

const getDiagonals = (inputArr: string[]) => {
  const input = inputArr.map(r => r.split(''));
  const output = new Array(2 * input.length - 1);
  for (let i = 0; i < output.length; ++i) {
    output[i] = [];
    for (
      let j = Math.min(i, input.length - 1);
      j > Math.max(-1, i - input.length);
      --j
    )
      output[i].push(input[j][i - j]);
  }

  return output.filter(r => r.length >= 4).map(r => r.join(''));
};

const part1 = () => {
  let sum = 0;
  // find forwards
  sum += findForward(input);

  // reverse forward to find backwards
  const revInput = input.map(r => r.split('').reverse().join(''));
  sum += findForward(revInput);

  // transpose to find down
  const downInput = _.zip(...input.map(r => r.split(''))).map(r => r.join(''));
  sum += findForward(downInput);

  // reverse down to find up
  const upInput = downInput.map(r => r.split('').reverse().join(''));
  sum += findForward(upInput);

  // console.log(input, revInput, downInput, upInput);

  const diagInput = getDiagonals(input);
  sum += findForward(diagInput);
  const diagDownInput = diagInput.map(r => r.split('').reverse().join(''));
  sum += findForward(diagDownInput);

  const diagRevInput = getDiagonals(revInput);
  sum += findForward(diagRevInput);
  const diagUpInput = diagRevInput.map(r => r.split('').reverse().join(''));
  sum += findForward(diagUpInput);

  const solution = sum;
  console.log(`\nPart 1: ${solution}`);
};

const checkCorners = (col: number, row: number, grid: string[][]): string => {
  const topLeft = grid[col - 1][row - 1];
  const topRight = grid[col + 1][row - 1];
  const bottomLeft = grid[col - 1][row + 1];
  const bottomRight = grid[col + 1][row + 1];

  return `${topLeft}${topRight}${bottomLeft}${bottomRight}`;
};
const part2 = () => {
  const validCorners = ['MMSS', 'MSMS', 'SMSM', 'SSMM'];
  const grid = input.map(r => r.split(''));
  let sum = 0;
  for (let col = 1; col < grid.length - 1; col++) {
    for (let row = 1; row < grid[0].length - 1; row++) {
      const cell = grid[col][row];
      if (cell === 'A') {
        const corners = checkCorners(col, row, grid);
        if (validCorners.includes(corners)) {
          sum += 1;
        }
      }
    }
  }
  const solution = sum;
  console.log(`\nPart 2: ${solution}`);
};

part1();
part2();
