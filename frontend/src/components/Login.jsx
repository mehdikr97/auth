import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data: res } = await axios.post("http://localhost:7800/api/auth/add", data);
      localStorage.setItem("token", res.data);

      window.location = "/after-login";
    } catch (error) {
      if (error.response && error.response.status >= 400 && error.response.status <= 500) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-sky-200 rounded px-5 py-2 ">
      <div className="flex bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-4xl">
        {/* Form Section */}
        <div className="w-2/3 p-8">
          <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
            <h1 className="text-2xl font-bold text-gray-700">Login to Your Account</h1>
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={data.email}
              required
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={data.password}
              required
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {error && <div className="text-red-500 text-sm">{error}</div>}
            <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition">
              Sign In
            </button>
          </form>
        </div>

        {/* Signup Section */}
        <div className="w-1/3 bg-blue-600 text-white flex flex-col justify-center items-center p-8" style={{ backgroundImage: "url('https://cdn-icons-png.flaticon.com/256/11180/11180704.png')"  ,   height: '500px', backgroundSize: 'cover', 
    backgroundPosition: 'center', 
    backgroundRepeat: 'no-repeat', 
 }}>
  <h1 className="text-xl font-semibold">New Here ?</h1>
  <Link to="/signup">
    <button className="mt-20 px-20 py-2 border border-white rounded-lg hover:bg-white hover:text-blue-600 transition ">
      Sign Up
    </button>
  </Link>
</div>

      </div>
    </div>
  );
};

export default Login;
