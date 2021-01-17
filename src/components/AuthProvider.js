import React, { createContext, useState } from "react";
import dayjs from "dayjs";

import SignIn from "./Signin";

const AuthContext = createContext(null);

const AuthProvider = (props) => {
  const initialState = () => {
    return {
      token: JSON.parse(localStorage.getItem("token")) || null,
    };
  };
  const [state, setState] = useState(initialState);

  const validateToken = (token) => {
    if (!token) {
      return false;
    }

    const expiresIn = dayjs(token.expiresIn);
    return dayjs() < expiresIn;
  };

  const content = !validateToken(state.token) ? <SignIn /> : props.children;

  return (
    <AuthContext.Provider value={[state, setState]}>
      {content}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
