"use client"
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchProtectedData = async () => {
      try {
        const response = await axios.get("http://localhost:3030/api/auth/protected", {
          withCredentials: true,
        });
        setMessage(response.data.message);
      } catch (err) {
        console.error(err);
        // router.push("/login");
      }
    };

    fetchProtectedData();
  }, [router]);

  return <h1>{message || "Loading..."}</h1>;
}
