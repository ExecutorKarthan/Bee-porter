import React, { useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';

const MapComponent = () => {
    const [map, setMap] = useState(null);
    const [selectedMarker, setSelectedMarker] = useState(null);
    const [markers, setMarkers] = useState([]);
    const [markerInfo, setMarkerInfo] = useState({ name: '', description: '' });

    useEffect(() => {
        // Set access token
        mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

        const initializeMap = () => {
            // Check if geolocation is available
            if (!navigator.geolocation) {
                console.error('Geolocation is not supported by your browser');
                return;
            }
            
            // Get user location
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    
                    // Initialize map with location
                    const newMap = new mapboxgl.Map({
                        container: 'map',
                        style: 'mapbox://styles/mapbox/dark-v11',
                        center: [longitude, latitude],
                        zoom: 9
                    });
                    setMap(newMap);

                    return () => {
                        newMap.remove();
                    };
                },
                (error) => {
                    console.error('Error getting user location:', error);
                }
            );
        };

        // If map is not initialized, initialize it
        if (!map) {
            initializeMap();
        }

    }, [map]);

    // Function to handle marking location
    const handleMarkLocation = () => {
        if (map) {
            // Get current coordinates of the center of the map
            const center = map.getCenter();
            
            // Create a new marker element
            const iconElement = document.createElement('div');
            iconElement.className = 'custom-marker';
            iconElement.style.backgroundColor = 'yellow'; 
            iconElement.style.width = '25px'; 
            iconElement.style.height = '25px'; 
            
            // Add marker at the current coordinates
            const newMarker = new mapboxgl.Marker({
                draggable: true,
                element: iconElement
            })
            .setLngLat([center.lng, center.lat])
            .addTo(map);

            // Click marker to display info
            newMarker.getElement().addEventListener('click', () => {
                setSelectedMarker(newMarker);
            });
            setMarkers([...markers, newMarker]);
            
            // Store marker information
            setMarkerInfo({ name: '', description: '' });
        }
    };

    // Function to remove marker
    const handleRemoveMarker = () => {
        if (selectedMarker) {
            selectedMarker.remove();
            setSelectedMarker(null);
            
            // Filter out removed marker from the markers array
            setMarkers(markers.filter(marker => marker !== selectedMarker));
        }
    };

    // Function to update marker information when input fields change
    const handleMarkerInfoChange = (e) => {
        const { name, value } = e.target;
        setMarkerInfo(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <div>
            <div id="map" style={{ width: '100%', height: '400px' }} />
            <button onClick={handleMarkLocation}>Report Swarm</button>
            {selectedMarker && (
                <div className="marker-card">
                    <h3>Marker Info</h3>
                    <p>Latitude: {selectedMarker.getLngLat().lat}</p>
                    <p>Longitude: {selectedMarker.getLngLat().lng}</p>
                    
                    {/* Input fields for marker information */}
                    <input
                        type="text"
                        name="name"
                        value={markerInfo.name}
                        onChange={handleMarkerInfoChange}
                        placeholder="Name"
                    />
                    <br />
                    <textarea
                        name="description"
                        value={markerInfo.description}
                        onChange={handleMarkerInfoChange}
                        placeholder="Description"
                    />
                    <br />
                    <button onClick={handleRemoveMarker}>Remove Swarm</button>
                </div>
            )}
        </div>
    );
};

export default MapComponent;
