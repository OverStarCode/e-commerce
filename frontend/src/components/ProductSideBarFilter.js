import React from 'react'


const categories = [
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
function ProductSideBarFilter({handleCategoryChanges}) {
  return (
    <div className="left  min-w-48 max-w-80 h-fit rounded-md border-gray-400 border-solid border-2 p-4">
    <p
      style={{
        fontFamily: "Cyntho Next",
        fontSize: "20px",
        fontWeight: "600",
        lineHeight: "22px",
        textAlign: "left",
        textUnderlinePosition: "from-font",
        textDecorationSkipInk: "none",
      }}
    >
      Categories
    </p>

    <ul className="mt-4">
      {categories.map((category) => (
        <li
          key={category}
          className="py-2 flex justify-between items-center gap-2"
        >
          <label
            style={{
              fontFamily: "Cyntho Next",
              fontSize: "15px",
              fontWeight: "400",
              lineHeight: "24px",
              textAlign: "right",
              textUnderlinePosition: "from-font",
              textDecorationSkipInk: "none",
            }}
            className="ml-2"
            htmlFor={category}
          >
            {category}
          </label>
          <input
            style={{
              width: "30px",
              height: "30px",
              top: "374px",
              left: "282.09px",
              gap: "0px",
              borderRadius: "4px 0px 0px 0px",
              border: "1px 0px 0px 0px",
              opacity: "0px",
            }}
            type="checkbox"
            id={category}
            name={category}
            onChange={(e) => {
              handleCategoryChanges(e, category);
            }}
          />
        </li>
      ))}
    </ul>
  </div>
  )
}

export default ProductSideBarFilter