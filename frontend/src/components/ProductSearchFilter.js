import { Search } from 'lucide-react'
import React from 'react'

function ProductSearchFilter({handleSearchChange,searchInput}) {
  return (
    <form className="w-full  flex ">
    <div className="flex-1 w-full items-center justify-center flex border-2 border-solid border-gray-200 rounded-sm pl-4">
      <Search size={35} className="opacity-40" />
      <input
        className="w-full p-4 pl-0 border-none outline-none bg-transparent"
        type="text"
        value={searchInput}
        onChange={handleSearchChange}
        placeholder="Search"
      />
    </div>

    <button
      className="p-4 min-w-[150px] text-xl border-2 border-solid bg-[#FFBB15] border-gray-200"
      type="submit"
    >
      Search
    </button>
  </form>
  )
}

export default ProductSearchFilter