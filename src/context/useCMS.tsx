import React, { createContext, useState, useContext } from "react";

type CMSContext = {
  isPopup: boolean;
  setIsPopup: React.Dispatch<React.SetStateAction<boolean>>;
  insertPopup: boolean;
  setInsertPopup: React.Dispatch<React.SetStateAction<boolean>>;
};

export const CMSContext = createContext<CMSContext>({
  isPopup: false,
  setIsPopup: () => {},
  insertPopup: false,
  setInsertPopup: () => {},
});

export const CMSProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isPopup, setIsPopup] = useState(false);
  const [insertPopup, setInsertPopup] = useState(false);

  return (
    <CMSContext.Provider
      value={{ isPopup, setIsPopup, insertPopup, setInsertPopup }}
    >
      {children}
    </CMSContext.Provider>
  );
};

export const useCMS = () => useContext(CMSContext);
