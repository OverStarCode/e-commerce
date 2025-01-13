"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import ProductCard from "@/components/productCard";
import NoResults from "@/components/NoResults";
import ProductSideBarFilter from "@/components/ProductSideBarFilter";
import ProductSearchFilter from "@/components/ProductSearchFilter";
import toast from "react-hot-toast";

export default function Home() {
  const router = useRouter();
  const [searchInput, setSearchInput] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar toggle
  const [products, setProducts] = useState([]);
  const [email, setEmail] = useState(null);

  const intial = async ()=>{
    const jwt = Cookies.get("jwtToken");
    if (jwt === undefined) {
      router.replace("/login");
      return;
    }

    const decodedJwt =  await jwtDecode(jwt);
    setEmail(decodedJwt.email);
  }
  useEffect( () => {
    // Run client-side code only after the component has mounted
    intial();
    getProduct();
  }, [router]);

  const getFilterData = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3030/api/products/filter_products",
        {
          selectedCategory,
          searchText: searchInput,
        }
      );
      setFilteredProducts(response.data);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const handleCategoryChanges = async (e, category) => {
    const checked = e.target.checked;

    if (checked && !selectedCategory.includes(category)) {
      setSelectedCategory([...selectedCategory, category]);
    } else {
      setSelectedCategory(selectedCategory.filter((cat) => cat !== category));
    }

    setTimeout(() => getFilterData(), 10);
  };

  const handleSearchChange = async (e) => {
    setSearchInput(e.target.value);

    if (searchInput.length > 0) {
      getFilterData();
    }
  };

  const getProduct = async () => {
    console.log(email)
    try {
      const response = await axios.get(
        "http://localhost:3030/api/products/products"
      );
      setProducts(response.data);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const handleAddToBasketClick = (product_id) => {
    axios
      .post("http://localhost:3030/api/baskets/check_item_in_basket", {
        product_id: product_id,
        user_id: email,
      })
      .then((response) => {
        if (response.data === true) {
          alert("Product already in basket!");
        } else {
          axios
            .post("http://localhost:3030/api/baskets/add_to_basket", {
              product_id: product_id,
              user_id: email,
            })
            .then(() => 
             {
              alert("Product added to basket!")
              toast.success("Product added to basket")
             })
            .catch(() => {
              alert("Failed to add product to basket!")
              toast.error("Failed to add product to basket")
            });
        }
      });
  };

  if (!email) {
    return null; // Prevent rendering until email is set
  }

  return (
    <div className="flex flex-col md:flex-row gap-7 container mx-auto mb-24 p-4 mt-8">
      {/* Sidebar Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="bg-blue-500 text-white px-4 py-2 rounded-md md:hidden mb-4"
      >
        {isSidebarOpen ? "Close Filters" : "Open Filters"}
      </button>

      {/* Sidebar Filters */}
      <div
        className={`${
          isSidebarOpen ? "block" : "hidden"
        } md:block w-full md:w-[25%] mx-auto align-center p-4 rounded-md shadow-md`}
      >
        <ProductSideBarFilter handleCategoryChanges={handleCategoryChanges} />
      </div>

      {/* Products and Search */}
      <div className="w-full lg:w-[70%]">
        <div className="flex flex-col md:flex-row items-center gap-4">
          <ProductSearchFilter
            searchInput={searchInput}
            handleSearchChange={handleSearchChange}
          />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {filteredProducts.length > 0
            ? filteredProducts.map((product) => (
                <ProductCard key={product.id} user_id={email} product={product}  />
              ))
            : products.length <= 0 && <NoResults />}
          {products.length > 0 &&
          filteredProducts.length <= 0 &&
          selectedCategory.length <= 0 &&
          searchInput.length <= 0
            ? products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  handleAddToBasketClick={() =>
                    handleAddToBasketClick(product.id)
                  }
                />
              ))
            : (filteredProducts.length <= 0  &&filteredProducts.length > 0) && <NoResults />}
        </div>
      </div>
    </div>
  );
}
