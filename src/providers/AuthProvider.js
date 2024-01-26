import React from 'react'
import {Navigate} from "react-router-dom";
import $UserService from 'service/UserService';

/**
 * Authentication provider
 * Check is user & isAuthicate
 * If authenticated redirect to that route
 * not, redirected to login
 */
function AuthProvider({children, isAuthicate, isBoth}) {
  // Get user from session
  const user = $UserService.getUserFromSession();
  return (
    (user === null && isAuthicate) 
    ? 
      <Navigate to="/login" replace /> 
    : ((user !== null && isBoth)?(children):
      (
        (user !== null && (!isAuthicate )) ? <Navigate to="/c/home" replace /> : children
      ))
  );
}

export default AuthProvider;