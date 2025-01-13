"use client";
import axios from "axios";
import { AlignJustify, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

const pages = [
  { name: "Home", link: "/" },
  { name: "Products", link: "/products" },
  { name: "About Us", link: "/about" },
];

function Header() {
  const [isLogedIn, setLogedIn] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);

  const jwt = Cookies.get("jwtToken");

  useEffect(() => {
    if (jwt != undefined) {
      setLogedIn(true);
    } else {
      setLogedIn(false);
    }
  }, [jwt]);

  const pathnaem = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      axios
        .post("http://localhost:3030/api/auth/logout", {})
        .then((response) => {
          console.log(response.data);
          localStorage.removeItem("user_id");
          Cookies.remove("jwtToken");
          router.push("/login");
        })
        .catch((error) => console.error("Error during logout:", error));
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <Image
          onClick={() => {
            window.location.href = "/";
          }}
          style={{
            cursor: "pointer",
            transition: "transform .5s",
          }}
          src="/images/header/logo.png"
          alt="logo"
          width={70}
          height={60}
        />

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-4">
          {pages.map((page) => (
            <a
              key={page.name}
              href={page.link}
              className={`text-gray-600 hover:text-[#ffbd15be] text-lg px-2 ${
                pathnaem === page.link
                  ? "text-[#FFBB15] font-bold underline"
                  : ""
              }`}
            >
              {page.name}
            </a>
          ))}
        </nav>

        {/* Buttons */}
        <div className="hidden md:flex items-center gap-4">
          {isLogedIn ? (
            <button
              className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-orange-500 hover:to-red-500 text-white font-bold py-2 px-6 rounded-lg text-lg transition-all duration-300"
              onClick={handleLogout}
            >
              Logout
            </button>
          ) : (
            <button
              className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-indigo-500 hover:to-blue-500 text-white font-bold py-2 px-6 rounded-lg text-lg transition-all duration-300"
              onClick={() => {
                router.push("/login");
              }}
            >
              Log In
            </button>
          )}

          <Link href="/cart">
            <ShoppingCart
              size={40}
              className="cursor-pointer hover:font-bold hover:text-gray-500 hover:translate-y-1"
            />
          </Link>
        </div>

        {/* Mobile Hamburger Menu */}
        <AlignJustify
          size={45}
          className="cursor-pointer md:hidden hover:text-gray-500"
          onClick={() => setMenuOpen(!isMenuOpen)}
        />
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="bg-white shadow-md md:hidden">
          <nav className="flex flex-col items-center gap-4 p-4">
            {pages.map((page) => (
              <a
                key={page.name}
                href={page.link}
                className={`text-gray-600 hover:text-[#ffbd15be] text-lg ${
                  pathnaem === page.link
                    ? "text-[#FFBB15] font-bold underline"
                    : ""
                }`}
                onClick={() => setMenuOpen(false)}
              >
                {page.name}
              </a>
            ))}

            <Link
              onClick={() => setMenuOpen(false)}
              className={`text-gray-600 hover:text-[#ffbd15be] text-lg ${
                pathnaem === "/cart" ? "text-[#FFBB15] font-bold underline" : ""
              }`}
              href="/cart"
            >
              Basket
            </Link>

            {isLogedIn ? (
              <button
                className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-orange-500 hover:to-red-500 text-white font-bold py-2 px-4 rounded-lg text-lg transition-all duration-300"
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
              >
                Logout
              </button>
            ) : (
              <button
                className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-indigo-500 hover:to-blue-500 text-white font-bold py-2 px-4 rounded-lg text-lg transition-all duration-300"
                onClick={() => {
                  router.push("/login");
                  setMenuOpen(false);
                }}
              >
                Log In
              </button>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}

export default Header;
