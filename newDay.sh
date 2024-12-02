ROOT_DIR="days"
if [ ! -d "$ROOT_DIR" ]; then
  echo "Root directory does not exist for some reason, try again."
  mkdir $ROOT_DIR
fi

cd $ROOT_DIR

DIR="day$1"
if [ -d "$DIR" ]; then
  echo "Day $1 already exists, try again."
  exit 1
fi

# Create directory and files
mkdir $DIR
cd $DIR

# put the boilerplate code in the index.ts file
touch index.ts
cat >./index.ts <<EOL
import { readFileSync } from 'fs';
const input = readFileSync('input.txt', 'utf8').split('\\n');

const part1 = () => {
  console.log('Part 1');
};

const part2 = () => {
  console.log('Part 2');
};
EOL

# curl the input data and put it in the input.txt file
touch demo.txt
touch input.txt
read -p "Enter session cookie: " SESSION
curl "https://adventofcode.com/2024/day/$1/input" -H "cookie: session=$SESSION" > input.txt