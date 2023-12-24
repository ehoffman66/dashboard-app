import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './METArt.css';

const ArtworkWidget = () => {
  const [artwork, setArtwork] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArtwork = async () => {
      try {
        const departmentId = 19;
        const response = await axios.get(`https://collectionapi.metmuseum.org/public/collection/v1/objects?departmentIds=${departmentId}`);
        const objectIds = response.data.objectIDs;

        const randomObjectId = objectIds[Math.floor(Math.random() * objectIds.length)];

        const objectDetailsResponse = await axios.get(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${randomObjectId}`);
        setArtwork(objectDetailsResponse.data);
      } catch (error) {
        console.error('Error fetching artwork data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArtwork();
  }, []);

  if (loading) return <div>Loading artwork...</div>;

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