import React from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
export default function ProtectedRoutes({ children }) {
  let token = localStorage.getItem("token");
  let userId = localStorage.getItem("userId");
  JSON.parse(userId);
  console.log(JSON.parse(userId));
  try {
    const decoded = jwtDecode(token);
    console.log(decoded);
    localStorage.setItem("userId", JSON.stringify(decoded.id));
    localStorage.setItem("userName", JSON.stringify(decoded.name));
  } catch (error) {
    // If decoding fails (for example, if the token is invalid or expired), it catches the error, clears the local storage, and redirects the user to the sign-in page using <Navigate to="/signin" />
    console.log("errors", error);
    localStorage.clear();
    return <Navigate to="/signin" />;
  }
  if (token) return children;
  return <Navigate to="/signin" />;
}

/* The provided code is a React component for protected routes. 
It checks if there is a token stored in the local storage. 
If there is a token, it tries to decode it using jwt-decode library to extract user information such as id and name. 
If decoding is successful, 
it stores the user id and name in the local storage. If decoding fails, it clears the local storage and redirects the user to the sign-in page. */
