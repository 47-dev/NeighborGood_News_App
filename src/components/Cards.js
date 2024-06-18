import React, { useState, useEffect } from 'react';
import Card from './Card';
import { toast } from 'react-toastify';

const Cards = ({ category }) => {
    // State variables to store the news articles, loading status, current page, and total pages.
    const [filteredNews, setFilteredNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    // useEffect to fetch data whenever the category or page changes.
    useEffect(() => {
        async function fetchData() {
            setLoading(true); // Set loading to true when fetching starts.
            try {
                // Construct the API URL based on the selected category.
                let url = `https://saurav.tech/NewsAPI/top-headlines/category/${category.toLowerCase()}/in.json`; 
                // let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=c7b6a588832d4860a55127e8a7a83808&page=${page}`;
                
                // Fetch data from the API.
                let response = await fetch(url);
                let output = await response.json();

                // If the API call is successful, update the state with the fetched data.
                if (output.status === 'ok') {
                    setFilteredNews(output.articles || []);
                    setTotalPages(Math.ceil(output.totalResults / 9)); // Assuming 9 articles per page
                } else {
                    // Display an error message if the API call fails.
                    toast.error('Failed to fetch news articles.');
                }
            } catch (error) {
                // Display an error message if there's a network error.
                // toast.error('Network error occurred.');
            }
            setLoading(false); // Set loading to false when fetching ends.
        }

        fetchData();
    }, [category, page]); // Dependencies: re-fetch data when category or page changes.

    // If loading is true, display a loading message.
    if (loading) {
        return <div className='text-cyan-50 font-bold'>Loading...</div>;
    }

    // Filter out invalid articles from the fetched data.
    const validArticles = filteredNews.filter(article => {
        const { title, description, content } = article;
        return (
            title && !title.includes('[Removed]') &&
            description && !description.includes('[Removed]') &&
            content && !content.includes('[Removed]')
        );
    });

    // If there are no valid articles, display a message.
    if (!validArticles || validArticles.length === 0) {
        return <div className='text-[50px] ml-8 mr-8 m-[100px] text-cyan-50'>No news available for this category.</div>;
    }

    // Calculate the start and end indices for slicing the articles array.
    const startIndex = (page - 1) * 9;
    const endIndex = startIndex + 9;
    const articlesToDisplay = validArticles.slice(startIndex, endIndex);

    return (
        <div>
            {/* Display the articles */}
            <div className='flex flex-wrap justify-center gap-4 mb-4'>
                {articlesToDisplay.map((article, index) => (
                    <Card key={index} news={article} />
                ))}
            </div>
            {/* Pagination controls */}
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
    );
};

export default Cards;
