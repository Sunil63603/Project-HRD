"use client"; //because 'searchTerm' is a state variable.

//Context API workflow : first create a context , export that context , wrap context provider in layout file .
//this context's provider is wrapped in RootLayout file.

//ReactNode is to write TS code.
//useState is for 'searchTerm'.
//useContext is to export custom context.
import React, { createContext, ReactNode, useState, useContext } from "react";

//here instead of interface , i am using 'type'.
type SearchContextType = {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
};

//partial is used when we dont know initial/default values of searchTerm and setSearchTerm.
//But here partial was causing some error , hence partial is not used.
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

//customhook
export const useSearchContext = (): SearchContextType => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearchContext must be used within a search provider");
  }
  return context;
};
