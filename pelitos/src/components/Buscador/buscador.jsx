import React, { useState } from 'react';

const Buscador = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearch = () => {
        onSearch(searchTerm);
    };

    return (
        <div>
            <input type="text" value={searchTerm} onChange={handleChange} placeholder="Buscar productos" />
            <button onClick={handleSearch}>Buscar</button>
        </div>
    );
};

export default Buscador;
