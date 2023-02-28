import React, {useState, useContext} from "react";
import { favoritesMessage} from '../utils/messages'
import { FaHeart, FaRegHeart,FaCalendar, FaPhone} from 'react-icons/fa';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore'
import {db} from "../firebase/firebase";
import { AuthContext } from "../contexts/AuthProvider";


const Biblio = ({titol,id, tags, adreca, espai, data,telefon, dies,horari, durada,errorImage, publico, imatge, url}) => {
  const {currentUser} = useContext(AuthContext);
  const [like, setLike] = useState(false);
  const [saved, setSaved] = useState(false);

  const date = new Date(data);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  const formatedDate = `${day}-${month}-${year}`;

  const addFavoriteBiblio = async () => {
    if(currentUser !== null){
      const favBiblioID = doc(db, 'users', `${currentUser.uid}`)
      setLike(!like)
      setSaved(!saved)
      await updateDoc(favBiblioID, {
          favoritesBiblio: arrayUnion({
          id:id,
          titol: titol,
          espai:espai,
          url:url
        })
      })
    }else{
      favoritesMessage();
    }
  }
  return (
  <div className=" mb-4 container-cards ">
    <div className="card bg-lilaCard shadow-xl m-10 rounded ">
      <figure >
        <img 
        src={imatge} 
        onError={(e) => (e.target.src = errorImage)}
        alt="biblio activity image"
        className=" h-[223px] w-full  rounded "
        /></figure>
      <div className="card-body">
        <div className="card-title  rounded-lg p-2"> 
          <h2 className="uppercase font-sans font-semibold">{titol}</h2>
        </div>
        <div className="px-2 pb-2 font-sans font-medium">
          <p className="py-1 uppercase">{espai}</p>
          <p className="py-1">{adreca}</p>
          <div className="py-1 flex my-2">
            <FaPhone className="" size={20}/> 
            <p>&nbsp;{telefon}</p>
          </div>
          <div className="py-1 flex my-2">
              <FaCalendar className="" size={20}/> 
              <p>&nbsp;INICI: {formatedDate}</p>
          </div> 
          <div className="flex flex-wrap">
            {
              tags?.map((tag, index)=> {
                return (
                  <div key={index}  >
                    <div className="badge  d-block badge-lg p-3 badge-ghost m-2 bg-white/25">{tag}</div>
                  </div>
                )
              })
              }
              <div className="badge  d-block badge-lg p-3 badge-ghost m-2 bg-white/25">{publico}</div>
              {
                dies !== "" ?
                  <div className="badge  d-block badge-lg p-3 badge-ghost m-2 bg-white/25">{dies}</div>
                  : <></>
              }
              {
                durada !== "" ?
                  <div className="badge  d-block badge-lg p-3 badge-ghost m-2 bg-white/25">{durada}</div>
                  : <></>
              }
              {
                horari !== "" ?
                  <div className="badge  d-block badge-lg p-3 badge-ghost m-2 bg-white/25">{horari}</div>
                  : <></>
              }
            </div> 
        </div> 
        <div className="card-actions flex justify-between px-2">
          <button className=" heart "
            onClick={addFavoriteBiblio}>
              {like ? 
              <FaHeart color="red" size="25px"/> :
              <FaRegHeart size="25px"/>
              }
          </button>
          <button 
          className="btn bg-lila btn-sm"
          onClick={() => window.open(url, '_blank')}
          >+ INFO</button>
        </div>
      </div>
    </div>
  </div>
  )
}
export default Biblio;