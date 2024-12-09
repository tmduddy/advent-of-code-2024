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
  const map = input.map(r => r.split(''));
  const visitedCoords = new Set();
  let curCol = 0;
  let curRow = 0;
  let notFound = true;
  map.forEach((row, idx) => {
    if (notFound && row.includes('^')) {
      curCol = row.findIndex(v => v === '^');
      curRow = idx;
      notFound = false;
    }
  });

  let currTile = map[curRow][curCol];
  visitedCoords.add([curRow, curCol].toString());
  while (
    curCol > 0 &&
    curCol < map[0].length - 1 &&
    curRow > 0 &&
    curRow < map.length - 1
  ) {
    switch (currTile) {
      case '^':
        if (map[curRow - 1][curCol] !== '#') {
          curRow -= 1;
          visitedCoords.add([curRow, curCol].toString());
        } else {
          currTile = '>';
        }
        break;
      case '>':
        if (map[curRow][curCol + 1] !== '#') {
          curCol += 1;
          visitedCoords.add([curRow, curCol].toString());
        } else {
          currTile = 'v';
        }
        break;
      case 'v':
        if (map[curRow + 1][curCol] !== '#') {
          curRow += 1;
          visitedCoords.add([curRow, curCol].toString());
        } else {
          currTile = '<';
        }
        break;
      case '<':
        if (map[curRow][curCol - 1] !== '#') {
          curCol -= 1;
          visitedCoords.add([curRow, curCol].toString());
        } else {
          currTile = '^';
        }
        break;
      default:
        break;
    }
    // console.log('---');
    // console.log(curRow, curCol);
    // console.log(currTile);
  }

  // const output: string[][] = [...map];
  // for (let row = 0; row < map.length; row++) {
  //   for (let col = 0; col < map[0].length; col++) {
  //     if (visitedCoords.has([row, col].toString())) {
  //       output[row][col] = 'X';
  //     }
  //   }
  // }
  // console.log(output.map(row => row.join('')).join('\n'));
  const solution = visitedCoords.size;
  console.log(`\nPart 1: ${solution}`);
};

const part2 = () => {
  const solution = 0;
  console.log(`\nPart 2: ${solution}`);
};

part1();
part2();
