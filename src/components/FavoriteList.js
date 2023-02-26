import React from "react";
import { Link } from "react-router-dom";


const FavoriteList = () => {
  
  return (
    <div className="flex flex-col grid place-content-center lg:text-xl">
      <Link to="/favoritesAgenda">
        <div className="p-4 w-64 bg-naranja rounded-md m-5 text-white text-center lg:w-80" >
          AGENDA CULTURAL
        </div>
      </Link>
      <Link to="/restFavorites">
        <div className="p-4 w-64 bg-amarillo rounded-md m-5 text-center lg:w-80 " >
          RESTAURANTS
        </div>
      </Link>  
      <Link to="/favoritesBiblio">
        <div className="p-4 w-64 bg-lila rounded-md m-5 text-white text-center lg:w-80" >
          BIBLIO AGENDA
        </div>
      </Link>  
    </div>
  )
}
export default FavoriteList;
