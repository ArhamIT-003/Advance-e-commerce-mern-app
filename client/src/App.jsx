import Header from "./components/Header/Header";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Authentication/Login";
import Register from "./pages/Authentication/Register";
import ShopPage from "./pages/Shop";
import CheckOutPage from "./pages/CheckOut";
import { useContext } from "react";
import { UserContext } from "./context/UserContext";
import { Toaster } from "react-hot-toast";
function App() {
  const { isLogged } = useContext(UserContext);
  return (
    <div className="px-4 md:px-8 lg:px-12 xl:px-24 xxl:px-48">
      <Header />
      <div className="md:h-[calc(100%-80px)]">
        <Routes>
          {!isLogged ? (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </>
          ) : null}
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/checkout" element={<CheckOutPage />} />
        </Routes>
      </div>
      <Toaster position="top-right" />
    </div>
  );
}

export default App;
