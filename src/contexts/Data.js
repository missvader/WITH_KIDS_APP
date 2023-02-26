import React, {useEffect, useState} from "react";
import axios from "axios";
import { DataContext } from "./DataContext";
import Restaurants from "../data/restaurants.json";

const agenda = axios.create({
  baseURL:"https://analisi.transparenciacatalunya.cat/resource/rhpv-yr4f.json?$query=SELECT%0A%20%20%60codi%60%2C%0A%20%20%60data_fi%60%2C%0A%20%20%60data_inici%60%2C%0A%20%20%60data_fi_aproximada%60%2C%0A%20%20%60denominaci%60%2C%0A%20%20%60descripcio%60%2C%0A%20%20%60entrades%60%2C%0A%20%20%60horari%60%2C%0A%20%20%60subt_tol%60%2C%0A%20%20%60tags_mbits%60%2C%0A%20%20%60tags_categor_es%60%2C%0A%20%20%60tags_altres_categor_es%60%2C%0A%20%20%60enlla_os%60%2C%0A%20%20%60documents%60%2C%0A%20%20%60imatges%60%2C%0A%20%20%60v_deos%60%2C%0A%20%20%60adre_a%60%2C%0A%20%20%60codi_postal%60%2C%0A%20%20%60comarca_i_municipi%60%2C%0A%20%20%60email%60%2C%0A%20%20%60espai%60%2C%0A%20%20%60latitud%60%2C%0A%20%20%60localitat%60%2C%0A%20%20%60longitud%60%2C%0A%20%20%60regi_o_pa_s%60%2C%0A%20%20%60tel_fon%60%2C%0A%20%20%60url%60%2C%0A%20%20%60imgapp%60%2C%0A%20%20%60descripcio_html%60%0AWHERE%0A%20%20(%60comarca_i_municipi%60%0A%20%20%20%20%20%3D%20'agenda%3Aubicacions%2Fbarcelona%2Fbarcelones%2Fbarcelona')%0A%20%20AND%20(contains(%60tags_categor_es%60%2C%20'agenda%3Acategories%2Finfantil')%0A%20%20%20%20%20%20%20%20%20AND%20(%60data_fi%60%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20BETWEEN%20'2023-03-01T11%3A45%3A57'%20%3A%3A%20floating_timestamp%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20AND%20'2023-12-19T11%3A45%3A57'%20%3A%3A%20floating_timestamp))"
});
const biblio = axios.create({
  baseURL: "https://do.diba.cat/api/dataset/actesbiblioteques_ca/format/json/pag-ini/1/pag-fi/29999/camp-categoria-like/infants/camp-rel_municipis-like/08019/"
})
function Data({children}){
  const initialState = {
    isLoading : true,
    userLocation : undefined,
  }

	//DATA STATES
  const [actividades, setActividades] = useState([]);
  const [filteredAct, setFilteredAct] = useState([]);
  const [actBiblio, setActBiblio] = useState([]);
  const [geoAgenda, setGeoAgenda] = useState([]);
  const [geoBiblio, setGeoBiblio] = useState([]);
  const [geoRestaurantes, setGeoRestaurantes] = useState([]);
  
  //GET DATA FROM APIS
  useEffect(() => {
    async function getActivities() {
      const response = await agenda.get();
      setActividades(response.data);
    }
    getActivities();
  }, []); 
  useEffect(() => {
    async function getActBiblio() {
      const response = await biblio.get();
      setActBiblio(response.data.elements);
    }
    getActBiblio();
    console.log()
  }, []); 
  
 //FILTERED ACTIVITIES
 /*se repiten actividades con un mismo item.codi, hay que filtrarlas */
 useEffect(() => {
  let filteredAct = [
    ...new Map(actividades.map((item) => [item["codi"], item])).values(),
  ];
  setFilteredAct(filteredAct);
  console.log(filteredAct)
 }, [actividades]);

//GEOJSON DATA 
 useEffect(() => {
    let geojsonAgenda = {
      "type": "FeatureCollection",
      "features": filteredAct.map(item => {
        return {
          "id": item.codi,
          "type": "Feature",
          "geometry": {
            "type": "Point",
            "coordinates": [
              parseFloat(item.longitud),
              parseFloat(item.latitud)
              ]
          },
          "properties": {
             "titol": item.denominaci,
             "descripcio":item.descripcio,
             "espai": item.espai,
             "inici": item.data_inici,
             "fi": item.data_fi,
             "tags": item.tags_mbits
          }
        };
      })
    };
    setGeoAgenda(geojsonAgenda);
 }, [filteredAct])
 useEffect(() => {
  let geojsonBiblio = {
    "type": "FeatureCollection",
    "features": actBiblio.map(item => {
      const coord = (item.grup_adreca.localitzacio).split(",");
      return {
        "id": item.acte_id,
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [
            parseFloat(coord[1]),
            parseFloat(coord[0])
          ]
        },
        "properties": {
          "id": item.acte_id,
          "titol": item.titol,
          "organitzadors": item.acte_organitzadors,
          "inici": item.data_inici,
          "fi": item.data_fi,
          "dies": item.dies
        }
      };
    })
   };
   setGeoBiblio(geojsonBiblio);
 }, [actBiblio]);
 
useEffect(() => {
  setGeoRestaurantes(Restaurants);
},[]); 

	// Retornamos el Provider con el estado que será global con la función que lo actualiza
	return (
    <DataContext.Provider value={{
      actividades,
      actBiblio,
      isLoading: true,
      userLocation: undefined,
      geoAgenda,
      geoBiblio,
      geoRestaurantes, 
      filteredAct,
      }}>
      {children}
    </DataContext.Provider>);
};
export default Data;