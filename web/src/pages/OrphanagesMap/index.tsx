import React from 'react';
import { Link } from 'react-router-dom';

import {FiArrowRight, FiPlus} from 'react-icons/fi'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import Leaflet from 'leaflet';

import mapMarkerImg from '../../images/map-marker.svg';

import './styles.css';

const mapIcon = Leaflet.icon({
   iconUrl: mapMarkerImg,
   iconSize: [56, 68],
   iconAnchor: [29,68],
   popupAnchor: [170, 2]
})

const OrphanagesMap: React.FC = () => {
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
            <Marker icon={mapIcon} position={[-21.8753809,-51.8483949]}>
               <Popup className="map-popup" closeButton={false} minWidth={240} maxWidth={240}>
                  Lar A
                  <Link to="/orphanages/1">
                     <FiArrowRight size={32} color="#fff" />
                  </Link>
               </Popup>
            </Marker>
         </Map>


         <Link to="/orphanages/create" className="create-orphanage">
            <FiPlus size={32} color="#fff" />
         </Link>
      </div>
   )
}

export default OrphanagesMap