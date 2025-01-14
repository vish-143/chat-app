import React from "react";
import { Navigate } from "react-router-dom";

function Protected({ isLogin, children }) {
  if (!isLogin) {
    return <Navigate to="/login" replace={true} />;
  }
  return children;
}
export default Protected;