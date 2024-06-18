// src/components/Cards.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Card from './Card';
import NewsDetail from './NewsDetail';
import { toast } from 'react-toastify';

const Cards = ({ category }) => {
    const [filteredNews, setFilteredNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            try {
                let url = `https://saurav.tech/NewsAPI/top-headlines/category/${category.toLowerCase()}/in.json`;
                let response = await fetch(url);
                let output = await response.json();
                if (output.status === 'ok') {
                    setFilteredNews(output.articles || []);
                    setTotalPages(Math.ceil(output.totalResults / 9));
                } else {
                    toast.error('Failed to fetch news articles.');
                }
            } catch (error) {
                toast.error('Network error occurred.');
            }
            setLoading(false);
        }

        fetchData();
    }, [category, page]);

    if (loading) {
        return <div className='text-cyan-50 font-bold'>Loading...</div>;
    }

    const validArticles = filteredNews.filter(article => {
        const { title, description, content } = article;
        return (
            title && !title.includes('[Removed]') &&
            description && !description.includes('[Removed]') &&
            content && !content.includes('[Removed]')
        );
    });

    if (!validArticles || validArticles.length === 0) {
        return <div className='text-[50px] ml-8 mr-8 m-[100px] text-cyan-50'>No news available for this category.</div>;
    }

    const startIndex = (page - 1) * 9;
    const endIndex = startIndex + 9;
    const articlesToDisplay = validArticles.slice(startIndex, endIndex);

    return (
        <Router>
            <Routes>
                <Route path="/" element={
                    <div>
                        <div className='flex flex-wrap justify-center gap-4 mb-4'>
                            {articlesToDisplay.map((article, index) => (
                                <Card key={index} news={article} index={startIndex + index} />
                            ))}
                        </div>
                        <div className='flex justify-center mt-4 mb-5'>
                            <button
                                onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                                disabled={page === 1}
                                className='px-4 py-2 bg-blue-500 text-white rounded-md'
                            >
                                Previous
                            </button>
                            <span className='px-4 py-2'>{page}</span>
                            <button
                                onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
                                disabled={page === totalPages}
                                className='px-4 py-2 bg-blue-500 text-white rounded-md'
                            >
                                Next
                            </button>
                        </div>
                    </div>
                } />
                <Route path="/news/:id" element={<NewsDetail news={filteredNews} />} />
            </Routes>
        </Router>
    );
};

export default Cards;
