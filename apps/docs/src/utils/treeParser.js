import {
  iconsDictionary,
  treeConnectionDictionary,
  linkDictionay,
} from "./dictionaries";

const getIndentationType = (depth) => (isConnected) => {
  return treeConnectionDictionary[
    isConnected ? "connectedIndentation" : "indentation"
  ];
};

const greaterThandepth = (depth) => (unused, index) => !(index >= depth);

const getIndentation = ({ connectedLevels = [], depth = 0 }) =>
  connectedLevels
    .filter(greaterThandepth(depth))
    .map(getIndentationType(depth))
    .join("");

const line = ({
  title = "",
  depth = 0,
  type = "folder",
  highlight = false,
  isDepthFirstChild = false,
  isDepthLastChild = false,
  connectedLevels,
}) => {
  const indentation = getIndentation({ connectedLevels, depth });
  const link = linkDictionay[isDepthLastChild ? "unique" : "multiple"];
  const icon = iconsDictionary?.[type];
  const currentLine =
    depth === 0 && (isDepthFirstChild || type !== "other")
      ? `${icon} ${title}`
      : `${indentation}${link}${icon} ${title}`;

  return `${highlight ? `// highlight-next-line\n` : ""}${currentLine}`;
};

const getHighlightedLines = ({ highlightType, isChildren = false }) => {
  if (highlightType === "all" || (highlightType === "line" && !isChildren))
    return true;

  if (highlightType === "children" && isChildren) return true;

  return false;
};

const getHighlightChildren = ({ highlightType, highlightChildren }) => {
  if (typeof highlightType === "boolean" && highlightChildren) return false;

  return !!highlightChildren
    ? highlightChildren
    : getHighlightedLines({ highlightType });
};

export const getLevels = ({
  schema = [],
  depth = 0,
  highlightChildren = false,
}) => {
  return schema.reduce((reducer, currentLevel, index, arr) => {
    const { highlight: highlightType = "" } = currentLevel;

    const isDepthFirstChild = index === 0;
    const isDepthLastChild = index + 1 === arr.length;

    const commonProps = {
      title: currentLevel?.title || "",
      type: currentLevel?.type || "folder",
      depth,
      highlight: getHighlightChildren({
        highlightType,
        highlightChildren,
      }),
      isDepthFirstChild,
      isDepthLastChild,
    };

    if (currentLevel?.other)
      return [...reducer, { ...commonProps, type: "other" }];

    if (currentLevel?.children) {
      return [
        ...reducer,
        { ...commonProps },
        ...getLevels({
          schema: currentLevel?.children,
          depth: depth + 1,
          highlight: highlightType,
          highlightChildren: getHighlightedLines({
            highlightType,
            isChildren: true,
          }),
        }),
      ];
    }

    return [...reducer, { ...commonProps }];
  }, []);
};

export const treeParser = (props) => {
  const schema = getLevels({
    schema: props,
  });

  console.log(schema);

  return schema
    .map((schemaLine) =>
      line({
        ...schemaLine,
        isFirstChild: false,
        isLastChild: false,
      }),
    )
    .join("\n");
};
