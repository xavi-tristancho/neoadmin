import { Field } from "@neoco/neoco-form/src/types";
import { unknownObject, Credentials } from "@neoco/neoco-backoffice/src/types";

type SomeRequiredValuesAreEmptyFn = (props: {
  fields: Field[];
  values: Credentials;
}) => boolean;

export const removeIfNotVisible =
  ({ item, pageType }: { item: unknownObject; pageType: string }) =>
  (
    field: {
      [key: string]: {
        show: ((item: unknownObject) => boolean | number) | string | boolean;
      };
    } = {}
  ) => {
    const {
      [pageType]: { show },
    } = field;
    const isUndefined: boolean = typeof show === "undefined";
    const value: boolean | number | ((item: unknownObject) => boolean) =
      typeof show === "function"
        ? show(item)
        : typeof show === "string"
        ? false
        : show;

    return isUndefined ? true : value;
  };

export const someRequiredValuesAreEmpty: SomeRequiredValuesAreEmptyFn =
  (props: { fields: Field[]; values: Credentials }) => {
    const { fields = [], values = {} } = props || {};
    return fields?.length || Object.keys(values).length === 0
      ? fields.some(({ name, required }) => {
          return required && (!values[name] || values[name] === "");
        })
      : true;
  };

export const sameElement = (elementA: unknown, elementB: unknown): boolean => {
  const strA = JSON.stringify(elementA);
  const strB = JSON.stringify(elementB);
  return strA === strB;
};

export const showRender = (
  renderSection:
    | object
    | string
    | ((args?: { state: { [key: string]: string } }) => JSX.Element | string),
  state: { [key: string]: string }
): JSX.Element | string | object | unknown => {
  return typeof renderSection === "function"
    ? renderSection({ state })
    : renderSection;
};
