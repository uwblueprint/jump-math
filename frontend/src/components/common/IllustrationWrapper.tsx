import React from "react";

interface IllustrationProps {
  Illustration: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  pb?: string;
  m?: string;
}

// IllustrationWrapper is a wrapper component that accepts an illustration (as SVG) and optional
//    styling arguments and returns the styled illustration.
const IllustrationWrapper = ({
  Illustration,
  pb,
  m,
}: IllustrationProps): React.ReactElement => {
  return <Illustration style={{ paddingBottom: pb && pb, margin: m && m }} />;
};

export default IllustrationWrapper;
