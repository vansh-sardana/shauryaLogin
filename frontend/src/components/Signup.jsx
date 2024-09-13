import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const { username, email, password } = formData;
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
      const res = await axios.post("http://localhost:4000/api/v1/signup", {
        username,
        email,
        pass: password,
      });

      // Show success toast
      toast.success("Signup successful! Please log in.");

      // Store authentication token (if the backend sends it) or redirect to login
      localStorage.setItem("token", res.data.token); // If the backend returns a token

      // Redirect to workspace or login (choose one based on your flow)
      navigate("/workspace"); // or navigate("/login") if you'd prefer

      console.log("Signup successful", res.data);
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Something went wrong";

      // Handle specific error messages from backend
      if (errorMsg === "Please provide all required fields") {
        toast.error("Please fill all the required fields.");
      } else if (errorMsg === "User already exists") {
        toast.error("User already exists. Please log in.");
      } else {
        toast.error(errorMsg);
      }

      console.error("Error during signup", errorMsg);
    }
  };

  return (
    <div>
      <div className="text-center py-4">
        <h1 className="text-7xl font-semibold p-6">Sign Up</h1>
        <p className="font-light text-lg">Create an account to join us</p>
      </div>
      <form onSubmit={handleOnSubmit}>
        <div className="flex items-center space-x-1 bg-gray-200 rounded-lg p-2">
          <input
            className="bg-transparent w-full outline-none"
            type="text"
            required
            name="username"
            value={username}
            placeholder="Username"
            onChange={handleOnChange}
          />
        </div>
        <div className="my-4 flex items-center space-x-1 bg-gray-200 rounded-lg p-2">
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
            required
            name="password"
            value={password}
            placeholder="Password"
            onChange={handleOnChange}
          />
        </div>
        <button className="bg-black text-white rounded-lg w-full p-2 mb-4">Sign Up</button>
      </form>
    </div>
  );
};
