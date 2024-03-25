import './Map.css';
import { props } from 'react';
import L from "leaflet";
import { Polyline } from 'react-leaflet';
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import React from 'react';
import { useEffect ,useState , useRef } from 'react';
import logo from "../../components/visi.png"

function Map(props) {
    const cities = [
        { ville: "Aïoun", latitude: 16.8366893287323, longitude: -9.27583480330441 },
        { ville: "Akjoujt", latitude: 19.9420143167071, longitude: -14.6440193516613 },
        { ville: "Aleg", latitude: 17.1728009990846, longitude: -13.9023810848904 },
        { ville: "Atar", latitude: 20.6190971368345, longitude: -13.4188043441809 },
        { ville: "Kaédi", latitude: 16.0455219912174, longitude: -13.1873050779235 },
        { ville: "Kiffa", latitude: 16.678771880566, longitude: -11.4111923888962 },
        { ville: "Néma", latitude: 16.3926143684381, longitude: -7.34328812930029 },
        { ville: "Nouadhibou", latitude: 21.0200766331283, longitude: -15.9151199295992 },
        { ville: "Nouakchott", latitude: 18.0783994226296, longitude: -15.885155269477 },
        { ville: "Rosso", latitude: 16.6264755333439, longitude: -15.6941505288147 },
        { ville: "Sélibaby", latitude: 15.4729996284158, longitude: -12.1965786387684 },
        { ville: "Tidjikja", latitude: 18.6315729894793, longitude: -11.5524434053275 },
        { ville: "Zoueratt", latitude: 23.4958870003132, longitude: -10.1376367144798 }
    ];
    const path = props.path;

    // Filtrer les villes pour ne garder que celles présentes dans `path`
    const pathCities = path.map(cityName => cities.find(city => city.ville === cityName)).filter(city => city);
    const redIcon = new L.Icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });
    // Générer les coordonnées pour les polylignes
    const pathCoordinates = pathCities.map(city => [city.latitude, city.longitude]);
    const [vehiclePosition, setVehiclePosition] = useState(pathCoordinates[0]);

    // Icône de véhicule
    const vehicleIcon = L.icon({
        iconUrl: logo,
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [40, 40], // Taille de l'icône
        iconAnchor: [20, 20], // Le point de l'icône qui correspondra à la position du marqueur
    });
    const vehicleMarkerRef = useRef(null);
    useEffect(() => {
        let index = 0;
        const interval = setInterval(() => {
            if (index < pathCoordinates.length) {
                const newPosition = pathCoordinates[index];
                if (vehicleMarkerRef.current) {
                    vehicleMarkerRef.current.setLatLng(newPosition);
                }
                index++;
            } else {
                clearInterval(interval); // Arrêter l'animation à la fin du chemin
            }
        }, 2000); // Mettre à jour la position toutes les 2000 millisecondes (2 secondes)
    
        return () => clearInterval(interval); // Nettoyage de l'intervalle lors du démontage du composant
    }, [pathCoordinates]); // S'assure que useEffect se réexécute si pathCoordinates change
    

    return (
        <div className="App">
            <MapContainer center={[20.031, -10.963]} zoom={6} scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {pathCities.map((city, index) => (
                    <Marker 
                    key={index} 
                    position={[city.latitude, city.longitude]} 
                    icon={index === 0 ? redIcon : (index === pathCities.length - 1 ? redIcon : L.Marker.prototype.options.icon)}>
                    <Popup>Ville : {city.ville}</Popup>
                </Marker>
                ))}
                {/* Dessiner une ligne entre les villes du chemin */}
                <Polyline positions={pathCoordinates} color="blue" />
                <Marker  ref={vehicleMarkerRef} position={vehiclePosition} icon={vehicleIcon}></Marker>
            </MapContainer>
        </div>
    );
}

let DefaultIcon = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png', // Assurez-vous que cette URL pointe vers une icône verte
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [35, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

export default Map;