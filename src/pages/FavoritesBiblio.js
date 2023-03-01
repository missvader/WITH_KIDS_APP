import React, {useContext, useState, useEffect } from "react";
import {db} from "../firebase/firebase"
import {updateDoc, doc,onSnapshot} from "firebase/firestore";
import { AuthContext } from "../contexts/AuthProvider";
import HeaderBiblio from "../components/HeaderBiblio";
import NoFav from "../components/NoFav";
import FavBiblio from "../components/FavBiblio";
import Background from "../assets/backgroundApp.png"


const FavoritesBiblio = () => {
  const {currentUser} = useContext(AuthContext)
  const [favBiblio, setFavBiblio] = useState([]);
  const favBiblioID = doc(db, 'users', `${currentUser.uid}`)

  /*OBTENER FAV DE BASE DATOS */
  useEffect(() => {
    onSnapshot(favBiblioID, (favoriteBiblio) => {
    setFavBiblio(favoriteBiblio.data().favoritesBiblio)
    })
    // eslint-disable-next-line
  }, [currentUser.uid]);
/*BORRAR FAVORITO */
const deletedBiblio = async (passedID) => {
  try {
      const result = favBiblio.filter((item) => item.id !== passedID)
      await updateDoc(favBiblioID, {
          favoritesBiblio: result
      })
  } catch (error) {
        console.log(error.message)
      };
}
  return (
    <div className="flex flex-col  m-auto static h-screen w-screen md:items-center ">
      <img src={Background} alt="background" className="bg-image w-screen fixed bottom-0 opacity-50 md:h-5/6"/>
      <div className="container absolute flex flex-col md:w-4/5 lg:w-2/3 lg:mx-auto">
        <HeaderBiblio/>
          <div className="mb-16  lg:text-lg">
            {
              (favBiblio.length > 0)
              ? favBiblio.map((item)=> (
                <FavBiblio
                  key={item.id}
                  id={item.id}
                  titol={item.titol}
                  espai={item.espai}
                  url={item.url}
                  deletedBiblio={()=>deletedBiblio(item.id)}
                />
              ))
              : <NoFav/>  
              }
            </div>
          </div>
    </div>
  )
}

export default FavoritesBiblio;
