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
  const rules: string[] = [];
  const updates: string[] = [];

  let isRule = true;
  input.forEach(inp => {
    if (inp === '') {
      isRule = false;
    } else if (isRule) {
      rules.push(inp);
    } else {
      updates.push(inp);
    }
  });

  const rulesObj: Record<number, Set<number>> = {};
  rules.forEach(rule => {
    const [left, right] = rule.split('|').map(i => parseInt(i, 10));
    if (!rulesObj[left]) {
      rulesObj[left] = new Set([right]);
    } else {
      rulesObj[left].add(right);
    }
  });

  let valid = 0;
  updates.forEach(updateRaw => {
    const update = updateRaw.split(',').map(p => parseInt(p, 10));
    let isValid = true;
    update.forEach((page, idx) => {
      if (
        idx > 0 &&
        isValid &&
        Object.keys(rulesObj).includes(page.toString())
      ) {
        const ruleSet = rulesObj[page];
        const priorNumbers = [...update].splice(0, idx);
        isValid = priorNumbers.filter(num => ruleSet.has(num)).length === 0;
      }
    });
    valid += isValid ? update[Math.floor(update.length / 2)] : 0;
  });

  const solution = valid;
  console.log(`\nPart 1: ${solution}`);
};

const part2 = () => {
  const rules: string[] = [];
  const updates: string[] = [];

  let isRule = true;
  input.forEach(inp => {
    if (inp === '') {
      isRule = false;
    } else if (isRule) {
      rules.push(inp);
    } else {
      updates.push(inp);
    }
  });

  const rulesObj: Record<number, Set<number>> = {};
  rules.forEach(rule => {
    const [left, right] = rule.split('|').map(i => parseInt(i, 10));
    if (!rulesObj[left]) {
      rulesObj[left] = new Set([right]);
    } else {
      rulesObj[left].add(right);
    }
  });

  const checkIsValid = (idx: number, update: number[]): boolean => {
    const ruleSet = rulesObj[update[idx]];
    if (!ruleSet) {
      return true;
    }
    const priorNumbers = [...update].splice(0, idx);
    return priorNumbers.filter(num => ruleSet.has(num)).length === 0;
  };

  const badUpdates: number[][] = [];
  updates.forEach(updateRaw => {
    const update = updateRaw.split(',').map(p => parseInt(p, 10));
    let isValid = true;
    update.forEach((page, idx) => {
      if (
        idx > 0 &&
        isValid &&
        Object.keys(rulesObj).includes(page.toString())
      ) {
        isValid = checkIsValid(idx, update);
      }
    });
    if (!isValid) {
      badUpdates.push(update);
    }
  });

  let sum = 0;
  console.log(badUpdates);
  badUpdates.forEach(update => {
    let isValid = false;
    while (!isValid) {
      for (let idx = 1; idx < update.length; idx++) {
        isValid = checkIsValid(idx, update);
        if (isValid) {
          continue;
        }
        [update[idx - 1], update[idx]] = [update[idx], update[idx - 1]];
        break;
      }
    }
    sum += update[Math.floor(update.length / 2)];
  });

  const solution = sum;
  console.log(`\nPart 2: ${solution}`);
};

part1();
part2();
