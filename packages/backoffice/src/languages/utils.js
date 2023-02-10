import i18n from "./i18n";

export const getPageHeaderFieldLiteral =
  (modelName, t, prop = "name") =>
  (field) => ({
    ...field,
    [prop]: t(`pages.${modelName}.model.${field.property}`.toLowerCase()),
  });

export const getPageTitleLiteral = ({ t, page }) => {
  const entity = getEntityForPage(page);
  return t(getPageLiteral({ page, key: "title" }), `${entity}s`);
};

export const getPageNewLiteral = ({ t, page }) => {
  const entity = getEntityForPage(page);
  return t(getPageLiteral({ page, key: "new" }), `Nuevo ${entity}`);
};

export const getPageOneLiteral = ({ t, page }) => {
  const entity = getEntityForPage(page);
  return t(getPageLiteral({ page, key: "one" }), entity);
};

export const getPageActionLiteral = (isEditing = false) => {
  return `actions.${isEditing ? "edit" : "create"}`;
};

export const getPageLiteral = ({ page, key = null }) => {
  return key ? `${pagePrefix(page)}.${key}` : `${page}`;
};

export const getPageLiteralsObject = ({ page }) => {
  const resource = i18n.getResourceBundle(i18n.language);
  return resource[page];
};

export const getEntityForPage = (page) => {
  const resource = i18n.getResourceBundle(i18n.language);
  const entity = resource?.pages[page.toLowerCase()];
  if (typeof entity === "string") {
    return entity;
  } else {
    return page;
  }
};

const pagePrefix = (page) => `pages.${page}`.toLowerCase();
