import React from "react";
import { BsTrashFill} from "react-icons/bs";
import { FaPhone} from 'react-icons/fa';

const FavRest = ({id, name, phone, deletedRest}) => {
  return (
    <div className=" grid grid-cols-2 border-2 bg-white border-amarilloCard mx-10 my-5  rounded">
      <div className="p-2">
        <p className="self-center ml-3 pb-2 text-gray-600 font-semibold uppercase">{name}</p>
        <div className="flex ml-2">
          <FaPhone/>
          <p className="self-center ml-1 text-gray-600 font-semibold">{phone}</p>
        </div>
      </div>
      <button className="justify-self-end self-end mr-3 mb-2" onClick={deletedRest}>
        <BsTrashFill size={20} color="red"/>
      </button>
    </div>
  )
}
export default FavRest;