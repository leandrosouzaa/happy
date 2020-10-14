import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import {FiArrowRight, FiPlus} from 'react-icons/fi'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import Leaflet from 'leaflet';

import mapMarkerImg from '../../images/map-marker.svg';

import './styles.css';
import api from '../../services/api';

const mapIcon = Leaflet.icon({
   iconUrl: mapMarkerImg,
   iconSize: [56, 68],
   iconAnchor: [29,68],
   popupAnchor: [170, 2]
})

interface Orphanage {
   id: number,
   latitude: number,
   longitude: number,
   name: string;
}

const OrphanagesMap: React.FC = () => {
   const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

   useEffect(() => {
      api.get('/orphanages').then(response => {
         setOrphanages(response.data)
      }).catch(err => {
         alert("Ocorreu um problema em sua requisição.")
      });
   }, [])


   return (
      <div id="page-map">
         <aside>
            <header>
               <img src={mapMarkerImg} alt="Happy" />

               <h2>Escolha um orfanato no mapa</h2>
               <p>Muitas crianças estão esperando a sua visita :)</p>
            </header>

            <footer>
               <strong>Presidente Venceslau</strong>
               <span>São Paulo</span>
            </footer>
         </aside>
         
         <Map 
            center={[-21.8753809,-51.8483949]}
            zoom={15}
            style={{ width: '100%', height: '100%' }}
         >
            {/* <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" /> */}
            <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} />
            {orphanages.map(i => (
               <Marker icon={mapIcon} position={[i.latitude,i.longitude]} key={i.id}>
                  <Popup className="map-popup" closeButton={false} minWidth={240} maxWidth={240}>
                     {i.name}
                     <Link to={`/orphanages/${i.id}`}>
                        <FiArrowRight size={32} color="#fff" />
                     </Link>
                  </Popup>
               </Marker>
            ))}
         </Map>


         <Link to="/orphanages/create" className="create-orphanage">
            <FiPlus size={32} color="#fff" />
         </Link>
      </div>
   )
}

export default OrphanagesMap