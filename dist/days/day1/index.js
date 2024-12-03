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
// console.log(input);
const part1 = () => {
    const list1 = [];
    const list2 = [];
    input.forEach(pair => {
        const [a, b] = pair.split('   ');
        if (a || a === '0') {
            list1.push(parseInt(a.trim()));
        }
        if (b || b === '0') {
            list2.push(parseInt(b.trim()));
        }
    });
    list1.sort((a, b) => a - b);
    list2.sort((a, b) => a - b);
    let diffSum = 0;
    for (let i = 0; i < list2.length; i++) {
        diffSum += Math.abs(list1[i] - list2[i]);
    }
    const solution = diffSum;
    console.log(`Part 1: ${solution}`);
};
const part2 = () => {
    const list1 = [];
    const list2 = [];
    input.forEach(pair => {
        const [a, b] = pair.split('   ');
        if (a || a === '0') {
            list1.push(parseInt(a.trim()));
        }
        if (b || b === '0') {
            list2.push(parseInt(b.trim()));
        }
    });
    const list2Counts = _.countBy(list2);
    let simScore = 0;
    list1.forEach(element => {
        const similarity = list2Counts[element] || 0;
        simScore += element * similarity;
    });
    const solution = simScore;
    console.log(`Part 2: ${solution}`);
};
part1();
part2();
