import React from "react";
import CodeBlock from "@theme/CodeBlock";
import treeParser from "../utils/treeParser";

const parsedTable = `📁 pages
|  ├──📝 index.js
// highlight-start
|  └──📁 Products
|     ├──📝 headers.js
|     └──📝 index.js
// highlight-end
└──✨ ...`;

const schema = {
  connected: true,
  root_one: {
    title: "pages",
    type: "directory",
    children: {
      //highlight: "all",
      highlight: true,
      title: "products",
      type: "directory",
      children: {
        child_one: {
          title: "header.js",
          type: "file",
        },
        child_two: {
          title: "index.js",
          type: "file",
        },
      },
    },
  },
  root_two: {
    other: true,
  },
};

export const TreeView = (props) => {
  const parsedTree = treeParser(schema);
  console.log(parsedTree);
  return <CodeBlock language="bash">{parsedTable}</CodeBlock>;
};
