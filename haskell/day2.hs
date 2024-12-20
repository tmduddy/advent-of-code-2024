import Data.List (partition)

main = do
  contents <- readFile "../days/day2/input.txt"
  let rs = map ((map read) . words) $ lines contents
      (safeRs, unsafeRs) = partition isSafe rs
      isSafe xs = isGradual xs && (or $ zipWith ($) [isAsc, isDesc] (repeat xs))
        where 
          isAsc xs = and $ (zipWith (<) <*> (drop 1)) xs
          isDesc xs = and $ (zipWith (>) <*> (drop 1)) xs
          isGradual [] = True
          isGradual (_ : []) = True
          isGradual (x : y : ys) = x /= y && abs (x - y) <= 3 && isGradual (y : ys)
      listMinusOne xs = zipWith deleteAt (take (length xs) [0..]) (repeat xs)
          where deleteAt idx zs = let (l, (_ : r)) = splitAt idx zs in l ++ r
  print $ "Part 1: " <> show (length safeRs)
  print $ "Part 2: " <> show ((length safeRs) + (length $ filter (any isSafe) $ map listMinusOne unsafeRs))