"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import ProductTable from "@/components/ProductTable";
import ProductsForm from "@/components/ProductsForm";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import toast, { Toaster } from "react-hot-toast";

export default function Products() {
  const router = useRouter()
  const seedProducts = [
    {
      name: "Cheeseburger",
      price: 5.99,
      category: "Burgers",
      description: "A juicy cheeseburger with lettuce, tomato, and pickles.",
      restaurant: "Burger Palace",
    },
    {
      name: "Pepperoni Pizza",
      price: 12.99,
      category: "Pizzas",
      description: "A classic pepperoni pizza with a crispy crust.",
      restaurant: "Pizza Heaven",
    },
    {
      name: "Coca Cola",
      price: 1.99,
      category: "Drinks",
      description: "A refreshing cold soda to quench your thirst.",
      restaurant: "Drinks & More",
    },
  ];
  const seedCategories = [
    "vegetarian",
    "itlian",
    "american",
    "asian",
    "fast food",
    "sushi",
    "healthy",
    "chinese",
    "mexican",
  ];
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(seedCategories);
  const [editingProduct, setEditingProduct] = useState(null);
  const [decodedToken, setDecodedToken] = useState(null);


  const [jwtToken, setJwtToken] = useState(null);
  const [user_id,setUserId] = useState("");


  const jwt = Cookies.get("jwtToken");


  if(jwt == undefined) {
    router.replace("/login")
  }
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Fetch products and categories

  useEffect(() => {
    // This ensures that cookies are read only on the client-side (after the initial render)
    const token = Cookies.get("jwtToken");

    if (token) {
      setJwtToken(token);

      try {
        // Decode the JWT token
        const decoded = jwtDecode(token);
        setDecodedToken(decoded);
      } catch (error) {
        console.error("Failed to decode JWT", error);
      }
    }

    setUserId(localStorage.getItem("user_id"))
    fetchProducts();

  }, []); 
  

  const fetchProducts = async () => {

    

    try {
          axios.get(
            ` http://localhost:3030/api/products/products/${localStorage.getItem("user_id")}`
           ).then(response => {
             console.log(response.data);
             setProducts(response.data);
           }).catch(err => {
             console.error("Error fetching products:", err);
           });
   
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };



  // Empty dependency array ensures this runs only once after the component mounts

  const onSubmit = async (data) => {
    try {
      if (editingProduct) {
        

       await axios
          .post(
            `http://localhost:3030/api/products/update_product/${editingProduct.id}/${user_id}`,
            data
          )
          .then((response) => {
            console.log(response.data);
            fetchProducts();
            reset();
            toast.success("Product updated successfully!")
          });
      } else {
        // Create product
        await axios.post(`http://localhost:3030/api/products/add_product/${user_id}`, data);
      }
      fetchProducts();
      reset();
      setEditingProduct(null);
      toast.success("Product saved successfully!")
    } catch (error) {
      console.error("Error saving product:", error);
    }

    console.log(data);
    fetchProducts();
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    reset(product);
  };

  const handleDelete = async (id) => {
    // Confirm deletion
    if (!window.confirm("Are you sure you want to delete this product?")) {
      return;
    }
    try {
      await axios.delete(
        `http://localhost:3030/api/products/delete_product/${id}`
      );
      fetchProducts();


      toast.success("Product deleted successfully!")
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

 

  return (
    <div className="container mx-auto py-8">

      <Toaster position="top-center"/>
      <h1 className="text-3xl font-bold text-center mb-8">
        Product Management
      </h1>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Form Section */}

        <ProductsForm
          editingProduct={editingProduct}
          handleSubmit={handleSubmit}
          onsubmit={onSubmit}
          register={register}
          errors={errors}
          categories={categories}
        />

        {/* Product List */}
        <div className="w-full md:w-2/3">
          <h2 className="text-2xl font-semibold mb-4">Products</h2>
          {
            products.length > 0 ?<ProductTable
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            products={products}
          />:
          <div className="flex flex-col items-center justify-center py-10 bg-gray-50 rounded-lg shadow-md">
          <p className="text-2xl font-semibold text-gray-600 mb-4">
            No products found
          </p>
          <p className="text-gray-500 text-lg mb-6">
            Add your first product to get started!
          </p>
          <button
            onClick={() => window.scrollTo(0,0)} // Add your redirect logic here
            className="px-6 py-3 bg-yellow-500 text-white rounded-lg font-medium text-lg shadow-md hover:bg-yellow-600 transition-all duration-300"
          >
            Add Product
          </button>
        </div>
        
          }
        </div>
      </div>
    </div>
  );
}
