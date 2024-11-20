import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Admin from "./layouts/Admin";
import Client from "./layouts/Client";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isClientLogin, setIsClientLogin] = useState(false);

  const handleLogin = () => {
    localStorage.setItem("isAuthenticated", true);
    setIsAuthenticated(true);
  };

  const handleClientLogin = () => {
    localStorage.setItem("isClientLogin", true);
    setIsClientLogin(true);
  };

  const handleLogout = async () => {
    try {
      toast.success("Logout Successfully");
      setIsAuthenticated(false);
      setIsClientLogin(false);
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("isClientLogin");
    } catch (error) {
      toast.error("Logout Unsuccessfull");
    }
  };

  useEffect(() => {
    const isAuthenticatedFromStorage =
      localStorage.getItem("isAuthenticated");
    const isClientLoginFromStorage = localStorage.getItem("isClientLogin");
    if (isAuthenticatedFromStorage === "true") {
      setIsAuthenticated(true);
    } else if (isClientLoginFromStorage === "true") {
      setIsClientLogin(true);
    }
  }, []);

  return (
    <div>
      <Toaster
        toastOptions={{
          style: {
            background: "rgb(51 65 85)",
            color: "#fff",
          },
        }}
      />
      {isAuthenticated ? (
        <Admin handleLogout={handleLogout} />
      ) : (
        <Client
          handleLogout={handleLogout}
          handleLogin={handleLogin}
          handleClientLogin={handleClientLogin}
          isClientLogin={isClientLogin}
        />
      )}
    </div>
  );
}

export default App;
