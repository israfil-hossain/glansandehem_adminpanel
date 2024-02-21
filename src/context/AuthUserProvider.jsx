import { useQuery } from "@tanstack/react-query";
import React, { createContext, useContext } from "react";
import adminAPI from "../api/adminAPI";

const AuthUserContext = createContext();

const AuthUserProvider = ({ children }) => {
  const {
    data: { data: { data: userData = {} } = {} } = {},
    isLoading: userLoading,
    refetch: userRefetch,
  } = useQuery(["userInfo"], () => adminAPI("/api/Authentication/GetLoggedInUser"), {
    retry: false,
    refetchOnWindowFocus: false,
    cacheTime: 0,
  });

  const userContextValues = {
    // states
    userData,
    userLoading,
    userFound: Boolean(!userLoading && !!userData?.email),
    // methods
    userRefetch,
  };

  return (
    <AuthUserContext.Provider value={userContextValues}>
      {children}
    </AuthUserContext.Provider>
  );
};

export const useAuthUserContext = () => useContext(AuthUserContext);

export default AuthUserProvider;
