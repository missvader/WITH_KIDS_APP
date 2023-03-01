import React from "react";
import {useContext } from "react";
import { DataContext } from "../contexts/DataContext";
import Biblio from "../components/Biblio";
import errorBiblioImage from "../assets/errorBiblioImage2.jpg"
import "../App.css"
import Background from "../assets/backgroundApp.png"

const AgendaBiblios = () => {
  const {actBiblio}= useContext(DataContext)
  return (
    <div className="container flex flex-col  m-auto static h-screen  w-screen overflow-auto ">
      <img src={Background} alt="background" className="bg-image w-screen fixed bottom-0 opacity-50 md:h-5/6"/>
      <div className="container absolute flex flex-col mb-10">
            <div className="mb-10 md:grid md:grid-cols-2 md:mx-auto lg:w-4/5 ">
            {
              actBiblio?.map(item => (
                <Biblio
                  key={item.acte_id}
                  id={item.acte_id}
                  titol={item.titol}
                  espai={item.grup_adreca.adreca_nom}
                  tags={item.tipus}
                  data={item.data_inici}
                  dies={item.dies}
                  horari={item.observacions_horari}
                  durada={item.durada}
                  telefon = {item.telefon_contacte}
                  adreca = {item.grup_adreca.adreca}
                  publico={item.public}
                  imatge= {item.imatge}
                  errorImage = {errorBiblioImage}
                  url= {item.acte_url}
                />
              ))
              }
            </div>
          </div>
    </div>          
  )
}

export default AgendaBiblios;
