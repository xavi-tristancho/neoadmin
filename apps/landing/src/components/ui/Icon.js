import React, { useState, useEffect, useRef } from "react";

const Icon = ({
  name,
  source = "features",
  height = 36,
  fill = "#fff",
  additionalStyles,
}) => {
  const ImportedIconRef = useRef(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const importIcon = async () => {
      try {
        const { default: namedImport } = await import(
          `public/icons/${source}/${name}.svg`
        );
        ImportedIconRef.current = namedImport;
      } catch (err) {
        throw err;
      } finally {
        setLoading(false);
      }
    };
    importIcon();
  }, [name]);

  if (!loading && ImportedIconRef.current) {
    const { current: ImportedIcon } = ImportedIconRef;
    return (
      <ImportedIcon
        style={{ width: "auto", ...additionalStyles }}
        width={"auto"}
        height={height}
        fill={fill}
      />
    );
  }

  return null;
};

export default Icon;
