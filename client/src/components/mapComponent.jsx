import React, { useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';

const MapComponent = () => {
    const [map, setMap] = useState(null);
    const [selectedMarker, setSelectedMarker] = useState(null);

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
                    style: 'mapbox://styles/mapbox/dark-v11',
                    center: [longitude, latitude], // Set map to center on user's location
                    zoom: 9 // starting zoom
                });
                setMap(newMap);
                const marker = new mapboxgl.Marker({
                    draggable: true,
                    // Add custom image URL here
                    iconUrl: '/assets/Bee-porter marker img.jpg'

                })
                .setLngLat([longitude, latitude]) // Marker position
                .addTo(newMap); // Add marker to the map

                marker.getElement().addEventListener('click', () => {
                    setSelectedMarker(marker);
                });

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
            const newMarker = new mapboxgl.Marker()
                .setLngLat([center.lng, center.lat])
                .addTo(map);
            //click marker to display info
            newMarker.getElement().addEventListener('click', () => {
                setSelectedMarker(newMarker);
            });
        }
    };
        const handleRemoveMarker = () => {
            if (selectedMarker) {
                selectedMarker.remove();
                setSelectedMarker(null);
            }
        };

    return (
        <div>
            <div id="map" style={{ width: '100%', height: '400px' }} />
            <button onClick={handleMarkLocation}>Mark Location</button>
            {selectedMarker && (
                <div className="marker-card">
                    <h3>Marker Info</h3>
                    <p>Latitude: {selectedMarker.getLngLat().lat}</p>
                    <p>Longitude: {selectedMarker.getLngLat().lng}</p>
                    <button onClick={handleRemoveMarker}>Remove Marker</button>
                </div>
            )}
        </div>
    );
};

export default MapComponent;
