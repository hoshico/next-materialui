import { useState } from "react";

export const useFindChanges = (contentInfo: any, ...topics: Array<string | number>) => {
  const [diff, setDiff] = useState(false);
  const diffArray = topics.filter((topic, index) => topic !== Object.values(contentInfo)[index])
  diffArray.length ? setDiff(true) : setDiff(false);
  return {diff, diffArray}
};