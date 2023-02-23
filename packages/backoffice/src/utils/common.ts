import { Field } from "@neoco/neoco-form/src/types";
import { unknownObject, Credentials } from "@neoco/neoco-backoffice/src/types";

type State = {
  data: unknownObject;
  aux: unknownObject;
};

export const removeIfNotVisible =
  ({ item, pageType }: { item: unknownObject; pageType: string }) =>
  (field: { [key: string]: { show: (item: unknownObject) => boolean } }) => {
    const {
      [pageType]: { show },
    } = field;
    const isFunction: boolean = typeof show === "function";
    const isUndefined: boolean = typeof show === "undefined";
    const value: boolean | ((item: unknownObject) => boolean) = isFunction
      ? show(item)
      : show;

    return isUndefined ? true : value;
  };

export const someRequiredValuesAreEmpty = (props: {
  fields: Field[];
  values: Credentials;
}) => {
  const { fields = [], values = {} } = props || {};
  return fields?.length || Object.keys(values).length === 0
    ? fields.some(({ name, required }) => {
        return required && (!values[name] || values[name] === "");
      })
    : true;
};

export const sameElement = (elementA: string, elementB: string) => {
  const strA = JSON.stringify(elementA);
  const strB = JSON.stringify(elementB);
  return strA === strB;
};

export const showRender = (
  renderSection: (args: { state: State }) => JSX.Element | unknown,
  state: State
): JSX.Element | unknown => {
  return typeof renderSection === "function"
    ? renderSection({ state })
    : renderSection;
};
