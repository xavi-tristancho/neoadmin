export const removeIfNotVisible =
  ({ item, pageType } = {}) =>
  (field = {}) => {
    const { [pageType]: { show } = {} } = field;
    const isFunction = typeof show === "function";
    const isUndefined = typeof show === "undefined";
    const value = isFunction ? show(item) : show;

    return isUndefined ? true : value;
  };

export const someRequiredValuesAreEmpty = (props) => {
  const { fields = [], values = {} } = props || {};
  return fields?.length || values?.length
    ? fields.some(({ name, required }) => {
        return required && (!values[name] || values[name] === "");
      })
    : true;
};

export const sameElement = (elementA, elementB) => {
  const strA = JSON.stringify(elementA);
  const strB = JSON.stringify(elementB);
  return strA === strB;
};

export const showRender = (renderSection, state = {}) =>
  typeof renderSection === "function"
    ? renderSection({ state })
    : renderSection;
