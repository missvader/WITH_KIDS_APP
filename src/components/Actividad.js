import React, {useState, useContext} from "react";
import { favoritesMessage} from '../utils/messages'
import { FaHeart, FaRegHeart, FaCalendar, FaPhone, FaEnvelope, FaClock } from 'react-icons/fa';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore'
import {db} from "../firebase/firebase";
import { AuthContext } from "../contexts/AuthProvider";

const Actividad = ({titol,id, adreca, espai,horari,tags, telefon, email, data, image, errorImage, link}) => {
  const urlImage = `https://agenda.cultura.gencat.cat` + image;
  const urlErrorImage = `https://agenda.cultura.gencat.cat` + errorImage;
  const linkToUrl = link.split(",")[0];
  /* ------- ESTOS ERRORES Y WARNINGS SON POR LAS urlIMAGES--------------------------
  Revisar error de chrome -->  indicate wheter to send a cookie in a cross-site request by     specifying its SameSite attribute
   tambien revisar --> Cross-Origin Read Blocking (CORB) ha bloqueado la respuesta de orígenes cruzados <URL> con el tipo de MIME text/html. Consulta la página <URL> para obtener más información. */
  const {currentUser} = useContext(AuthContext);
  const [like, setLike] = useState(false);
  const [saved, setSaved] = useState(false);

  const date = new Date(data);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  const formatedDate = `${day}-${month}-${year}`;
  
  const newHorari =  horari?.replace(/&nbsp/i, " ");

  const newTags = tags.split(",").map(item =>item.split("/")[1]);

  const addFavoriteAgenda = async () => {
    if(currentUser !== null){
      const favAgendaID = doc(db, 'users', `${currentUser.uid}`)
      setLike(!like)
      setSaved(!saved)
      await updateDoc(favAgendaID, {
        favoritesAgenda: arrayUnion({
          id:id,
          titol: titol,
          espai:espai,
          linkToUrl:linkToUrl
        })
      })
    }else{
      favoritesMessage();
    }
  }

  return (
    <div className="mb-4 container-cards ">
      <div className="card  bg-naranjaCard shadow-xl m-10 rounded ">
        <div className=" w-full h-[223px]">
          <img 
          src={urlImage} 
          alt="agenda activity"
          onError={(e) => (e.currentTarget.src = urlErrorImage)}
          className= "object-cover w-full h-full rounded "
          />
        </div>
      <div className="card-body ">
        <div className="card-title rounded-lg p-2"> 
          <h2 className="uppercase font-sans font-semibold">{titol}</h2>
        </div>
        <div className="px-2 pb-2 font-sans font-medium">
          <p className="py-1 uppercase">{espai}</p>
          <p className="py-1">{adreca}</p>
          {
            newHorari ? 
              <div className=" grid grid-flow-col ">
                <FaClock size={20} className="mr-2 mt-2"/>
                <p>{newHorari}</p>
              </div>
            : <></>
          }
          {
            telefon ?
              <div className="py-1 flex my-2">
                <FaPhone className="" size={20}/> 
                <p>&nbsp;{telefon}</p>
              </div> 
            : <></> 
          }
          {
            email ?
              <div className="py-1 flex my-2">
                <FaEnvelope className="" size={20}/> 
                <p>&nbsp;{email}</p>
              </div> 
            : <></> 
          }
          <div className="py-1 flex my-2">
              <FaCalendar className="" size={20}/> 
              <p>&nbsp;INICI: {formatedDate}</p>
          </div>
          <div className="flex flex-wrap">
          {
              newTags?.map((newTag, index)=> {
                return (
                  <div key={index}  >
                    <div className="badge  d-block badge-lg p-3 badge-ghost m-2 bg-white/25">{newTag}</div>
                  </div>
                )
              })
              }
          </div>
        </div> 
        <div className="card-actions flex justify-between px-2">
          <button onClick={addFavoriteAgenda}>
            {like ? 
              <FaHeart color="red" size="25px"/> :
              <FaRegHeart size="25px"/>
            }
          </button>
          <button 
          className="btn bg-lila btn-sm "
          ><a
            href={linkToUrl}
            target='_blank'
            >+ INFO</a>
          </button>
        </div>
      </div>
    </div>
  </div>
  )
}
export default Actividad;