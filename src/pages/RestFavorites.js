import React, {useContext, useState, useEffect } from "react";
import {db} from "../firebase/firebase"
import {updateDoc, doc,onSnapshot} from "firebase/firestore";
import {AiOutlineDelete} from "react-icons/ai"
import { FaPhone} from 'react-icons/fa';
import { AuthContext } from "../contexts/AuthProvider";
import NoFav from "../components/NoFav";
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
              ? favRest.map((item, index)=> {
                return (
                  <div key={item.id} className=" grid grid-cols-2 border-2 bg-white border-amarilloCard mx-10 my-5  rounded">
                    <div className="p-2">
                      <p className="self-center ml-3 pb-2 text-gray-600 font-semibold uppercase">{item.name}</p>
                      <div className="flex ml-2">
                        <FaPhone/>
                        <p className="self-center ml-1 text-gray-600 font-semibold">{item.phone}</p>
                      </div>
                    </div>
                    <button className="justify-self-end self-end mr-3 mb-2" onClick={()=>deletedRest(item.id)}>
                      <AiOutlineDelete size={20}/>
                    </button>
                  </div>
                );
              })
              : <NoFav/>
              }
            </div>
          </div>
    </div>
  )
}

export default RestFavorites;
