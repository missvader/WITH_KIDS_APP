import React, {useContext, useState, useEffect } from "react";
import {db} from "../firebase/firebase"
import {updateDoc, doc, getDoc, onSnapshot} from "firebase/firestore";
import {AiOutlineDelete} from "react-icons/ai"
import { AuthContext } from "../contexts/AuthProvider";
import Background from "../assets/backgroundApp.png"
import HeaderAgenda from "../components/HeaderAgenda";
import NoFav from "../components/NoFav";

const FavoritesAgenda = () => {
  const {currentUser} = useContext(AuthContext)
  const [favAgenda, setFavAgenda] = useState([]);
  const favAgendaID = doc(db, 'users', `${currentUser.uid}`)
  
/*OBTENER FAV DE BASE DATOS */
useEffect(() => {
  onSnapshot(favAgendaID, (favoriteAgenda) => {
    setFavAgenda(favoriteAgenda.data().favoritesAgenda)
  })
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
              ? favAgenda.map((item)=> {
                return (
                  <div key={item.id} className="grid grid-flow-cols bg-white border-2 border-naranja mx-10 my-5 min-h-16 rounded ">
                    <div className="p-2">
                      <p className="self-center ml-3 text-naranja font-semibold uppercase">{item.titol}</p>
                      <p className="self-center ml-3 text-naranja font-semibold">{item.espai}</p>
                      <button className="btn btn-xs bg-naranja border-0 ml-3 mt-3">
                        <a
                          href={item.linkToUrl}
                          target='_blank'
                        >info</a>
                      </button>
                    </div>
                    <button className="justify-self-end self-end mr-3 mb-2" onClick={()=>deletedAgenda(item.id)}>
                      <AiOutlineDelete size={20} className=""/>
                    </button>
                  </div>
                )
              })
              : <NoFav/>  
              }
            </div>
          </div>
    </div>
  )
}
export default FavoritesAgenda;