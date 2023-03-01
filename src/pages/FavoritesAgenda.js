import React, {useContext, useState, useEffect } from "react";
import {db} from "../firebase/firebase"
import {updateDoc, doc, onSnapshot} from "firebase/firestore";
import { AuthContext } from "../contexts/AuthProvider";
import Background from "../assets/backgroundApp.png"
import HeaderAgenda from "../components/HeaderAgenda";
import NoFav from "../components/NoFav";
import FavAgenda from "../components/FavAgenda";

const FavoritesAgenda = () => {
  const {currentUser} = useContext(AuthContext)
  const [favAgenda, setFavAgenda] = useState([]);
  const favAgendaID = doc(db, 'users', `${currentUser.uid}`)
  
/*OBTENER FAV DE BASE DATOS */
useEffect(() => {
  onSnapshot(favAgendaID, (favoriteAgenda) => {
    setFavAgenda(favoriteAgenda.data().favoritesAgenda)
  })
  // eslint-disable-next-line
}, [currentUser.uid]);
/*BORRAR FAVORITO */
const deletedAgenda = async (passedID) => {
  try {
      const result = favAgenda.filter((item) => item.id !== passedID)
      await updateDoc(favAgendaID, {
          favoritesAgenda: result
      })
  } catch (error) {
        console.log(error.message)
      };
}
  return (
    <div className="flex flex-col  m-auto static h-screen w-screen md:items-center ">
      <img src={Background} alt="background" className="bg-image w-screen fixed bottom-0 opacity-50 md:h-5/6"/>
      <div className="container absolute flex flex-col md:w-4/5 lg:w-2/3 lg:mx-auto">
        <HeaderAgenda/>
            <div className="mb-16 lg:text-lg">
            {
              (favAgenda.length > 0)
              ? favAgenda.map((item)=> (
                <FavAgenda
                  key={item.id}
                  id={item.id}
                  titol={item.titol}
                  espai={item.espai}
                  linkToUrl={item.linkToUrl}
                  deletedAgenda={()=>deletedAgenda(item.id)}
                />
              ))
              : <NoFav/>  
              }
            </div>
          </div>
    </div>
  )
}
export default FavoritesAgenda;