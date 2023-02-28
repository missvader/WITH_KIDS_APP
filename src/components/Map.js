import React, { useRef, useEffect, useContext} from 'react';
// eslint-disable-next-line import/no-webpack-loader-syntax
import mapboxgl from 'mapbox-gl'; 

import { DataContext } from "../contexts/DataContext";
import IconNaranja from "../assets/icons-map/_event-ticket.svg";
import IconLila from "../assets/icons-map/_event-book.svg";
import IconYellow from "../assets/icons-map/_restaurant.svg"

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

const Map = () => {

  const {  geoAgenda, geoBiblio, geoRestaurantes} = useContext(DataContext);
  const mapContainer = useRef(null);
  const imageIconLila = new Image();
  imageIconLila.src = IconLila;
  const imageIconNaranja = new Image();
  imageIconNaranja.src= IconNaranja;
  const imageIconYellow = new Image();
  imageIconYellow.src = IconYellow;
  // this is where all of our map logic is going to live
  // adding the empty dependency array ensures that the map
  // is only rendered once
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/missvader/cle6y069y000r01qw92ghrlkr",
      center: [2.15999, 41.39979],
      zoom: 11.5,
      
    });
    // only want to work with the map after it has fully loaded
    map.on("load", () => {
      map.addImage('lila', imageIconLila);
      map.addImage("naranja", imageIconNaranja );
      map.addImage("amarillo", imageIconYellow);
      //SOURCES
      map.addSource("biblio", {
        type: "geojson",
        data: geoBiblio
      });
      map.addSource("actividades", {
        type: "geojson",
        data: geoAgenda
      });
      map.addSource("restaurantes", {
        type: "geojson",
        data: geoRestaurantes
      });
      //LAYERS
      map.addLayer({
        id: "biblio",
        type: "symbol",
        source: "biblio",
        layout: {
          "icon-image": 'lila',
          "icon-size": 2,
        }
        
      });
      map.addLayer({
        id: "actividades",
        type: "symbol",
        source: "actividades",
        layout: {
          "icon-image": 'naranja',
          "icon-size": 0.20
        }
      });
      map.addLayer({
        id: "restaurantes",
        type: "symbol",
        source: "restaurantes",
        layout: {
          "icon-image": 'amarillo',
          "icon-size": 0.20
        }
      });
      //GEOLOCATION
      const geolocate = new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        },
        trackUserLocation: true
      });
      map.addControl(geolocate, "top-right");
      
      
    })
    //---POPUPS PARCS--------------- 
    map.on('click', (event) => {
      const features = map.queryRenderedFeatures(event.point, {
      layers: ['parcsbcn'] 
      });
      if (!features.length) {
      return;
      }
      const feature = features[0];
      const popup1 = new mapboxgl.Popup({ offset: [0, -15] , className:"parc-popup"})
      .setLngLat(feature.geometry.coordinates)
      .setHTML(
      `<h3>AREA JOC INFANTIL</h3><p>ADREÇA: ${feature.properties.Adreca}</p><p>BARRI: ${feature.properties.Codi_Barri}</p><p>DISTRICTE: ${feature.properties.Codi_Districte}</p>`
      )
      .addTo(map);
    });
    //---POPUPS AGENDA--------
    map.on('click',(e) => {
      const features = map.queryRenderedFeatures(e.point, {
      layers: ['actividades'] 
      });
      if (!features.length) {
      return;
      }
      const feature = features[0];
      const popup2 = new mapboxgl.Popup({ offset: [0, -15] , className:"agenda-popup"})
      .setLngLat(feature.geometry.coordinates)
      .setHTML(
      `<h3>${feature.properties.titol}</h3><p>ESPAI: ${feature.properties.espai}</p>`
      )
      .addTo(map);
    });
    //----POPUPS BIBLIO-------
    map.on('click',(e) => {
      const features = map.queryRenderedFeatures(e.point, {
      layers: ['biblio'] 
      });
      if (!features.length) {
      return;
      }
      const feature = features[0];
      const popup2 = new mapboxgl.Popup({ offset: [0, -15] , className:"biblio-popup"})
      .setLngLat(feature.geometry.coordinates)
      .setHTML(
      `<h3>${feature.properties.titol}</h3><p>ESPAI: ${feature.properties.organitzadors}</p>`
      )
      .addTo(map);
    });
    //---POPUPS RESTAURANTS----------
    map.on('click',(e) => {
      const features = map.queryRenderedFeatures(e.point, {
      layers: ['restaurantes'] 
      });
      if (!features.length) {
      return;
      }
      const feature = features[0];
      const popup2 = new mapboxgl.Popup({ offset: [0, -15] , className:"rest-popup"})
      .setLngLat(feature.geometry.coordinates)
      .setHTML(
      `<h3>${feature.properties.name}</h3><p>${feature.properties.address}</p>`
      )
      .addTo(map);
    });
   
  // cleanup function to remove map on unmount
    return () => map.remove()
  },[])
  return (
    <div ref={mapContainer} className="map-container map "></div>
  );
}
  


export default Map;