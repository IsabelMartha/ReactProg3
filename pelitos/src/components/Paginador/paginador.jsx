import React, { useState } from 'react';

const Paginador = ({ currentPage, totalPages, onPageChange }) => {
  const [inputPage, setInputPage] = useState(currentPage);

  const handleInputChange = (e) => {
    const value = parseInt(e.target.value);
    setInputPage(value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onPageChange(inputPage);
    }
  };

  return (
    <div>
      <button disabled={currentPage === 1} onClick={() => onPageChange(1)}>
        Primera
      </button>
      <button disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)}>
        Anterior
      </button>
      <span>
        Página{' '}
        <input
          type="number"
          value={inputPage}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />{' '}
        de {totalPages}
      </span>
      <button disabled={currentPage === totalPages} onClick={() => onPageChange(currentPage + 1)}>
        Siguiente
      </button>
      <button disabled={currentPage === totalPages} onClick={() => onPageChange(totalPages)}>
        Última
      </button>
    </div>
  );
};

export default Paginador;
