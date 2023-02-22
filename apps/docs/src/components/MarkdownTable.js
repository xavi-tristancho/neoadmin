import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeRaw from "rehype-raw";
import parseTable from "../utils/tableParser/tableParser";

const customComponentTag = "rc";

const components = (reactComponents = {}) => ({
  th: ({ children, style }) => (
    <th
      className={`header ${children?.[0]?.toLowerCase()?.replace(" ", "-")}`}
      style={style}
    >
      {children}
    </th>
  ),
  [customComponentTag]: (props) => {
    const { node } = props;
    const { properties } = node;
    const currentComponentName = props?.cn || props?.componentName;
    const currentComponentOptions = properties?.o || properties?.options;
    const currentComponent = reactComponents?.[currentComponentName];
    const { component: Component, options } = currentComponent;

    return (
      <>
        <Component
          {...props}
          {...options?.[currentComponentOptions]}
          reactComponents={reactComponents}
        />
        {props.children}
      </>
    );
  },
});

export const MarkdownTable = ({ reactComponents, ...props }) => {
  const parsedTable = parseTable(props);

  return (
    <span className="markdown-table">
      <ReactMarkdown
        components={components(reactComponents)}
        children={parsedTable}
        remarkPlugins={[remarkGfm, remarkRehype]}
        rehypePlugins={[rehypeRaw]}
      />
    </span>
  );
};
