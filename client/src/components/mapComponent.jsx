import React, { useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';

const MapComponent = () => {
    const [map, setMap] = useState(null);

    useEffect(() => {
        mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

        if (!navigator.geolocation) {
            console.error('Geolocation is not supported by your browser');
            return;
        }
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                const newMap = new mapboxgl.Map({
                    container: 'map',
                    style: 'mapbox://styles/mapbox/streets-v11',
                    center: [longitude, latitude], // Set map to center on user's location
                    zoom: 9 // starting zoom
                });
                setMap(newMap);
                const marker = new mapboxgl.Marker({
                    color: '#FF0000',
                    draggable: true,
                    // Add custom image URL here
                    iconUrl: 'IMG URL HERE'
                })
                .setLngLat([longitude, latitude]) // Marker position
                .addTo(newMap); // Add marker to the map

                return () => {
                    newMap.remove();
                };
            },
            (error) => {
                console.error('Error getting user location:', error);
            }
        );
    }, []);

    const handleMarkLocation = () => {
        if (map) {
            // Get current coordinates of the center of the map
            const center = map.getCenter();
            // Add marker at the current coordinates
            new mapboxgl.Marker()
                .setLngLat([center.lng, center.lat])
                .addTo(map);
        }
    };

    return (
        <div>
            <div id="map" style={{ width: '100%', height: '400px' }} />
            <button onClick={handleMarkLocation}>Mark Location</button>
        </div>
    );
};

export default MapComponent;
