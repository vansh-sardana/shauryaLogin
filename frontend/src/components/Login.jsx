import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;
  const navigate = useNavigate(); // For redirection

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:4000/api/v1/login", {
        email,
        "pass": password,
      });

      // Show success toast
      toast.success("Login successful!");

      // Store authentication token or user data (if needed)
      localStorage.setItem("token", res.data.token); // Assuming you get a token from backend

      // Redirect to workspace
      navigate("/workspace");

    } catch (error) {
      const errorMsg = error.response?.data?.message || "Something went wrong";

      if (errorMsg === "Please enter your email and password") {
        toast.error("Please enter both email and password.");
      } else if (errorMsg === "User not found") {
        toast.error("User not found. Please sign up first.");
      } else if (errorMsg === "Incorrect password") {
        toast.error("Incorrect password. Please try again.");
      } else {
        toast.error(errorMsg);
      }

      console.error("Error during login", errorMsg);
    }
  };

  return (
    <div>
      <div className="text-center py-4">
        <h1 className="text-7xl font-semibold p-6">Login</h1>
        <p className="font-light text-lg">Please login to access our services</p>
      </div>
      <form onSubmit={handleOnSubmit}>
        <div className="flex items-center space-x-1 bg-gray-200 rounded-lg p-2">
          <input
            className="bg-transparent w-full outline-none"
            type="text"
            required
            name="email"
            value={email}
            placeholder="Email"
            onChange={handleOnChange}
          />
        </div>
        <div className="my-4 flex items-center space-x-1 bg-gray-200 rounded-lg p-2">
          <input
            className="bg-transparent w-full outline-none"
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={handleOnChange}
          />
        </div>
        <button className="bg-black text-white rounded-lg w-full p-2 mb-4">Login</button>
      </form>
    </div>
  );
};
