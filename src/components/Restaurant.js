import React , {useState, useContext} from "react";
import { favoritesMessage} from '../utils/messages'
import { arrayUnion, doc, updateDoc } from 'firebase/firestore'
import { FaHeart, FaRegHeart, FaPhone} from 'react-icons/fa';
import { AuthContext } from "../contexts/AuthProvider"; 
import { db } from "../firebase/firebase";

const Restaurant = ({name, address, web, phone, tags, image,id}) => {
  const [like, setLike] = useState(false)
  const [saved, setSaved] = useState(false)
  const {currentUser} = useContext(AuthContext)
  

  const addFavoriteRest = async () => {
    if(currentUser !== null){
      const favRestID = doc(db, 'users', `${currentUser.uid}`)
      setLike(!like)
      setSaved(!saved)
      await updateDoc(favRestID, {
        favoritesRestaurants: arrayUnion({
          id:id,
          name:name,
          phone:phone
        })
      })
    }else{
      favoritesMessage();
    }
  }
  return (
    <div className="mb-4 container-cards ">
      <div className="card bg-amarilloCard shadow-xl m-10 rounded ">
        <div className="w-full h-[223px]">
          <img
            src={image}
            alt="restaurant  image"
            className="w-full h-full object-cover rounded"
          />
        </div>
        <div className="card-body">
          <div className="card-title  rounded-lg p-2"> 
            <h2 className="uppercase font-sans font-semibold">{name}</h2>
          </div>
          <div className="px-2 pb-2 font-sans font-medium">
            <p className="py-1 ">{address}</p>
            <div className="py-1 flex my-2">
              <FaPhone className="" size={20}/> 
              <p>&nbsp;{phone}</p>
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
            </div>
          </div> 
          <div className="card-actions flex justify-between px-2">
            <button onClick={addFavoriteRest}>
              {like ? 
              <FaHeart color="red" size="25px"/> :
              <FaRegHeart size="25px" />
              }
            </button>
            <button 
              className="btn bg-lila btn-sm"
              onClick={() => window.open(web, '_blank')}
            >+ INFO</button>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Restaurant;