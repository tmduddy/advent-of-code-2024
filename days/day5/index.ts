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
        const ruleSet = rulesObj[page];
        const priorNumbers = [...update].splice(0, idx);
        isValid = priorNumbers.filter(num => ruleSet.has(num)).length === 0;
      }
    });
    if (!isValid) {
      badUpdates.push(update);
    }
  });

  badUpdates.forEach(update => {
    console.log(update)
  })
  const solution = 0;
  console.log(`\nPart 2: ${solution}`);
};

part1();
part2();
