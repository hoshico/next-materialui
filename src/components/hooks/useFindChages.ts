export const useFindChanges = (contentInfo: any, ...topics: Array<string | number>) => {
  const diffArray = topics.filter((topic, index) => topic !== Object.values(contentInfo)[index])
  const diff = diffArray.length ? true : false;
  return {diff, diffArray}
};