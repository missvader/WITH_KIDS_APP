import React, {useContext, useState, useEffect } from "react";
import {db} from "../firebase/firebase"
import {updateDoc, doc,onSnapshot} from "firebase/firestore";
import { BsTrashFill} from "react-icons/bs";
import { AuthContext } from "../contexts/AuthProvider";
import HeaderBiblio from "../components/HeaderBiblio";
import NoFav from "../components/NoFav";
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
              ? favBiblio.map((item)=> {
                return (
                  <div key={item.id} className=" grid grid-flow-cols bg-white border-2 border-lila mx-10 my-5 min-h-16 rounded">
                    <div className="p-2">
                      <p className="self-center ml-3 text-lila font-semibold uppercase">{item.titol}</p>
                      <p className="self-center ml-3 text-lila font-semibold">{item.espai}</p>
                      <button className="btn btn-xs bg-lila border-0 ml-3 mt-3">
                        <a
                          href={item.url}
                          target='_blank'
                          rel="noreferrer"
                        >info</a>
                      </button>
                    </div>
                    <button className="justify-self-end self-end mr-3 mb-2" onClick={()=>deletedBiblio(item.id)}>
                      <BsTrashFill size={25} color="red"/>
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

export default FavoritesBiblio;
