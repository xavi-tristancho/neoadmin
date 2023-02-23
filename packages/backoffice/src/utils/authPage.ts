const getModelInitialLetter = (name: string): string =>
  name === "" ? "" : name.split("/")?.[1]?.[0]?.toUpperCase();

export default getModelInitialLetter;
