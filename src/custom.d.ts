declare module '*.svg' {
  import React = require('react');

  export const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGAElement>
  >;
  const src: string;
  export default src;
}
