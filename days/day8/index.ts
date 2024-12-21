import {readFileSync} from 'fs';
import path from 'path';

const inputFileName =
  process.env.AOC_DEMO === 'true' ? './demo.txt' : './input.txt';
const input = readFileSync(path.resolve(__dirname, inputFileName), {
  encoding: 'utf8',
  flag: 'r',
}).split('\n');
console.log(input);

const printGrid = (grid: string[][], aNodeLocs: Set<string> = new Set()) => {
  grid.forEach((row, rowIdx) => {
    if (rowIdx === 0) {
      const colLabels = [' '].concat(row.map((v, i) => (i % 10).toString()));
      console.log(colLabels.join(' '));
    }
    const labeledRow = [(rowIdx % 10).toString()].concat(
      row.map((col, colIdx) =>
        aNodeLocs.has([rowIdx, colIdx].toString()) ? '#' : col,
      ),
    );
    console.log(labeledRow.join(' '));
  });
};

type location = [number, number];

const getAntiNodeForPair = (
  node1: location,
  node2: location,
  gridWidth: number,
  gridHeight: number,
): location[] => {
  const antiNodes: location[] = [];
  const vertDiff = node2[0] - node1[0];
  const vertPos1 = node1[0] - vertDiff;
  const vertPos2 = node2[0] + vertDiff;

  const horzDiff = node2[1] - node1[1];
  const horzPos1 = node1[1] - horzDiff;
  const horzPos2 = node2[1] + horzDiff;

  if (
    vertPos1 >= 0 &&
    vertPos1 < gridHeight &&
    horzPos1 >= 0 &&
    horzPos1 < gridWidth
  ) {
    antiNodes.push([vertPos1, horzPos1]);
  }

  if (
    vertPos2 >= 0 &&
    vertPos2 < gridHeight &&
    horzPos2 >= 0 &&
    horzPos2 < gridWidth
  ) {
    antiNodes.push([vertPos2, horzPos2]);
  }

  return antiNodes;
};

const part1 = () => {
  const uniqNode = new Set<string>();
  const grid = [...input].map(r => r.split(''));
  const gridHeight = grid.length;
  const gridWidth = grid[0].length;
  const freqMap: Record<string, location[]> = {};
  printGrid(grid);

  // build a map of frequencies to their locations
  grid.forEach((row, rowIdx) => {
    row.forEach((col, colIdx) => {
      if (col !== '.') {
        const location: location = [rowIdx, colIdx];
        if (freqMap[col]) {
          freqMap[col].push(location);
        } else {
          freqMap[col] = [location];
        }
      }
    });
  });

  Object.values(freqMap).forEach(locList => {
    for (let i = 0; i < locList.length; i++) {
      const locsToCheck = [...locList].splice(i);
      for (let j = 1; j < locsToCheck.length; j++) {
        const antiNodes = getAntiNodeForPair(
          locsToCheck[0],
          locsToCheck[j],
          gridWidth,
          gridHeight,
        );
        antiNodes.forEach(n => {
          uniqNode.add(n.toString());
        });
      }
    }
  });

  // printGrid(grid, uniqNode);
  const solution = uniqNode.size;
  console.log(`\nPart 1: ${solution}`);
};

const getAntiNodeForPair2 = (
  node1: location,
  node2: location,
  gridWidth: number,
  gridHeight: number,
): location[] => {
  const antiNodes: location[] = [];

  const vertDiff = node2[0] - node1[0];
  let vertPos1 = node1[0] - vertDiff;
  let vertPos2 = node2[0] + vertDiff;

  const horzDiff = node2[1] - node1[1];
  let horzPos1 = node1[1] - horzDiff;
  let horzPos2 = node2[1] + horzDiff;

  while (
    vertPos1 >= 0 &&
    vertPos1 < gridHeight &&
    horzPos1 >= 0 &&
    horzPos1 < gridWidth
  ) {
    antiNodes.push([vertPos1, horzPos1]);
    vertPos1 -= vertDiff;
    horzPos1 -= horzDiff;
  }

  while (
    vertPos2 >= 0 &&
    vertPos2 < gridHeight &&
    horzPos2 >= 0 &&
    horzPos2 < gridWidth
  ) {
    antiNodes.push([vertPos2, horzPos2]);
    vertPos2 += vertDiff;
    horzPos2 += horzDiff;
  }

  return antiNodes;
};

const part2 = () => {
  const uniqNode = new Set<string>();
  const grid = [...input].map(r => r.split(''));
  const gridHeight = grid.length;
  const gridWidth = grid[0].length;
  const freqMap: Record<string, location[]> = {};
  printGrid(grid);

  // build a map of frequencies to their locations
  grid.forEach((row, rowIdx) => {
    row.forEach((col, colIdx) => {
      if (col !== '.') {
        const location: location = [rowIdx, colIdx];
        if (freqMap[col]) {
          freqMap[col].push(location);
        } else {
          freqMap[col] = [location];
        }
      }
    });
  });

  Object.values(freqMap).forEach(locList => {
    // if (locList.length >= 2) {
    //   locList.forEach(l => {
    //     uniqNode.add(l.toString());
    //   });
    // }
    for (let i = 0; i < locList.length; i++) {
      const locsToCheck = [...locList].splice(i);
      for (let j = 1; j < locsToCheck.length; j++) {
        const antiNodes = getAntiNodeForPair2(
          locsToCheck[0],
          locsToCheck[j],
          gridWidth,
          gridHeight,
        );
        antiNodes.forEach(n => {
          uniqNode.add(n.toString());
        });
      }
    }
  });

  printGrid(grid, uniqNode);

  const solution = uniqNode.size;
  console.log(`\nPart 2: ${solution}`);
};

part1();
part2();
