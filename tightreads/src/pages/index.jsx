import React from "react";
import { Link } from "react-router-dom";

//Functional Component 
const LoginPage = () => {
  return (
    <div>
      <h3>Login Page</h3>
      <Link to="/makeaccounts">Make an Account</Link>
      
    </div>
  );
};

export default LoginPage;