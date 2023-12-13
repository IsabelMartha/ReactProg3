import React, { useState, useEffect } from 'react';

const BuscadorProductos = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://localhost:7074/Producto/Type/1');
        const data = await response.json();
        setProductos(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Lista de Productos</h2>
      {loading ? (
        <p>Cargando productos...</p>
      ) : (
        <ul>
          {productos.map((producto) => (
            <li key={producto.id}>
              {producto.title} - {producto.description} - ${producto.price}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BuscadorProductos;
