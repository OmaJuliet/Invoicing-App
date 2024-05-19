import React, { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from "react";

// Define the shape of the context state
interface ModalsContextType {
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

// Create the context with a default value
export const ModalsContext = createContext<ModalsContextType | undefined>(undefined);

// Custom hook to use the Modals context
export const useModals = (): ModalsContextType => {
  const context = useContext(ModalsContext);
  if (context === undefined) {
    throw new Error("useModals must be used within a ModalsContextProvider");
  }
  return context;
};

// Define the props for the provider component
interface ModalsContextProviderProps {
  children: ReactNode;
}

// Provider component
export const ModalsContextProvider: React.FC<ModalsContextProviderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <ModalsContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
    </ModalsContext.Provider>
  );
};
