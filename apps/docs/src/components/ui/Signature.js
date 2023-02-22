import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeRaw from "rehype-raw";

const getDefinitionsDescription = (descriptions) =>
  descriptions
    ?.map(({ prop = "", description = "" }) => `${prop}: ${description}`)
    .join("<br />") || "";

export const Signature = ({
  definitions = "",
  functionReturn = "",
  definitionsDescription,
}) => {
  const functionSignature = `
<br />
<span class="signature-title">Signature:</span>
<br />

\`\`\`js
function(${definitions}) => ${functionReturn}
\`\`\`

<span class="descriptions">
${getDefinitionsDescription(definitionsDescription)}
</span>`;

  return (
    <div className="signature">
      <ReactMarkdown
        children={functionSignature}
        remarkPlugins={[remarkGfm, remarkRehype]}
        rehypePlugins={[rehypeRaw]}
      />
    </div>
  );
};
