import * as React from 'react';
import { googleMapsApi} from '../google-maps-api';


const center = { lat: -34.397, lng: 150.644 };
const zoom = 14;
const MYAPI = googleMapsApi()

const MyMap = () =>{
    return (
        <b>Aqui Va el Mapa</b>
      );
}

export default MyMap;