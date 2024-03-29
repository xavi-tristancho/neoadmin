import { Field, ShowFn } from "@app-artisans/form/src/types";
import { unknownObject } from "@app-artisans/backoffice/src/types";

type SomeRequiredValuesAreEmptyFn = (props: {
  fields: Field[];
  values: unknownObject;
}) => boolean;

type RemoveIfNotVisibleFn = (props: {
  data: unknownObject[];
  pageType: string;
}) => (field: {
  [key: string]: {
    show: ShowFn;
  };
}) => boolean;

type ShowRenderFn = (
  renderSection:
    | object
    | string
    | ((args?: { state: { [key: string]: string } }) => JSX.Element | string),
  state: { [key: string]: string }
) => JSX.Element | string | object | unknown;

export const removeIfNotVisible: RemoveIfNotVisibleFn =
  ({ data, pageType }) =>
  (field = {}) => {
    const { [pageType]: { show = true } = {} } = field;
    const isUndefined: boolean = typeof show === "undefined";
    const value: boolean =
      typeof show === "function"
        ? show(data)
        : typeof show === "string"
        ? false
        : show;

    return isUndefined ? true : value;
  };

export const someRequiredValuesAreEmpty: SomeRequiredValuesAreEmptyFn = (
  props
) => {
  const { fields = [], values = {} } = props || {};
  return fields?.length
    ? fields.some(({ name, required }) => {
        return (
          required &&
          !(
            values[name] !== undefined &&
            values[name] !== null &&
            values[name] !== ""
          )
        );
      })
    : true;
};

export const sameElement = (elementA: unknown, elementB: unknown): boolean => {
  const strA = JSON.stringify(elementA);
  const strB = JSON.stringify(elementB);
  return strA === strB;
};

export const showRender: ShowRenderFn = (renderSection, state) => {
  return typeof renderSection === "function"
    ? renderSection({ state })
    : renderSection;
};
