import React from 'react';

const ProductosTabla = ({ productos }) => {

  return (
    <table className="table table-bordered table-striped">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Descripción</th>
          <th>Precio</th>
        </tr>
      </thead>
      <tbody>
        {productos.map((producto) => (
          <tr key={producto.id}>
            <td>{producto.id}</td>
            <td>{producto.title}</td>
            <td>{producto.description}</td>
            <td>{producto.price}</td>
            {/* Agrega más celdas si tu objeto de productos tiene más propiedades */}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductosTabla;
