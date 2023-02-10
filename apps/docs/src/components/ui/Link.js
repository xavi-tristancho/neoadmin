import React from "react";
import Link from "@docusaurus/Link";

export const NeoLink = () => (
  <Link to="https://neoadmin.neoco.dev/" target="blank">
    neoAdmin
  </Link>
);

export const GenericLink = ({ url, text, target = "blank" }) => (
  <Link to={url} target={target}>
    {text}
  </Link>
);

export const LocalLink = (props) => <GenericLink {...props} target="_self" />;

export const WrapperLink = ({ url, children, target = "blank" }) => (
  <Link to={url} target={target}>
    {children}
  </Link>
);

export const WrapperLocalLink = (props) => (
  <WrapperLink {...props} target="_self" />
);
