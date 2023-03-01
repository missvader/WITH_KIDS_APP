import React, {useContext, useState, useEffect } from "react";
import {db} from "../firebase/firebase"
import {updateDoc, doc,onSnapshot} from "firebase/firestore";
import { AuthContext } from "../contexts/AuthProvider";
import NoFav from "../components/NoFav";
import FavRest from "../components/FavRest";
import HeaderRest from "../components/HeaderRest";
import Background from "../assets/backgroundApp.png"

const RestFavorites = () => {
  const {currentUser} = useContext(AuthContext)
  const [favRest, setFavRest] = useState([]);
  const favRestID = doc(db, 'users', `${currentUser.uid}`)

   /*OBTENER FAV DE BASE DATOS */
   useEffect(() => {
    onSnapshot(favRestID, (favoriteRestaurant) => {
    setFavRest(favoriteRestaurant.data().favoritesRestaurants)
    })
    // eslint-disable-next-line
  }, [currentUser.uid]);
  /*BORRAR FAVORITO */
  const deletedRest = async (passedID) => {
    try {
      const result = favRest.filter((item) => item.id !== passedID)
        await updateDoc(favRestID, {
          favoritesRestaurants: result
        })
      } catch (error) {
        console.log(error.message)
      };
    }
    
  return (
    <div className="flex flex-col  m-auto static h-screen w-screen md:items-center">
      <img src={Background} alt="background" className="bg-image w-screen fixed bottom-0 opacity-50 md:h-5/6"/>
      <div className="container absolute flex flex-col md:w-4/5 lg:w-2/3 lg:mx-auto">
        <HeaderRest/>
            <div className="mb-16  lg:mt-20">
            {
              (favRest.length > 0)
              ? favRest.map((item, index)=> (
                <FavRest
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  phone={item.phone}
                  deletedRest={()=>deletedRest(item.id)}
                />
              ))
              : <NoFav/>
              }
            </div>
          </div>
    </div>
  )
}

export default RestFavorites;
