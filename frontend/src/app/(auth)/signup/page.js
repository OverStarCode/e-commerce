"use client";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import axios from "axios";
import { auth } from "@/firebase";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Toaster, toast } from "react-hot-toast";
import Link from "next/link";
import Cookies from "js-cookie";

export default function Signup() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");

  const jwt = Cookies.get("jwtToken");
  if (jwt !== undefined) {
    router.replace("/");
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const email = event.target.email.value;
    const password = event.target.password.value;

    try {
      // Firebase signup with email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Get Firebase ID token
      const idToken = await userCredential.user.getIdToken();

      // Send ID token to backend to create user in MySQL
      await axios.post("http://localhost:3030/api/auth/signup", { idToken });

      // Show success toast
      toast.success("Registration successful! Redirecting to login...");
      setTimeout(() => router.push("/login"), 2000); // Redirect after success
    } catch (error) {
      // Map Firebase error codes to user-friendly messages
      const errorCode = error.code;
      let errorMsg;

      switch (errorCode) {
        case "auth/weak-password":
          errorMsg = "Your password is too weak. Please use at least 6 characters.";
          break;
        case "auth/email-already-in-use":
          errorMsg = "This email is already in use. Please try logging in or use a different email.";
          break;
        case "auth/invalid-email":
          errorMsg = "The email address is not valid. Please enter a correct email.";
          break;
        case "auth/network-request-failed":
          errorMsg = "Network error. Please check your internet connection and try again.";
          break;
        default:
          errorMsg = "An error occurred. Please try again later.";
      }

      // Set error message state (optional for inline display)
      setErrorMessage(errorMsg);

      // Show error toast
      toast.error(errorMsg);
    }
  };

  return (
    <div className="min-h-screen px-6 md:px-20 flex flex-col md:flex-row justify-between items-center md:items-end max-md:flex-wrap max-md:justify-center max-md:gap-10">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="left self-center flex flex-col gap-5 mt-8 mb-10 w-full md:w-1/2">
        <Image
          alt="logo"
          src="/images/logo.png"
          height={200}
          width={233}
          className=""
        />

        <div className="center mt-7 flex flex-col items-start">
          <h1 className="text-3xl md:text-4xl font-semibold ">
            Register As Cafe/Restaurant
          </h1>
          <p className="text-xl text-gray-600 mt-3 ">Register Now!</p>
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
          {errorMessage && <p style={{ color: "red" ,textAlign:"center"}}>{errorMessage}</p>}

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

        <p className="text-xl text-gray-600 mt-5 ">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-red-600 font-semibold hover:underline transition-all"
          >
            LogIn
          </Link>
        </p>
      </div>

      <div className="right self-center mt-8 md:mt-0 md:w-1/2 max-md:order-1">
        <Image
          alt="cuate"
          src="/images/register/pana.png"
          height={600}
          width={600}
          className="mx-auto md:ml-10"
        />
      </div>
    </div>
  );
}
