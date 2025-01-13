"use client";

import React, { useState } from "react";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "@/firebase";

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [verificationId, setVerificationId] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);

  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
 
        try {
            window.recaptchaVerifier = new RecaptchaVerifier(
                "recaptcha-container",
                {
                  size: "invisible",
                  callback: (response) => {
                    console.log("reCAPTCHA solved:", response);
                  },
                },
                auth
              );
              console.log("ReCAPTCHA setup successfully.");
              } catch (error) {
                console.error("Error setting up reCAPTCHA:", error);
                alert("Failed to set up reCAPTCHA. Please check your Firebase configuration.");
              }
    }
  };

  const handleSendOtp = async () => {
    try {
      if (!phoneNumber) {
        alert("Please enter a valid phone number.");
        return;
      }

      // Disable reCAPTCHA for localhost during development
      if (process.env.NODE_ENV === "development" && auth.settings) {
        auth.settings.appVerificationDisabledForTesting = true;
      }

     await setupRecaptcha();

      const appVerifier = window.recaptchaVerifier;
      const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);

      setVerificationId(confirmationResult.verificationId);
      setIsOtpSent(true);
      alert("OTP sent!");
    } catch (error) {
      console.error("Error sending OTP:", error);
      alert("Failed to send OTP. Please check your Firebase configuration.");
    }
  };

  const handleVerifyOtp = async () => {
    try {
      if (!otp) {
        alert("Please enter the OTP.");
        return;
      }

      const credential = auth.PhoneAuthProvider.credential(verificationId, otp);
      const result = await auth.signInWithCredential(credential);

      alert("Login successful!");
      console.log("User:", result.user);
    } catch (error) {
      console.error("Error verifying OTP:", error);
      alert("Invalid OTP. Please try again.");
    }
  };

  return (
    <div>
      <h1>Firebase OTP Login</h1>
      <div id="recaptcha-container"></div>

      {!isOtpSent ? (
        <div>
          <input
            type="tel"
            placeholder="Enter your phone number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <button onClick={handleSendOtp}>Send OTP</button>
        </div>
      ) : (
        <div>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button onClick={handleVerifyOtp}>Verify OTP</button>
        </div>
      )}
    </div>
  );
};

export default Login;
