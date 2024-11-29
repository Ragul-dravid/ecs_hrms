import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Admin from "./layouts/Admin";
import Client from "./layouts/Client";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isClientLogin, setIsClientLogin] = useState(false);

  const handleLogin = () => {
    sessionStorage.setItem("isAuthenticated", true);
    setIsAuthenticated(true);
  };

  const handleClientLogin = () => {
    sessionStorage.setItem("isClientLogin", true);
    setIsClientLogin(true);
  };

  const handleLogout = async () => {
    try {
      toast.success("Logout Successfully");
      setIsAuthenticated(false);
      setIsClientLogin(false);
      sessionStorage.removeItem("isAuthenticated");
      sessionStorage.removeItem("isClientLogin");
    } catch (error) {
      toast.error("Logout Unsuccessfull");
    }
  };

  useEffect(() => {
    const isAuthenticatedFromStorage =
      sessionStorage.getItem("isAuthenticated");
    const isClientLoginFromStorage = sessionStorage.getItem("isClientLogin");
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
