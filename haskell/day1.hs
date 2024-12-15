import Data.List (sort)

main = do
  contents <- readFile "../days/day1/input.txt"
  let strList = getStrList contents
  let part1 = sum [abs (read x - read y) | (x, y) <- zip (head sorted) (last sorted)] where sorted = map sort strList
  print ("part 1: " ++ show part1)
  let part2 = sum [read x * getCountIn x ys | x <- xs]
        where
          getCountIn x xs = sum [1 | y <- xs, x == y]
          [xs, ys] = strList
  print ("part 2: " ++ show part2)

getStrList :: String -> [[String]]
getStrList xs = toList $ unzip $ map (toTuple . words) (lines xs)
  where
    toTuple [x, y] = (x, y)
    toList (x, y) = [x, y]
