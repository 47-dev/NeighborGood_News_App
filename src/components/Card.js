// src/components/Card.js
import React from 'react';

const Card = ({ news }) => {
    if (!news) {
        return null;
    }

    const { urlToImage, title, description } = news;

    return (
        <div className='w-[300px] bg-bgDark bg-opacity-80 rounded-md overflow-hidden'>
            <div className='relative'>
                {urlToImage && <img src={urlToImage} alt={title} />}

            </div>
            <div className='p-4'>
                <p className="text-white font-semibold text-lg leading-6">{title}</p>
                <p className='mt-2 text-white'>
                    {description && (description.length > 100 ? `${description.substr(0, 100)}...` : description)}
                </p>
            </div>
        </div>
    );
}

export default Card;
