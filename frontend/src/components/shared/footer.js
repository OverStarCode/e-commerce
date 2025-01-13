import { Mail, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function Footer() {
  return (
    <div className="bg-[#000000D9] text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-start gap-11 py-10 px-4">
        {/* Logo and Contact Section */}
        <div className="flex flex-col justify-center items-start gap-6 md:gap-12">
          <Image alt="logo" src="/images/dark-logo.png" width={70} height={60} />

          <p className="text-left text-base md:text-lg font-light leading-relaxed">
            These guys have been absolutely outstanding. When I needed them, they came through in a big way! I know that if you buy this theme.
          </p>

          <div className="flex flex-col gap-3">
            <h2 className="text-xl font-semibold">CONTACT INFO</h2>
            <div className="flex items-center gap-2">
              <Phone />
              <p>+91 1234567891</p>
            </div>
            <div className="flex items-center gap-2">
              <Mail />
              <p>munasbas007@gmail.com</p>
            </div>
          </div>
        </div>

        {/* Account Links */}
        <div>
          <h2 className="text-xl font-semibold mb-4">ACCOUNT</h2>
          <ul className="flex flex-col gap-3">
            <li>
              <Link className="text-base md:text-lg font-light" href="/">
                Home
              </Link>
            </li>
            <li>
              <Link className="text-base md:text-lg font-light" href="/about">
                About us
              </Link>
            </li>
            <li>
              <Link className="text-base md:text-lg font-light" href="/contact">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Legal Links */}
        <div>
          <h2 className="text-xl font-semibold mb-4">LEGALS</h2>
          <ul className="flex flex-col gap-3">
            <li className="text-base md:text-lg font-light cursor-pointer">
              Privacy Policy
            </li>
            <li className="text-base md:text-lg font-light cursor-pointer">
              Terms & Conditions
            </li>
          </ul>
        </div>

        {/* Subscribe Section */}
        <div className="flex-1">
          <h2 className="text-xl font-semibold mb-4">SUBSCRIBE</h2>
          <form>
            <div className="flex items-center bg-gradient-to-r from-cyan-500 to-blue-500 rounded-md px-2 py-1 w-full max-w-xs">
              <Mail />
              <input
                className="outline-none bg-transparent p-3 text-white placeholder-white font-bold flex-1 text-sm md:text-base"
                type="text"
                placeholder="Enter your email"
              />
            </div>
            <button
              className="mt-6 rounded-md px-4 py-2 min-w-[150px] text-base md:text-lg border-2 border-solid border-[#FFBB15] bg-transparent hover:bg-[#ffbd154c] transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Divider */}
      <div className="w-full h-[1px] bg-white"></div>

      {/* Social Media and Footer Note */}
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center py-6 px-4">
        {/* Social Media Icons */}
        <div className="flex flex-wrap justify-center md:justify-start items-center gap-4">
          <Image alt="facebook" src="/images/footer/facebook.png" width={40} height={40} />
          <Image alt="instagram" src="/images/footer/instagram.png" width={40} height={40} />
          <Image alt="twitter" src="/images/footer/twitter.png" width={40} height={40} />
          <Image alt="linkedin" src="/images/footer/linkedin.png" width={40} height={40} />
          <Image alt="youtube" src="/images/footer/youtube.png" width={40} height={40} />
        </div>

        {/* Footer Note */}
        <p className="mt-6 md:mt-0 text-center md:text-right text-sm md:text-base font-medium">
          @2023 For Salone All Rights Reserved.
        </p>
      </div>
    </div>
  );
}

export default Footer;
