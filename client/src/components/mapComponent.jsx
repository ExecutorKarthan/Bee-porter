import React, { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

const MapComponent = () => {
    useEffect(() => {
        mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN

        if (!navigator.geolocation) {
            console.error('Geolocation is not supported by your browser');
            return;
        }
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                const map = new mapboxgl.Map({
                    container: 'map',
                    style: 'mapbox://styles/mapbox/streets-v11',
                    center: [longitude, latitude], // Set map to center on user's location
                    zoom: 9 // starting zoom
                });

                return () => {
                    map.remove();
                };
            },
            (error) => {
                console.error('Error getting user location:', error);
            }
        );
    }, []);
    return <div id="map" style={{ width: '100%', height: '400px' }} />;};
    
export default MapComponent;
