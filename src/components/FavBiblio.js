import React from "react";
import { BsTrashFill} from "react-icons/bs";

const FavBiblio = ({id, titol, espai, url, deletedBiblio}) => {
  return (
    <div className=" grid grid-flow-cols bg-white border-2 border-lila mx-10 my-5 min-h-16 rounded">
      <div className="p-2">
        <p className="self-center ml-3 text-lila font-semibold uppercase">{titol}</p>
        <p className="self-center ml-3 text-lila font-semibold">{espai}</p>
        <button className="btn btn-xs bg-lila border-0 ml-3 mt-3">
          <a
            href={url}
            target='_blank'
            rel="noreferrer"
          >info</a>
        </button>
      </div>
      <button className="justify-self-end self-end mr-3 mb-2" onClick={deletedBiblio}>
        <BsTrashFill size={20} color="red"/>
      </button>
    </div>
  )
}
export default FavBiblio;