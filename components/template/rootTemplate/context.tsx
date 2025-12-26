"use client";

import { createContext, useContext, RefObject } from "react";

interface RootTemplateContextType {
  parentRef: RefObject<HTMLDivElement> | null;
}

export const RootTemplateContext = createContext<RootTemplateContextType>({
  parentRef: null,
});

export const useRootTemplate = () => {
  const context = useContext(RootTemplateContext);
  if (!context) {
    throw new Error("useRootTemplate must be used within RootTemplateProvider");
  }
  return context;
};
