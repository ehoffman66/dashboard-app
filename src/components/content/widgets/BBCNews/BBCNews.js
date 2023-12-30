import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BBCNews.css';

const BBCNewsWidget = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await axios.get('https://newsapi.org/v2/top-headlines', {
                    params: {
                        sources: 'bbc-news',
                        apiKey: 'YOUR_API_KEY' // Replace with your NewsAPI key
                    }
                });
                setArticles(response.data.articles);
            } catch (error) {
                console.error('Error fetching news:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, []);

    if (loading) return <div>Loading...</div>;

    return (
        <div className="bbc-news-widget">
            <h2>BBC News Headlines</h2>
            <ul>
                {articles.map((article, index) => (
                    <li key={index}>
                        <a href={article.url} target="_blank" rel="noreferrer">
                            {article.title}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BBCNewsWidget;
