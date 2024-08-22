import axios from "axios";
import React, { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function RegisterPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const { name, email, password, confirmPassword } = formData;

    if (!name || !email || !password || !confirmPassword) {
      toast.error("All fields are required");
      return false;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return false;
    }

    return true;
  };

  const handleSubmit = async (datas: any) => {
    if (!validateForm()) {
      return;
    }

    const { confirmPassword, ...restData } = datas;

    try {
      const response = await axios.post(
        "http://localhost:4000/auth/register",
        restData
      );

      if (response.data) {
        toast.success("Registered successfully");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error response:", error.response?.data);
      } else {
        console.error("Unknown error:", error);
      }
    }
  };

  return (
    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:border-gray-700">
      <ToastContainer />
      <h1 className="text-2xl font-bold mt-10 mb-10">Sign in </h1>
      <form
        className="space-y-4 md:space-y-6 px-10 mb-10"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(formData);
        }}
      >
        <div>
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900 text-gray-950 flex align-center justify-start"
          >
            Name
          </label>
          <input
            type="name"
            name="name"
            id="name"
            className="border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="User name"
            onChange={handleChange}
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 text-gray-950 flex align-center justify-start"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="abc@gmail.com"
            onChange={handleChange}
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 text-gray-950 flex align-center justify-start"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className="border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="******"
            onChange={handleChange}
          />
        </div>
        <div>
          <label
            htmlFor="confirm password"
            className="block mb-2 text-sm font-medium text-gray-900 text-gray-950 flex align-center justify-start"
          >
            Confirm password
          </label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            className="border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="******"
            onChange={handleChange}
          />
        </div>
        <button
          type="submit"
          className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Sign In
        </button>
        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
          Already have an account?
          <Link
            to="/"
            className="font-medium text-primary-700 hover:underline text-customBlue ml-2"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
