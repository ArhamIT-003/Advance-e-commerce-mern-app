import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const INITIAL_STATE = {
  user: null,
  isLogged: false,
  Login: (email, password) => {},
  Register: (email, password) => {},
  Logout: () => {},
};
export const UserContext = createContext(INITIAL_STATE);

export default function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLogged, setIsLogged] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let token = localStorage.getItem("access_token");
    if (token) {
      setIsLogged(true);
      navigate("/shop");
      toast(`Welcome`);
    }
  }, [user, navigate]);

  const Register = async (email, password) => {
    try {
      const { data } = await axios.post(
        "http://localhost:3001/api/user/register",
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(data);
      setUser(data.user);
      localStorage.setItem("access_token", data.token);
      navigate("/shop");
      toast.success("User Registered successfully");
    } catch (err) {
      console.log(err);
      toast.error("There is an error");
      throw new Error(err);
    }
  };

  const Login = async (email, password) => {
    try {
      const { data } = await axios.post(
        "http://localhost:3001/api/user/login",
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(data);
      setUser(data.user);
      localStorage.setItem("access_token", data.token);
      navigate("/shop");
      toast.success("User logged In successfully");
    } catch (err) {
      console.log(err);
      toast.error("There is an error");
      throw new Error(err);
    }
  };

  const Logout = () => {
    localStorage.removeItem("access_token");
    setUser(null);
    setIsLogged(false);
    navigate("/shop");
    toast.error("User Logged Out!");
  };

  const value = {
    user,
    isLogged,
    Register,
    Login,
    Logout,
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

UserContextProvider.propTypes = {
  children: PropTypes.node,
};
