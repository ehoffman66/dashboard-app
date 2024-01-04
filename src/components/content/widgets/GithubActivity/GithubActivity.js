import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './GithubActivity.css';

const GitHubActivityWidget = ({ username }) => {
    const [activityData, setActivityData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchActivity = async () => {
            try {
                const response = await axios.get(`https://api.github.com/users/${username}/events`);
                setActivityData(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch GitHub activity');
                setLoading(false);
            }
        };

        fetchActivity();
    }, [username]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="github-activity-widget">
            <h2>GitHub Activity for {username}</h2>
            <ul>
                {activityData.map((event, index) => (
                    <li key={index}>{event.type} on {new Date(event.created_at).toLocaleDateString()}</li>
                ))}
            </ul>
        </div>
    );
};

export default GitHubActivityWidget;
