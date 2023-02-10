import {
  alignDictionary,
  headersDictionary,
  typesDictionary,
} from "../dictionaries";
import { escapeSpecialMarkdownChars } from "../escapeSpecialMarkdownChars";
import {
  isStringOrNumber,
  isString,
  isObject,
  isComponentOrHtml,
} from "../checker";

export const getHeaderDividers = (cells) =>
  cells.map((cell) => {
    if (isObject(cell) && cell?.align) return alignDictionary?.[cell?.align];
    if (!isString(cell) || cell === "") return alignDictionary?.center;

    const cellName = cell?.toLowerCase();
    const headerInfo = headersDictionary?.[cellName];
    const cellAlignment = headerInfo?.align;

    if (!cellAlignment) return alignDictionary?.center;
    return alignDictionary?.[cellAlignment];
  });

export const getParsedCells = (cells) =>
  cells.map((cell) => {
    if (isObject(cell) && cell?.title) return cell?.title;
    if (isComponentOrHtml(cell)) return cell;
    if (isStringOrNumber(cell) || cell === "") return cell.toString();
    return "";
  });

export const getCellDividers = (cells, showBottomDividers = false) => {
  const parsedCells = getParsedCells(cells);
  const joinedCells = `|${parsedCells.join("|")}|`;

  if (showBottomDividers) {
    const bottomDividers = `|${getHeaderDividers(parsedCells).join("|")}|`;
    return `${joinedCells}\n${bottomDividers}`;
  }

  return `${joinedCells}`;
};

export const getHeaders = ({ headers = [], type = "" }) => {
  const hasHeaders = headers.length > 0;
  const parsedHeaders = getParsedCells(headers).map((header) =>
    headersDictionary?.[header?.toLowerCase()]
      ? headersDictionary?.[header?.toLowerCase()]?.title
      : header,
  );
  if (hasHeaders) return getCellDividers(parsedHeaders, true);

  return type === ""
    ? getCellDividers(typesDictionary["full"], true)
    : getCellDividers(typesDictionary[type], true);
};

export const getRows = (rows = []) => {
  const firstElement = rows?.[0];
  const isMultidimensional = Array.isArray(firstElement);

  if (isMultidimensional && firstElement.length > 0) {
    return rows
      .map((row) => {
        const escapedRow = row.map(escapeSpecialMarkdownChars);
        return getCellDividers(escapedRow);
      })
      .join("\n");
  }

  const escapedCells = rows.map(escapeSpecialMarkdownChars);
  return getCellDividers(escapedCells);
};

const tableParser = ({ headers, rows = [], type }) => {
  const parsedHeaders = getHeaders({ headers, type });
  const parsedRows = getRows(rows);

  return rows?.length > 0 ? `${parsedHeaders}\n${parsedRows}` : "";
};

export default tableParser;
