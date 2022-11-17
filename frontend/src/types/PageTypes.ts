import React from "react";

interface Page {
  title: string;
  url: string;
  icon?: () => React.ReactElement;
  subPages?: Page[];
}

export default Page;
