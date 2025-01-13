import React from 'react'

function ProductsForm({editingProduct,handleSubmit,onsubmit,register,errors,categories}) {
  return (
    <div className="w-full md:w-1/3">
    <h2 className="text-2xl font-semibold mb-4">
      {editingProduct ? "Edit Product" : "Add Product"}
    </h2>
    <form
      className="bg-white p-6 rounded-lg shadow-md"
      onSubmit={handleSubmit(onsubmit)}
    >
      <div className="mb-4">
        <label className="block text-sm font-medium">Name</label>
        <input
          type="text"
          {...register("name", { required: true })}
          className="w-full border border-gray-300 rounded-md p-2"
        />
        {errors.name && (
          <span className="text-red-500 text-sm">Name is required</span>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium">Price</label>
        <input
          type="number"
          {...register("price", { required: true })}
          className="w-full border border-gray-300 rounded-md p-2"
        />
        {errors.price && (
          <span className="text-red-500 text-sm">Price is required</span>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium">Category</label>
        <select
          {...register("category", { required: true })}
          className="w-full border border-gray-300 rounded-md p-2"
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option
              key={Math.ceil(Math.random() * 107700)}
              value={category}
            >
              {category}
            </option>
          ))}
        </select>
        {errors.category && (
          <span className="text-red-500 text-sm">
            Category is required
          </span>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium">Description</label>
        <textarea
          {...register("description", { required: true })}
          className="w-full border border-gray-300 rounded-md p-2"
        />
        {errors.description && (
          <span className="text-red-500 text-sm">
            Description is required
          </span>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium">Restaurant</label>
        <input
          type="text"
          {...register("restaurant", { required: true })}
          className="w-full border border-gray-300 rounded-md p-2"
        />
        {errors.restaurant && (
          <span className="text-red-500 text-sm">
            Restaurant is required
          </span>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white rounded-md p-2"
      >
        {editingProduct ? "Update Product" : "Add Product"}
      </button>
    </form>
  </div>  )
}

export default ProductsForm