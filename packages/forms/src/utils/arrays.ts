export const getIndexInArray = <T>(
  collection: T[],
  childToCompare: T
): number =>
  collection.findIndex(
    (element) => JSON.stringify(element) === JSON.stringify(childToCompare)
  );
