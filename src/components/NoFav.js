import React from "react";
import Empty from '../assets/Empty.svg'
const NoFav = () => {
  return (
    <div className="flex flex-col h-6/7 bg-white mt-10 w-5/6 mx-auto rounded border-4 font-mono tracking-wide leading-loose md:h-3/6 lg:h-2/6 ">
      <p className="text-center p-1 text-2xl mt-5">
        Ooopss! </p>
      <p className="text-center p-1 text-2xl mb-2">No tens favorits</p>
      <img src={Empty} alt="No favorites" className="bg-image w-screen md:h-4/6 md:w-4/6 md:mx-auto lg:h-2/6 lg:w-2/3 "/>
      
    </div>
  )
}

export default NoFav;
