import { useContext, useRef } from "react";
import { UserContext } from "../../context/UserContext";

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();

  const { Login } = useContext(UserContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    Login(email, password);
  };

  return (
    <div className="h-[85vh] flex justify-center items-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg px-20 py-10"
      >
        <h2 className="text-2xl font-semibold mb-6">Login</h2>
        <div className="mb-6">
          <label htmlFor="email" className="block text-lg mb-2">
            Email Address:
          </label>
          <input
            id="email"
            type="email"
            className="w-full px-5 py-2 border rounded-lg outline-none"
            placeholder="hello@gmail.com"
            ref={emailRef}
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-lg mb-2">
            Password:
          </label>
          <input
            id="password"
            type="password"
            className="w-full px-5 py-2 border rounded-lg outline-none"
            placeholder="password-@123"
            ref={passwordRef}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors duration-300"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
