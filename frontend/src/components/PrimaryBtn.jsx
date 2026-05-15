import React from 'react'

function PrimaryBtn({btn,onclick,className}) {
  return (
    <div>
        <button
        onClick={onclick}
        className={`bg-[#1E4ED8] px-4  text-white py-2 rounded-xl text-sm  shadow-2xl cursor-pointer hover:scale-102  transition active:bg-blue-800  duration-300 ${className}`}>
            {btn}
        </button>
    </div>
  )
}

export default PrimaryBtn