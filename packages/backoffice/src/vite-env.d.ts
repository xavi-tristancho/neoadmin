declare module "*.svg" {
  const ReactComponent: React.FC<React.SVGProps<SVGElement>>;
  export { ReactComponent };
}

/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />
