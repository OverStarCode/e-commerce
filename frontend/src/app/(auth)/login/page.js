"use client";
import { useEffect, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import axios from "axios";
import { auth } from "@/firebase";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Toaster, toast } from "react-hot-toast";
import jwtDecode from "jwt-decode";

export default function Login() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  const [user_id ,setUserId] = useState("");
  const jwt = Cookies.get("jwtToken");
  if (jwt !== undefined) {
    router.replace("/");
  }

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent page refresh

    const email = event.target.email.value;
    const password = event.target.password.value;

    try {
      // Firebase email/password authentication
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Get Firebase ID token
      const idToken = await userCredential.user.getIdToken();

      // Send ID token to the backend for verification and JWT issuance
      const response = await axios.post(
        "http://localhost:3030/api/auth/login",
        { idToken }
      );

      // Store the JWT in a cookie
      Cookies.set("jwtToken", response.data.jwtToken);
      // Decode and store the email in localStorage
      

      console.log(response.data.jwtToken)
      setUserId(event.target.email.value);


      // Show success toast
      toast.success("Login successful! Redirecting...");
      setTimeout(() => router.push("/"), 2000); // Redirect after success
    } catch (error) {
      // Handle errors
      const errorMsg = getFriendlyErrorMessage(error);
      setErrorMessage(errorMsg); // Update state for optional inline display
      toast.error(errorMsg); // Show toast notification
    }
  };

  useEffect(()=>{
    localStorage.setItem("user_id",user_id);
  },[user_id])
 

  const getFriendlyErrorMessage = (error) => {
    // Check if it's a Firebase error
    if (error.code) {
      switch (error.code) {
        case "auth/user-not-found":
          return "No account found with this email. Please sign up first.";
        case "auth/wrong-password":
          return "Incorrect password. Please try again.";
        case "auth/invalid-email":
          return "Invalid email address. Please check your input.";
        case "auth/network-request-failed":
          return "Network error. Please check your internet connection.";
        case "auth/too-many-requests":
          return "Too many failed login attempts. Please try again later.";
        default:
        return "No account found with this email. Please sign up first.";
      }
    }

    // Check if it's an Axios error
    if (error.response && error.response.data && error.response.data.message) {
      return error.response.data.message;
    }

    // Fallback for unknown errors
    return "An unexpected error occurred. Please try again.";
  };

  return (
    <div className="min-h-screen px-6 md:px-20 flex flex-col md:flex-row justify-between items-center md:items-end gap-10">
      <Toaster position="top-center" reverseOrder={false} />

      <div className="left self-center my-10 flex flex-col gap-5 w-full md:w-1/2">
        <Image
          alt="logo"
          src="/images/logo.png"
          height={200}
          width={233}
          className=""
        />

        <div className="center mt-7 ">
          <h1 className="text-3xl md:text-4xl font-semibold">Welcome!</h1>
          <p className="text-xl text-gray-600 mt-3">
            Enter your login credentials below.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="w-full md:w-96 mt-5">
          <input
            style={{
              width: "100%",
              padding: "12px",
              fontSize: "18px",
              border: "2px #00000033 solid",
              outline: "none",
              borderRadius: "8px",
              transition: "border-color 0.3s ease, box-shadow 0.3s ease",
            }}
            type="email"
            placeholder="Enter your email address"
            id="email"
            name="email"
            className="focus:border-yellow-500 focus:ring-2 focus:ring-yellow-300 w-full mb-4"
          />

          <input
            style={{
              width: "100%",
              padding: "12px",
              fontSize: "18px",
              border: "2px #00000033 solid",
              outline: "none",
              borderRadius: "8px",
              transition: "border-color 0.3s ease, box-shadow 0.3s ease",
            }}
            type="password"
            placeholder="Enter your password"
            name="password"
            required
            id="password"
            className="focus:border-yellow-500 focus:ring-2 focus:ring-yellow-300 w-full mb-4"
          />

          {/* Optional inline error message */}
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}

          <button
            type="submit"
            className="hover:opacity-85 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-yellow-500 focus:ring-opacity-50 transition-all"
            style={{
              borderRadius: "8px",
              width: "100%",
              border: "2px #FFBB15 solid",
              padding: "10px 20px",
              fontSize: "18px",
              fontWeight: "600",
              marginTop: "20px",
              transition: "all 0.3s ease-in-out",
            }}
          >
            Submit
          </button>
        </form>

        <p className="text-xl text-gray-600 mt-5">
          Don’t have an account?{" "}
          <a
            href="/signup"
            className="text-red-600 font-semibold hover:underline transition-all"
          >
            SignUp
          </a>
        </p>
      </div>

      <div className="right w-full md:w-1/2">
        <Image
          alt="cuate"
          src="/images/login1/cuate.png"
          height={500}
          width={500}
          className="mx-auto md:ml-10"
        />
      </div>
    </div>
  );
}
