// src/components/Cards.js
import React, { useState, useEffect } from 'react';
import Card from './Card';
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
                let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=5ee6c537618c42ea9eda8aad654f0641&page=${page}`;
                if (category !== "All") {
                    url += `&category=${category.toLowerCase()}`;
                }
                let response = await fetch(url);
                let output = await response.json();
                setFilteredNews(output.articles || []); // Ensure articles is an array
                setTotalPages(Math.ceil(output.totalResults / 5)); // Assuming 20 articles per page
            } catch (error) {
                toast.error("Network me koi dikkat hai");
            }
            setLoading(false);
        }

        fetchData();
    }, [category, page]);

    if (loading) {
        return <div className=' text-cyan-50 font-bold'>Loading...</div>;
    }

    const validArticles = filteredNews.filter(article => {
        const { title, description, content } = article;
        return (
            title && !title.includes("[Removed]") &&
            description && !description.includes("[Removed]") &&
            content && !content.includes("[Removed]")
        );
    });

    if (!validArticles || validArticles.length === 0) {
        return <div className='text-[50px] ml-8 mr-8 m-[100px] text-cyan-50'>No news available for this category.</div>;
    }

    const articlesToDisplay = validArticles.slice(0, 9);

    return (
        <div>
            <div className="flex flex-wrap justify-center gap-4 mb-4">
                {articlesToDisplay.map((article, index) => (
                    <Card key={index} news={article} />
                ))}
            </div>
            <div className="flex justify-center mt-4 mb-5">
                <button 
                    onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                    disabled={page === 1}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md"
                >
                    Previous
                </button>
                <span className="px-4 py-2">{page}</span>
                <button 
                    onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={page === totalPages}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Cards;
