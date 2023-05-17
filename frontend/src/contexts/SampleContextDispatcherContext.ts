import { createContext } from "react";

import type { SampleContextAction } from "../types/SampleContextTypes";

const SampleContextDispatcherContext = createContext<
  React.Dispatch<SampleContextAction>
>(() => {});

export default SampleContextDispatcherContext;
