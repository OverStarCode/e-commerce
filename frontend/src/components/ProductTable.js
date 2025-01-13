import React from 'react'

function ProductTable({handleDelete,handleEdit , products   
}) {
  return (
    <table className="w-full table-auto border-collapse border border-gray-300">
    <thead>
      <tr className="bg-gray-100">
        <th className="border border-gray-300 px-4 py-2">Name</th>
        <th className="border border-gray-300 px-4 py-2">Price</th>
        <th className="border border-gray-300 px-4 py-2">Category</th>
        <th className="border border-gray-300 px-4 py-2">Restaurant</th>
        <th className="border border-gray-300 px-4 py-2">Actions</th>
      </tr>
    </thead>
    <tbody>
      {products.map((product) => (
        <tr
          key={Math.ceil(Math.random() * 10000023)}
          className="text-center"
        >
          <td className="border border-gray-300 px-4 py-2">
            {product.name}
          </td>
          <td className="border border-gray-300 px-4 py-2">
            ${product.price}
          </td>
          <td className="border border-gray-300 px-4 py-2">
            {product.category}
          </td>
          <td className="border border-gray-300 px-4 py-2">
            {product.restaurant}
          </td>
          <td className="border border-gray-300 px-4 py-2">
            <button
              className="bg-yellow-500 text-white px-4 py-2 rounded-md mr-2"
              onClick={() => handleEdit(product)}
            >
              Edit
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-md"
              onClick={() => handleDelete(product.id)}
            >
              Delete
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
  )
}

export default ProductTable