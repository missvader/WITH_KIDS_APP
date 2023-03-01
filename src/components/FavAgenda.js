import React from "react";
import { BsTrashFill} from "react-icons/bs";

const FavAgenda = ({id, titol, linkToUrl, espai, deletedAgenda}) => {
  return (
    <div className="grid grid-flow-cols bg-white border-2 border-naranja mx-10 my-5 min-h-16 rounded ">
      <div className="p-2">
        <p className="self-center ml-3 text-naranja font-semibold uppercase">{titol}</p>
        <p className="self-center ml-3 text-naranja font-semibold">{espai}</p>
        <button className="btn btn-xs bg-naranja border-0 ml-3 mt-3">
          <a
            href={linkToUrl}
            target='_blank'
            rel="noreferrer"
          >info</a>
        </button>
      </div>
      <button className="justify-self-end  mr-3 mb-2" onClick={deletedAgenda}>
          <BsTrashFill size={20}  color="red"/>
      </button>
    </div>
  )
}
export default FavAgenda;