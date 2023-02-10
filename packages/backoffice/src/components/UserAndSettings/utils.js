const stringToColor = (string = "") => {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.substr(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
};

const stringAvatar = (name = "ADMIN") => {
  const defaultName = "ADMIN";
  const isString = typeof name === "string";
  const styles = {
    width: "30px",
    height: "30px",
    margin: "3px",
    bgcolor: stringToColor(name),
  };

  if (isString && name !== "") {
    const splittedName = name.split(" ");
    const nameHasWhitespace = splittedName[1];

    return {
      sx: styles,
      children: nameHasWhitespace
        ? nameAndSurnameAbbreviation(splittedName)
        : name?.[0],
    };
  }

  return {
    sx: styles,
    children: defaultName[0],
  };
};

const nameAndSurnameAbbreviation = (splittedName) => {
  return `${splittedName[0][0]}${splittedName[1][0]}`;
};

export default stringAvatar;
