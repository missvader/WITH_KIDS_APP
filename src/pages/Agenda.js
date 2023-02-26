import React from "react";
import {useContext} from "react";
import { DataContext } from "../contexts/DataContext";
import Actividad from "../components/Actividad";
import Background from "../assets/backgroundApp.png"

import "../App.css"
const Agenda = () => {
  const {filteredAct}= useContext(DataContext);
  
  return (
    <div className="flex flex-col  m-auto static h-screen w-screen md:items-center ">
      <img src={Background} alt="background" className="bg-image w-screen fixed bottom-0 opacity-50 md:h-5/6"/>
      <div className="container absolute flex flex-col mb-10 lg:w-5/6 ">
            <div className="md:w-2/3 md:mx-auto mb-10 lg:grid lg:grid-cols-2 lg:w-auto">
            {
              filteredAct?.map((item)=> (
                <Actividad
                  key={item.codi}
                  id={item.codi}
                  titol={item.denominaci}
                  espai={item.espai}
                  adreca={item.adre_a}
                  telefon={item.tel_fon}
                  email={item.email}
                  horari={item.horari}
                  data={item.data_inici}
                  entrades= {item.entrades}
                  tags={item.tags_categor_es}
                  image= {item.imatges}
                  errorImage = {item.imgapp}
                  url={item.url}
                  link={item.enlla_os}
                />
              ))
              }
            </div>
          </div>
    </div>
  )
}

export default Agenda;
