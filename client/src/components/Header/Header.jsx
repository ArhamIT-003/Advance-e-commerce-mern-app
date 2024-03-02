// import { Link } from "react-router-dom";

import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

const Header = () => {
  const menuList = [
    { name: "Products", url: "/shop" },
    { name: "Add to cart", url: "checkout" },
  ];

  const { Logout, isLogged } = useContext(UserContext);

  return (
    <div className="w-full h-20 bg-black rounded-lg flex justify-between transition-all">
      <div className="flex justify-between items-center md:ml-5 ml-2">
        <div className="text-white md:text-3xl md:text-bold antialiased cursor-pointer hover:animate-pulse transition-all">
          E-Products
        </div>
      </div>
      <div className="flex items-center md:gap-10 gap-2">
        {menuList.map((items, index) => (
          <li key={index}>
            <Link
              to={items.url}
              className="text-white text-sm md:text-lg cursor-pointer"
            >
              {items.name}
            </Link>
          </li>
        ))}
      </div>
      <div className="flex items-center md:gap-10 gap-2 md:mr-5 mr-2">
        {!isLogged ? (
          <>
            <li>
              <Link
                to="/login"
                className="text-white bg-gray-600 md:px-6 md:py-3 px-2 py-2 rounded-md hover:bg-gray-400 hover:text-black cursor-pointer"
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                to="/register"
                className="text-white border-2 border-white md:px-6 md:py-3 px-2 py-2 rounded-md cursor-pointer"
              >
                SignUp
              </Link>
            </li>
          </>
        ) : (
          <li>
            <button
              onClick={() => Logout()}
              className="text-white bg-gray-600 md:px-6 md:py-3 px-2 py-2 rounded-md hover:bg-gray-400 hover:text-black cursor-pointer"
            >
              Logout
            </button>
          </li>
        )}
      </div>
    </div>
  );
};

export default Header;
