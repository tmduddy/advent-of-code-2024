import Data.List (sort)

main = do
  contents <- readFile "../days/day2/input.txt"
  let rs = map ((map readInt) . words) $ lines contents
      safeRs = filter isSafe rs
      unsafeRs = filter (not . isSafe) rs
      isSafe xs = isGradual xs && (sort xs == xs || sort xs == reverse xs)
      isGradual x
          | x == [] = True
          | length x == 1 = True
      isGradual (x : y : ys) = x /= y && abs (x - y) <= 3 && isGradual (y : ys)
      permutationsMinusOne _ [] ys = ys
      permutationsMinusOne i xs ys
          | i == (length xs) = ys
          | otherwise = permutationsMinusOne (i + 1) xs (ys ++ [deleteAt i xs])
          where deleteAt idx zs = let (l, (_ : r)) = splitAt idx zs in l ++ r
  print $ "Part 1: " <> show (length safeRs)
  print $ "Part 2: " <> show ((length safeRs) + (length $ filter (any isSafe) $ map (\r -> permutationsMinusOne 0 r []) unsafeRs))

readInt :: String -> Int
readInt x = read x