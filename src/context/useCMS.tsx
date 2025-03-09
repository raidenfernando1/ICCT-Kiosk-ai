import React, { createContext, useState, useContext } from "react";

type CMSContext = {
  isPopup: boolean;
  setIsPopup: React.Dispatch<React.SetStateAction<boolean>>;
};

export const CMSContext = createContext<CMSContext>({
  isPopup: false,
  setIsPopup: () => {},
});

export const CMSProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isPopup, setIsPopup] = useState(false);

  return (
    <CMSContext.Provider value={{ isPopup, setIsPopup }}>
      {children}
    </CMSContext.Provider>
  );
};

export const useCMS = () => useContext(CMSContext);
