import React, { createContext, ReactNode, useState, useContext } from "react";

//here instead of interface,i am writing type.
type SearchContextType = {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
};

//partial is used when we dont know initial/default values of searchTerm and setSearchTerm.
const SearchContext = createContext<SearchContextType | null>(null);

export const SearchProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  return (
    <SearchContext.Provider value={{ searchTerm, setSearchTerm }}>
      {children}
    </SearchContext.Provider>
  );
};

//custom hook
export const useSearchContext = (): SearchContextType => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearchContext must be used within a SearchProvider");
  }
  return context;
};
