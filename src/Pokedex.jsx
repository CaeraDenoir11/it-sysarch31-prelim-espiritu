import React, { useState, useEffect } from 'react';
import Pokemon from './Pokemon.jsx';

export default function Pokedex() {
    const [pokemons, setPokemons] = useState([]);
    const [lang, setLang] = useState('english');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(15);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        fetch(`https://us-central1-it-sysarch32.cloudfunctions.net/pagination?page=${currentPage}`)
            .then(response => response.json())
            .then(data => {
                const newData = data.data.map(element => ({
                    ...element,
                    pkmnStats: element.base
                }));

                setPokemons(newData);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setIsLoading(false);
            });
    }, [currentPage]);

    // Function to handle page navigation
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // Generate page buttons for pages 1 to 15
    const pageButtons = [];
    for (let i = 1; i <= totalPages; i++) {
        pageButtons.push(
            <button key={i} onClick={() => handlePageChange(i)} disabled={currentPage === i}>
                {i}
            </button>
        );
    }

    return (
        <main>
            <div className="change_language">
                <button onClick={() => setLang('english')}>English</button>
                <button onClick={() => setLang('japanese')}>Japanese</button>
                <button onClick={() => setLang('chinese')}>Chinese</button>
                <button onClick={() => setLang('french')}>French</button>
            </div>

            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <ul className="pokedex">
                    {pokemons.map(element => {
                        const pokemon = { ...element, pkmnName: element.name[lang] };
                        return <Pokemon key={element.id} {...pokemon} />;
                    })}
                </ul>
            )}

            {/* Pagination buttons */}
            <div className="counter">
                <button onClick={() => handlePageChange(Math.max(1, currentPage - 1))} disabled={currentPage === 1}>Previous</button>
                {pageButtons}
                <button onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))} disabled={currentPage === totalPages}>Next</button>
            </div>
        </main>
    );
}