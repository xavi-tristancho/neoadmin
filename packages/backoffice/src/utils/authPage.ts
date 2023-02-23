const getModelInitialLetter = (name = "") =>
  name === "" ? "" : name.split("/")?.[1]?.[0]?.toUpperCase();

export default getModelInitialLetter;
