// src/App.js
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Cards from './components/Cards';
import Filter from './components/Filter';
import Spinner from './components/Spinner';
import { toast } from 'react-toastify';
import { Toaster } from 'react-hot-toast';
import { apiUrl, filterData } from './data';

const App = () => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [category, setCategory] = useState(filterData[0].title);

    async function fetchData() {
        setLoading(true);
        try {
            let response = await fetch(apiUrl);
            let output = await response.json();
            setNews(output.articles || []); // Ensure articles is an array
        } catch (error) {
            toast.error("Network me koi dikkat hai");
        }
        setLoading(false);
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="min-h-screen flex flex-col bg-bgDark2">
            <Navbar />
            <div className="bg-bgDark2">
                <Filter 
                    filterData={filterData}
                    category={category}
                    setCategory={setCategory}
                />
                <div className="w-11/12 max-w-[1200px] mx-auto flex flex-wrap justify-center items-center min-h-[50vh]">
                    {loading ? (<Spinner />) : (<Cards News={news} category={category} />)}
                </div>
            </div>
            <Toaster />
        </div>
    );
};

export default App;
