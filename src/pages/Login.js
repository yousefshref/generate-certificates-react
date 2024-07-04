import axios from "axios";
import React, { useEffect } from "react";
import { server } from "../utlits/Variables";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "../components/LoadingScreen";

const Login = () => {
  const [loading, setLoading] = React.useState(false);

  const navigate = useNavigate();

  const handleSignIn = async (event) => {
    event.preventDefault();
    setLoading(true);
    const username = event.target.username.value;
    const password = event.target.password.value;
    await axios
      .post(`${server}api/login/`, {
        username,
        password,
      })
      .then((res) => {
        if (res.data.token) {
          localStorage.setItem("token", res.data.token);
          navigate("/dashboard/");
        } else {
          alert("Wrong username or password");
        }
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (localStorage.getItem("token")) navigate("/dashboard/");
  }, []);
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {loading && <LoadingScreen />}
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center">
          Login to Your Account
        </h2>
        <form onSubmit={handleSignIn} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Username or Email
            </label>
            <div className="mt-1">
              <input
                id="username"
                name="username"
                type="username"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="mt-1">
              <input
                id="password"
                name="password"
                type="password"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
