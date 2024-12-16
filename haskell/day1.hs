import Data.List (sort)

main = do
  contents <- readFile "../days/day1/input.txt"
  let part1 = sum $ map (\(x, y) -> abs (read x - read y)) $ zip col1 col2
        where
          [col1, col2] = map sort [(map fst ls), (map snd ls)]
          ls = map ((\([x, y]) -> (x, y)) . words) $ lines contents
  print part1

  let part2 = sum $ map (\c1 -> read c1 * (length $ filter (== c1) (map snd ls))) $ map fst ls
        where
          ls = map ((\([x, y]) -> (x, y)) . words) $ lines contents
  print part2
