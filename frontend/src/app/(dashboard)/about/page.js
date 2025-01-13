import { LocateIcon, Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import React from "react";

function About() {
  return (
    <div className="container mx-auto px-4">
      <Image
        alt="logo"
        src="/images/logo.png"
        width={140}
        height={100}
        className="py-10 "
      />

      <h1
        style={{
          fontFamily: "Cyntho Next",
          fontSize: "35px",
          fontWeight: "600",
          lineHeight: "42.01px",
          textAlign: "center",
          textUnderlinePosition: "from-font",
          textDecorationSkipInk: "none",
          marginTop: "40px",
          color: "#181818",
        }}
        className="text-5xl font-bold text-center mt-10 md:text-6xl lg:text-7xl"
      >
        About Us
      </h1>

      <p
        style={{
          fontFamily: "Cyntho Next",
          fontSize: "16px",
          fontWeight: "400",
          lineHeight: "26px",
          textAlign: "left",
          textUnderlinePosition: "from-font",
          textDecorationSkipInk: "none",
          marginTop: "30px",
          color: "#000000",
          marginBottom: "50px",
        }}
        className="text-base md:text-lg lg:text-xl mt-8 mb-16"
      >
        Saloon services encompass a wide range of beauty and grooming treatments
        provided by professional salons. These establishments cater to
        individuals seeking to enhance their appearance and pamper themselves.
        Clients can expect a plethora of services designed to cater to their
        specific needs. These services include expert haircuts and styling,
        offering a personalized touch to transform one is hairstyle. Hair
        coloring and highlights provide options for clients to change or enhance
        their hair color, creating unique looks. Salons also offer various hair
        treatments to improve the health and vitality of the hair, such as deep
        conditioning and revitalizing masks. Nail care services like manicures
        and pedicures ensure well-groomed hands and feet, while facial
        treatments aim to cleanse, rejuvenate, and nourish the skin. Hair
        removal services, like waxing, threading, or sugaring, assist in
        achieving smooth and hair-free skin. Makeup services cater to special
        occasions, providing professional application and customized looks.
      </p>

      <div className="flex gap-4 mt-4 items-center">
        <Phone fill="#EC362B" className="text-[#EC362B]" size={35} />
        <p className="text-lg md:text-xl">+91 1234567891</p>
      </div>

      <div className="flex gap-4 mt-4 items-center">
        <MapPin fill="#EC362B" className="text-[#EC362B]" size={35} />
        <p className="text-lg md:text-xl">Munasbas 007, Kolkata</p>
      </div>

      <div className="flex gap-4 mt-4 items-center">
        <Mail fill="#EC362B" className="text-[#EC362B]" size={35} />
        <p className="text-lg md:text-xl">munasbas007@gmail.com</p>
      </div>

      <h2
        style={{
          fontFamily: "Cyntho Next",
          fontSize: "28px",
          fontWeight: "600",
          lineHeight: "33.61px",
          textAlign: "left",
          textUnderlinePosition: "from-font",
          textDecorationSkipInk: "none",
          marginTop: "30px",
          marginBottom: "20px",
          color: "#181818",
        }}
        className="text-3xl md:text-4xl lg:text-5xl mt-10 mb-6"
      >
        Follow Us
      </h2>

      <div className="flex gap-4 mb-24 justify-center md:justify-start">
        <Image
          alt="facebook logo"
          src="/images/about/facebook.png"
          width={40}
          height={40}
        />
        <Image
          alt="instagram logo"
          src="/images/about/instagram.png"
          width={40}
          height={40}
        />
        <Image
          alt="twitter logo"
          src="/images/about/twitter.png"
          width={40}
          height={40}
        />
      </div>
    </div>
  );
}

export default About;
