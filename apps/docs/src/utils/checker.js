import React from "react";

export const isComponentOrHtml = (element) => React.isValidElement(element);

export const isString = (element) => typeof element === "string";

export const isNumber = (element) => typeof element === "number";

export const isObject = (element) =>
  typeof element === "object" && !Array.isArray(element) && element !== null;

export const isStringOrNumber = (element) =>
  isString(element) || isNumber(element);
