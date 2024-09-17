import React from "react";
import { createContext, useContext, useState } from "react";


const DialogContext = createContext({
    openWorkspaceDialog: false,
    setOpenWorkspaceDialog: (open: boolean) => {},
});


export const DialogProvider = ({ children }) => {
    const [openWorkspaceDialog, setOpenWorkspaceDialog] = useState(false);
  
    return (
      <DialogContext.Provider value={{ openWorkspaceDialog, setOpenWorkspaceDialog }}>
        {children}
      </DialogContext.Provider>
    );
  };

  export const useDialogContext = () => useContext(DialogContext);
  