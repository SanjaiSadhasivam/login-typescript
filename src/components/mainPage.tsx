import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Users {
  id: number;
  name: string;
  email: string;
}

export default function MainPage() {
  const [userData, setUserData] = useState<Users | null>(null);
  const navigate = useNavigate();
  const tokenData = localStorage.getItem("token");

  useEffect(() => {
    const fetchUserData = async () => {
      const token = tokenData; // Replace with your actual token

      try {
        const { data } = await axios.get("http://localhost:4000/api/getuser", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUserData(data.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [tokenData]);
  console.log(userData, "userData");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div>
      <div>
        <h1 className="text-2xl">
          {userData ? `Welcome ${userData.name}` : "Loading..."}
        </h1>
      </div>
      <div className="mt-10">
        <button
          type="button"
          className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
