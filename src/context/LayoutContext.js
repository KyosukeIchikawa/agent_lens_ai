'use client';

import { createContext, useContext, useState } from 'react';

const LayoutContext = createContext({
  paperData: null,
  sections: null,
  currentSectionId: null,
  setPaperData: () => {},
  setSections: () => {},
  setCurrentSectionId: () => {},
});

export function LayoutProvider({ children }) {
  const [paperData, setPaperData] = useState(null);
  const [sections, setSections] = useState(null);
  const [currentSectionId, setCurrentSectionId] = useState(null);

  return (
    <LayoutContext.Provider
      value={{
        paperData,
        sections,
        currentSectionId,
        setPaperData,
        setSections,
        setCurrentSectionId,
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
}

export function useLayoutContext() {
  return useContext(LayoutContext);
}
