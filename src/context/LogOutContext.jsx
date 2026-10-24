import { createContext, useState, useContext, useEffect } from "react";

const LogOutContext = createContext();

export const LogOutProvider = ({ children }) => {
  const [isLogOutContainerVisible, setLogOutContainerVisible] = useState(false);

  // Authentication state
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL;

  // Restore login session on page refresh
  useEffect(() => {
    let active = true;

    fetch(`${API_URL}/api/auth/me`, {
      credentials: "include",
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (active) setUser(data);
      })
      .catch(() => {
        if (active) setUser(null);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [API_URL]);

  // Existing logout popup functions
  const showLogOutContainer = () => setLogOutContainerVisible(true);
  const hideLogOutContainer = () => setLogOutContainerVisible(false);

  // Actual logout
  const logout = async () => {
    const response = await fetch(`${API_URL}/api/auth/logout`, {
      method: "POST",
      credentials: "include",
    });

    if (!response.ok) throw new Error("Logout failed");

    setUser(null);
    hideLogOutContainer();
  };

  return (
    <LogOutContext.Provider
      value={{
        user,
        setUser,
        loading,
        logout,
        isLogOutContainerVisible,
        showLogOutContainer,
        hideLogOutContainer,
      }}
    >
      {children}
    </LogOutContext.Provider>
  );
};

export const useLogOut = () => useContext(LogOutContext);
