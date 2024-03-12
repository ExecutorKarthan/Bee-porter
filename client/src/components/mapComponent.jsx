import React, { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

const MapComponent = () => {
    useEffect(() => {
        mapboxgl.accessToken = process.env.MAPBOX_ACCESS_TOKEN;
      const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-74.5, 40], // starting position
        zoom: 9 // starting zoom
      });

    return () => {
      map.remove();
    };
  }, []);

  return <div id="map" style={{ width: '100%', height: '400px' }} />;
};

export default MapComponent;
