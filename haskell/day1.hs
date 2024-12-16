import Data.List (sort)

main = do
  contents <- readFile "../days/day1/input.txt"
  let ls = map ((\([x, y]) -> (x, y)) . words) $ lines contents
      [col1, col2] = [(map fst ls), (map snd ls)]
  putStrLn $ "Part 1: " <> show (sum $ map (\(x, y) -> abs (read x - read y)) $ zip (sort col1) (sort col2))
  putStrLn $ "Part 2: " <> show (sum $ map (\c1 -> read c1 * (length $ filter (== c1) col2)) $ col1)
