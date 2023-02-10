export const getIndexInArray = (collection, childToCompare) =>
  collection.findIndex(
    (element) => JSON.stringify(element) === JSON.stringify(childToCompare)
  );
