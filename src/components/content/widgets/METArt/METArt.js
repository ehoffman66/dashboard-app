import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './METArt.css';

const ArtworkWidget = () => {
  const [artwork, setArtwork] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArtwork = async () => {
      try {
        // Fetch a random object ID (you can adjust this logic based on your needs)
        const objectIdsResponse = await axios.get('https://collectionapi.metmuseum.org/public/collection/v1/objects');
        const randomObjectId = objectIdsResponse.data.objectIDs[Math.floor(Math.random() * objectIdsResponse.data.objectIDs.length)];

        // Fetch the details of the object
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
      <h2>Artwork of the Day</h2>
      {artwork && (
        <div>
          <h3>{artwork.title}</h3>
          <p>{artwork.artistDisplayName}</p>
          {artwork.primaryImage && <img src={artwork.primaryImage} alt={artwork.title} />}
        </div>
      )}
    </div>
  );
};

export default ArtworkWidget;
