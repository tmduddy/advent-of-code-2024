"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const inputFileName = process.env.AOC_DEMO === 'true' ? './demo.txt' : './input.txt';
const input = (0, fs_1.readFileSync)(path_1.default.resolve(__dirname, inputFileName), {
    encoding: 'utf8',
    flag: 'r',
}).split('\n');
console.log(input);
const part1 = () => {
    const solution = 0;
    console.log(`Part 1: ${solution}`);
};
const part2 = () => {
    const solution = 0;
    console.log(`Part 2: ${solution}`);
};
part1();
part2();
