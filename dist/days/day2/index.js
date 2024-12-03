"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _ = __importStar(require("lodash"));
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const inputFileName = process.env.AOC_DEMO === 'true' ? './demo.txt' : './input.txt';
const input = (0, fs_1.readFileSync)(path_1.default.resolve(__dirname, inputFileName), {
    encoding: 'utf8',
    flag: 'r',
}).split('\n');
const determineSort = (inputArr) => {
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
    console.log(`Part 1: ${solution}`);
};
const part2 = () => {
    const solution = 0;
    console.log(`Part 2: ${solution}`);
};
part1();
part2();
