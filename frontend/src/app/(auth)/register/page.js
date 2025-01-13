"use client";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";

import React, { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

function Register() {
  const router = useRouter();
  const [phone, setPhone] = React.useState("");
  const [fullname, setFullname] = React.useState("");
  const [submiting, setSubmiting] = React.useState(false);

  console.log(process.env)
  const handleSubmit = async () => {
    setSubmiting(true);

    if (!phone || !fullname) {
      toast.error("Phone number and Full name are required.");
      setSubmiting(false);
      return;
    }
    if (phone.length < 10 || !phone.startsWith("+")) {
      toast.error("Invalid phone number. Please enter a valid 10-digit number starting with '.");
      setSubmiting(false);
      return;
    }
    if (fullname.length < 3 || fullname.length > 50) {
      toast.error("Full name should be between 3 and 50 characters.");
      setSubmiting(false);
      return;
    }

    if (submiting) {
      toast.error("Please wait until the previous request is finished.");
      return;
    }
    try {
      await axios
        .post(`http://localhost:3030/api/auth/register`, {
          phone,
          fullname,
        })
        .then(() => {
          toast.success("User registered successfully!");

          setPhone("");
          setFullname("");
          setTimeout(() => {
            router.replace("/");
          }, 2000);
        })

        .catch((err) => {
          toast.error("Failed to register user. Please try again.");
        });
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to register user. Please try again.");
    } finally {
      setSubmiting(false);
    }
  };

  return (
    <div className="min-h-screen px-20 flex justify-between items-end max-md:flex-wrap max-md:items-center max-md:justify-center max-md:gap-10">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="left self-center flex flex-col gap-5 mt-8 mb-10">
        <Image alt="logo" src="/images/logo.png" height={200} width={233} />

        <div className="center mt-7 flex flex-col ">
          <h1
            style={{
              fontFamily: "Cyntho Next",
              fontSize: "35px",
              fontWeight: "600",
              lineHeight: "45px",
              textUnderlinePosition: "from-font",
              textDecorationSkipInk: "none",
            }}
          >
            Register As Cafe/Restaurant{" "}
          </h1>

          <p
            style={{
              fontFamily: "Cyntho Next",
              fontSize: "22px",
              fontWeight: "400",
              lineHeight: "32px",
              textUnderlinePosition: "from-font",
              textDecorationSkipInk: "none",
              color: "gray",
            }}
          >
            Register Now!
          </p>

          <input
            style={{
              width: "350px",
              padding: "10px",
              marginTop: "20px",
              fontSize: "18px",
              border: "2px #00000033 solid",
              outline: "none",
              borderRadius: "5px",
            }}
            type="text"
            placeholder="Full Name"
            onChange={(e) => setFullname(e.target.value)}
            value={fullname}
          />

          <input
            style={{
              width: "350px",
              padding: "10px",
              marginTop: "20px",
              fontSize: "18px",
              border: "2px #00000033 solid",
              outline: "none",
              borderRadius: "5px",
            }}
            type="phone"
            placeholder="Phone Number"
            onChange={(e) => setPhone(e.target.value)}
            value={phone}
          />
        </div>
        <div className="bottom mt-10">
          <button
            onClick={handleSubmit}
            disabled={submiting}
            className={`hover:opacity-85 hover:scale-125 ${
              submiting ? "opacity-50 bg-gray-200 text-gray-600" : ""
            }`}
            style={{
              borderRadius: "5px",
              border: " 2px #FFBB15 solid",
              padding: "6px 10px",
              fontSize: "18px",
              width: "350px",
            }}
          >
            {submiting ? "Submiting..." : "Submit"}
          </button>

          <p
            style={{
              fontFamily: "Cyntho Next",
              fontSize: "22px",
              fontWeight: "400",
              lineHeight: "32px",
              textUnderlinePosition: "from-font",
              textDecorationSkipInk: "none",
              marginTop: "15px",
              paddingLeft: "10px",
              color: "gray",
            }}
          >
            Already have an account?
            <a
              style={{
                color: "#EC362B",
                fontSize: "24px",
                fontWeight: "400",
                lineHeight: "32px",
                display: "inline-block",
                paddingLeft: "4px",
              }}
              className="hover:opacity-85 hover:underline hover:scale-110 hover:px-3"
              href="/login1"
            >
              Login
            </a>
          </p>
        </div>
      </div>

      <div className="right self-center max-md:order-1">
        <Image
          alt="cuate"
          src="/images/register/pana.png"
          height={600}
          width={600}
        />
      </div>
    </div>
  );
}

export default Register;
