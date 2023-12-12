import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './METArt.css';

const ArtworkWidget = () => {
  // State variables for the artwork data and loading status
  const [artwork, setArtwork] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArtwork = async () => {
      try {
        // Fetch the list of object IDs for a specific department
        const departmentId = 19; // Example: Assuming the department ID for photographs is 19 (you need to verify the actual ID)
        const response = await axios.get(`https://collectionapi.metmuseum.org/public/collection/v1/objects?departmentIds=${departmentId}`);
        const objectIds = response.data.objectIDs;

        // Select a random object ID from the list
        const randomObjectId = objectIds[Math.floor(Math.random() * objectIds.length)];

        // Fetch the details for the selected object
        const objectDetailsResponse = await axios.get(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${randomObjectId}`);
        setArtwork(objectDetailsResponse.data);
        console.log(objectDetailsResponse.data);
      } catch (error) {
        console.error('Error fetching artwork data:', error);
      } finally {
        setLoading(false);
      }
    };

    // Fetch the artwork data when the component mounts
    fetchArtwork();
  }, []);

  // Render a loading message while the data is being fetched
  if (loading) return <div>Loading artwork...</div>;

  // Render the artwork data
  return (
    <div className="artwork-widget">
      <h2>Photograph of the Day</h2>
      {artwork && (
        <div>
          <h3>{artwork.title}</h3>
          <p>{artwork.artistDisplayName}</p>
          {artwork.primaryImage && <img id="artwork-image" src={artwork.primaryImage} alt="Artwork" />}
        </div>
      )}
    </div>
  );
};

export default ArtworkWidget;