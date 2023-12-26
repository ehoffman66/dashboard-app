import React, { useState, useEffect } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import './Bookmarks.css'; 

const BookmarkComponent = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const [newBookmark, setNewBookmark] = useState('');

  useEffect(() => {
    // Load bookmarks from local storage on initial render
    const savedBookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
    setBookmarks(savedBookmarks);
  }, []);

  const addBookmark = (event) => {
    event.preventDefault();
    if (!newBookmark) return; // Don't add empty bookmarks

    // Prepend https:// if no protocol is specified
    const protocolPattern = /^(http:\/\/|https:\/\/)/i;
    const bookmarkUrl = protocolPattern.test(newBookmark)
      ? newBookmark
      : `https://${newBookmark}`;

    if (bookmarks.includes(bookmarkUrl)) return; // Don't add duplicate bookmarks

    const updatedBookmarks = [...bookmarks, bookmarkUrl];
    setBookmarks(updatedBookmarks);
    setNewBookmark(''); // Clear the input field after adding
    localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks)); // Update local storage
  };

  const removeBookmark = (index) => {
    const updatedBookmarks = bookmarks.filter((_, i) => i !== index);
    setBookmarks(updatedBookmarks);
    localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks)); // Update local storage
  };

  const handleInputChange = (event) => {
    setNewBookmark(event.target.value);
  };

  // Utility function to capitalize the first letter of a string
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  // Extract the domain name for display and capitalize the first letter
  const formatDisplayUrl = (url) => {
    try {
      let domain = new URL(url).hostname;
      // Remove 'www.' if present, capitalize the first letter of the domain
      domain = domain.replace(/^www\./i, '');
      return capitalizeFirstLetter(domain);
    } catch (error) {
      console.error('Error formatting URL:', error);
      return url; // Fallback to the full URL in case of an error
    }
  };

  return (
    <div className="bookmark-container">
      <form onSubmit={addBookmark} className="bookmark-form">
        <input
          type="text"
          value={newBookmark}
          onChange={handleInputChange}
          placeholder="Enter a new bookmark"
          className="bookmark-input"
        />
        <button type="submit" className="bookmark-submit-btn">Add</button>
      </form>
      <ul className="bookmark-list">
        {bookmarks.map((bookmark, index) => {
          const domain = new URL(bookmark).hostname;
          const faviconUrl = `https://www.google.com/s2/favicons?domain=${domain}`;

          return (
            <li key={index} className="bookmark-list-item">
              <img src={faviconUrl} alt="Favicon" />
              <a href={bookmark} target="_blank" rel="noopener noreferrer">
                {formatDisplayUrl(bookmark)}
              </a>
              <DeleteIcon style={{ color: '#f00', cursor: 'pointer' }} onClick={() => removeBookmark(index)} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default BookmarkComponent;
