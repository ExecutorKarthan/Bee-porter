import React, { useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_SWARM, REMOVE_SWARM} from '../utils/mutations'; 
import { GET_SWARMS } from '../utils/queries';

const MapComponent = () => {
    const [map, setMap] = useState(null);
    const { data } = useQuery(GET_SWARMS);
    const [selectedMarker, setSelectedMarker] = useState(null);
    const [markers, setMarkers] = useState([]);
    const [markerInfo, setMarkerInfo] = useState({ name: '', description: '' });
    const [addSwarm] = useMutation(ADD_SWARM);
    const [removeSwarm] = useMutation(REMOVE_SWARM);

    useEffect(() => {
        // Set access token
        mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

        const initializeMap = async () => {
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

    useEffect(() => {
        if (map && data && data.swarms) {
            // Add markers to the map
            data.swarms.forEach(swarm => {
                const marker = new mapboxgl.Marker()
                    .setLngLat([swarm.longitude, swarm.latitude])
                    .addTo(map);
                    setMarkers(prevMarkers => [...prevMarkers, marker]);
                });
            }
        }, [map, data]);

    // Function to handle marking location
    const handleMarkLocation = async () => {
        if (map) {
            // Get current coordinates of the center of the map
            const center = map.getCenter();
            
            // Create a new marker element with custom styling
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

            // Store the marker in the state
            setMarkers([...markers, newMarker]);
        }
        };

    const handleSaveSwarm = async () => {
        try { 
            const {data} = await addSwarm({
                variables: {
                    latitude: parseFloat(selectedMarker.getLngLat().lat),
                    longitude: parseFloat(selectedMarker.getLngLat().lng),
                    contactInfo: markerInfo.name,
                    description: markerInfo.description
                },
            });
            setMarkerInfo({ name: '', description: '' });
        } catch (error) {
            console.error('Error saving swarm:', error);
        }
    };

    // Function to remove marker
    const handleRemoveMarker = async () => {
        try { 
            const {data} = await removeSwarm({
                variables: {
                    latitude: parseFloat(selectedMarker.getLngLat().lat),
                    longitude: parseFloat(selectedMarker.getLngLat().lng),
                },
            });
        } catch (error) {
            console.error('Error deleting swarm:', error);
        }
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
        if (name === 'description') {
                // If changing the description field, update the markerInfo directly
            setMarkerInfo({
                name: markerInfo.name,
                description: value
                });
        } else {
                // If changing other fields, update the markerInfo state using prevState
            setMarkerInfo({
                name: value,
                description: markerInfo.description
            });
        }
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
                        type="text"
                        name="description"
                        value={markerInfo.description}
                        onChange={handleMarkerInfoChange}
                        placeholder="Description"
                    />
                    <br />
                    <button onClick={handleSaveSwarm}>Save Swarm</button>
                    <br />
                    <button onClick={handleRemoveMarker}>Remove Swarm</button>
                </div>
            )}
        </div>
    );
};

export default MapComponent;
