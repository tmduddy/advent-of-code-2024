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
  const inMap = input.map(r => r.split(''));
  let curCol = 0;
  let curRow = 0;
  let notFound = true;
  inMap.forEach((row, idx) => {
    if (notFound && row.includes('^')) {
      curCol = row.findIndex(v => v === '^');
      curRow = idx;
      notFound = false;
    }
  });
  const startingCol = curCol;
  const startingRow = curRow;
  const newObstacles: number[][] = [];
  const hitObstaclesWithDirection: string[] = [];
  let currTile = inMap[curRow][curCol];

  [false, true].forEach(shouldCheck => {
    curCol = startingCol;
    curRow = startingRow;
    currTile = '^';
    console.log(shouldCheck);
    while (
      curCol > 0 &&
      curCol < inMap[0].length - 1 &&
      curRow > 0 &&
      curRow < inMap.length - 1
    ) {
      switch (currTile) {
        case '^':
          console.log(currTile);
          if (inMap[curRow - 1][curCol] !== '#') {
            if (shouldCheck) {
              let seenObstacle = false;
              const lookingRight = [...inMap[curRow]].splice(curCol);
              lookingRight.forEach((v, idx) => {
                if (
                  !seenObstacle &&
                  v === '#' &&
                  hitObstaclesWithDirection.includes(
                    `${curRow},${curCol + idx};>`,
                  )
                ) {
                  newObstacles.push([curRow - 1, curCol]);
                  seenObstacle = true;
                }
              });
            }
            curRow -= 1;
          } else {
            hitObstaclesWithDirection.push(
              `${curRow - 1},${curCol};${currTile}`,
            );
            currTile = '>';
          }
          break;
        case '>':
          console.log(currTile);
          if (inMap[curRow][curCol + 1] !== '#') {
            if (shouldCheck) {
              let seenObstacle = false;
              const lookingRight = [...inMap]
                .map(r => r[curCol])
                .splice(curRow);
              lookingRight.forEach((v, idx) => {
                if (
                  !seenObstacle &&
                  v === '#' &&
                  hitObstaclesWithDirection.includes(
                    `${curRow + idx},${curCol};v`,
                  )
                ) {
                  newObstacles.push([curRow, curCol + 1]);
                  seenObstacle = true;
                }
              });
            }
            curCol += 1;
          } else {
            hitObstaclesWithDirection.push(
              `${curRow},${curCol + 1};${currTile}`,
            );
            currTile = 'v';
          }
          break;
        case 'v':
          console.log(currTile);
          if (inMap[curRow + 1][curCol] !== '#') {
            if (shouldCheck) {
              let seenObstacle = false;
              const rev = [...inMap[curRow]].reverse();
              const lookingRight = [...rev].splice(
                inMap[curRow].length - curCol,
              );
              lookingRight.forEach((v, idx) => {
                if (
                  !seenObstacle &&
                  v === '#' &&
                  hitObstaclesWithDirection.includes(
                    `${curRow},${curCol - (idx + 1)};<`,
                  )
                ) {
                  newObstacles.push([curRow + 1, curCol]);
                  seenObstacle = true;
                }
              });
            }
            curRow += 1;
          } else {
            hitObstaclesWithDirection.push(
              `${curRow + 1},${curCol};${currTile}`,
            );
            currTile = '<';
          }
          break;
        case '<':
          console.log(currTile);
          if (inMap[curRow][curCol - 1] !== '#') {
            if (shouldCheck) {
              let seenObstacle = false;
              const rev = [...inMap].reverse();
              const lookingRight = [...rev]
                .map(r => r[curCol])
                .splice(rev.length - curRow);
              lookingRight.forEach((v, idx) => {
                if (
                  !seenObstacle &&
                  v === '#' &&
                  hitObstaclesWithDirection.includes(
                    `${curRow - (idx + 1)},${curCol};^`,
                  )
                ) {
                  newObstacles.push([curRow, curCol - 1]);
                  seenObstacle = true;
                }
              });
            }
            curCol -= 1;
          } else {
            hitObstaclesWithDirection.push(
              `${curRow},${curCol - 1};${currTile}`,
            );
            currTile = '^';
          }
          break;
        default:
          break;
      }
    }
  });

  const filteredObstacles = newObstacles.filter(
    i => i.toString() !== [startingRow, startingCol].toString(),
  );

  console.log(filteredObstacles);
  console.log(newObstacles.length);
  const solution = filteredObstacles.length;
  console.log(`\nPart 2: ${solution}`);
  // 573 is too low
};

const part2dot5 = () => {
  const map = input.map(r => r.split(''));
  const visitedCoords = new Set<string>();

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
  const startingRow = curRow;
  const startingCol = curCol;
  const startingTile = currTile;
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

  // remove the start:
  visitedCoords.delete([startingRow, startingCol].toString());

  const validPlaces = new Set<string>();
  let isLoop = false;
  [...visitedCoords].forEach(coord => {
    const hitObstaclesWithDirection = new Set<string>();

    const [obsRowRaw, obsColRaw] = coord.split(',');
    const obsRow = parseInt(obsRowRaw, 10);
    const obsCol = parseInt(obsColRaw, 10);
    const testMap = [...map];
    testMap[obsRow][obsCol] = '#';
    let obsVal = '';
    curCol = startingCol;
    curRow = startingRow;
    currTile = startingTile;

    isLoop = false;
    while (
      !isLoop &&
      curCol > 0 &&
      curCol < testMap[0].length - 1 &&
      curRow > 0 &&
      curRow < testMap.length - 1
    ) {
      switch (currTile) {
        case '^':
          if (testMap[curRow - 1][curCol] !== '#') {
            curRow -= 1;
          } else {
            obsVal = `${curRow - 1},${curCol};${currTile}`;
            if (hitObstaclesWithDirection.has(obsVal)) {
              isLoop = true;
              validPlaces.add([obsRow, obsCol].toString());
            } else {
              hitObstaclesWithDirection.add(obsVal);
            }
            currTile = '>';
          }
          break;
        case '>':
          if (testMap[curRow][curCol + 1] !== '#') {
            curCol += 1;
          } else {
            obsVal = `${curRow},${curCol + 1};${currTile}`;
            if (hitObstaclesWithDirection.has(obsVal)) {
              isLoop = true;
              validPlaces.add([obsRow, obsCol].toString());
            } else {
              hitObstaclesWithDirection.add(obsVal);
            }
            currTile = 'v';
          }
          break;
        case 'v':
          if (testMap[curRow + 1][curCol] !== '#') {
            curRow += 1;
          } else {
            obsVal = `${curRow + 1},${curCol};${currTile}`;
            if (hitObstaclesWithDirection.has(obsVal)) {
              isLoop = true;
              validPlaces.add([obsRow, obsCol].toString());
            } else {
              hitObstaclesWithDirection.add(obsVal);
            }
            currTile = '<';
          }
          break;
        case '<':
          if (testMap[curRow][curCol - 1] !== '#') {
            curCol -= 1;
          } else {
            obsVal = `${curRow},${curCol - 1};${currTile}`;
            if (hitObstaclesWithDirection.has(obsVal)) {
              isLoop = true;
              validPlaces.add([obsRow, obsCol].toString());
            } else {
              hitObstaclesWithDirection.add(obsVal);
            }
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
    testMap[obsRow][obsCol] = '.';
  });
  const solution = validPlaces.size;
  console.log(`\nPart 2: ${solution}`);
  // 4550 is too high
};

part1();
// part2();
part2dot5();
