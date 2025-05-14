//This layout file is only used for the purpose of wrapping 'LogOutComponent' which is inside 'components' folder and also "HR_Navbar.tsx" file

import React from "react";
import { LogOutProvider } from "@/contexts/LogOutContext";
import { SearchProvider } from "@/contexts/SearchContext";

export default function RootLayout({
  children, //children prop cannot be modified as it is readonly
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <LogOutProvider>
          <SearchProvider>{children}</SearchProvider>
        </LogOutProvider>
      </body>
    </html>
  );
}
